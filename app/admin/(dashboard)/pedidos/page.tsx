'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type OrderItemType = {
  name: string
  qty: number
  price: number
}

type OrderType = {
  id: string
  cliente: string
  cuil: string
  email: string
  phone: string
  address: string
  cp: string
  monto: number
  costoEnvio: number
  estado: string
  fecha: string
  comprobante: string | null
  items: OrderItemType[]
}

export default function AdminPedidosPage() {
  const [orders, setOrders] = useState<OrderType[]>([])
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [loading, setLoading] = useState(true)

  // Fetch orders from Supabase
  const fetchOrders = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .order('created_at', { ascending: false })

      if (!error && data) {
        const mapped: OrderType[] = data.map((o: any) => ({
          id: o.id.startsWith('#') ? o.id : `#${o.id}`,
          cliente: o.customer_name,
          cuil: o.customer_cuit || '-',
          email: o.customer_email,
          phone: o.customer_phone,
          address: o.shipping_address,
          cp: o.shipping_postal_code || '-',
          monto: Number(o.total),
          costoEnvio: Number(o.shipping_cost || 0),
          estado: o.status,
          fecha: new Date(o.created_at).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' }),
          comprobante: o.receipt_url,
          items: (o.order_items || []).map((it: any) => ({
            name: it.product_name,
            qty: it.quantity,
            price: Number(it.unit_price)
          }))
        }))
        setOrders(mapped)
      }
    } catch (e) {
      console.error('Error loading orders from Supabase:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  // Receipts live in a private bucket: open them through a short-lived signed URL
  const openReceipt = async (value: string) => {
    const path = value.includes('/receipts/') ? value.split('/receipts/')[1] : value
    const { data, error } = await supabase.storage.from('receipts').createSignedUrl(path, 120)
    if (error || !data) alert('No se pudo abrir el comprobante: ' + (error?.message || 'archivo no encontrado'))
    else window.open(data.signedUrl, '_blank', 'noopener')
  }

  // Update order status in Supabase
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const rawId = orderId.replace('#', '')
    try {
      await supabase.from('orders').update({ status: newStatus }).eq('id', rawId)
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, estado: newStatus } : o))
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(prev => prev ? { ...prev, estado: newStatus } : null)
      }
    } catch (err) {
      console.error('Error updating status:', err)
    }
  }

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount)

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = search === '' || 
      o.cliente.toLowerCase().includes(search.toLowerCase()) || 
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'Todos' || o.estado === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-space-lg relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-space-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Gestión de Pedidos</h1>
          <p className="font-body-md text-on-surface-variant">Revisá comprobantes de transferencia y cambiá los estados de los pedidos.</p>
        </div>
        <div className="flex flex-wrap items-center gap-space-sm w-full sm:w-auto">
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por cliente o #ID..." 
            className="bg-surface border border-outline rounded-lg px-space-sm py-2 text-body-sm w-full sm:w-64 focus:outline-none focus:border-primary"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface border border-outline rounded-lg px-space-sm py-2 text-body-sm focus:outline-none focus:border-primary"
          >
            <option value="Todos">Todos los estados</option>
            <option value="Pendiente Pago">Pendiente Pago</option>
            <option value="Comprobante Subido">Comprobante Subido</option>
            <option value="Pago Confirmado">Pago Confirmado</option>
            <option value="En Preparación">En Preparación</option>
            <option value="Despachado">Despachado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
          <button 
            onClick={fetchOrders}
            className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface p-2 rounded-lg transition-colors"
            title="Refrescar pedidos"
          >
            <span className="material-symbols-outlined text-[20px]">refresh</span>
          </button>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-label-md">
                <th className="p-space-sm font-medium">Pedido</th>
                <th className="p-space-sm font-medium">Cliente</th>
                <th className="p-space-sm font-medium">Fecha</th>
                <th className="p-space-sm font-medium">Comprobante</th>
                <th className="p-space-sm font-medium">Estado</th>
                <th className="p-space-sm font-medium text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-body-sm text-on-surface divide-y divide-surface-container">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-on-surface-variant">
                    No se encontraron pedidos.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-space-sm font-data-tabular font-semibold text-primary">{order.id}</td>
                    <td className="p-space-sm">
                      <div className="font-medium">{order.cliente}</div>
                      <div className="text-on-surface-variant font-data-tabular">{formatMoney(order.monto)}</div>
                    </td>
                    <td className="p-space-sm">{order.fecha}</td>
                    <td className="p-space-sm">
                      {order.comprobante ? (
                        <button
                          onClick={() => openReceipt(order.comprobante!)}
                          className="inline-flex items-center gap-1 text-primary hover:text-primary-container hover:underline text-[12px] font-label-md"
                        >
                          <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                          Ver archivo
                        </button>
                      ) : (
                        <span className="text-on-surface-variant text-[12px]">Sin subir</span>
                      )}
                    </td>
                    <td className="p-space-sm">
                      <select 
                        value={order.estado}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`text-[12px] font-bold px-2 py-1 rounded-full outline-none cursor-pointer border ${
                          order.estado === 'Pendiente Pago' ? 'bg-secondary-container text-on-secondary-container border-secondary/30' :
                          order.estado === 'Comprobante Subido' ? 'bg-primary-container text-on-primary-container border-primary/30' :
                          order.estado === 'Pago Confirmado' ? 'bg-[#E6F4EA] text-[#137333] border-[#137333]/30' :
                          order.estado === 'Cancelado' ? 'bg-error-container text-on-error-container border-error/30' :
                          'bg-surface-container text-on-surface border-outline/30'
                        }`}
                      >
                        <option value="Pendiente Pago">Pendiente Pago</option>
                        <option value="Comprobante Subido">Comprobante Subido</option>
                        <option value="Pago Confirmado">Pago Confirmado</option>
                        <option value="En Preparación">En Preparación</option>
                        <option value="Despachado">Despachado</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </td>
                    <td className="p-space-sm text-center">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-full hover:bg-primary/10"
                        title="Ver detalle del pedido"
                      >
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DETALLE DE PEDIDO */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-surface-container flex justify-between items-center bg-surface">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Detalle del Pedido <span className="text-primary font-data-tabular">{selectedOrder.id}</span></h2>
                <p className="text-body-sm text-on-surface-variant mt-1">{selectedOrder.fecha}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-on-surface-variant hover:text-error transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-error/10"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              
              {/* Cliente info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-surface-container p-4 rounded-lg border border-outline-variant/30">
                  <h3 className="font-label-md text-label-md text-on-surface-variant mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">person</span> Datos del Cliente
                  </h3>
                  <div className="space-y-2 text-body-sm text-on-surface">
                    <p><strong className="font-semibold">Razón Social:</strong> {selectedOrder.cliente}</p>
                    <p><strong className="font-semibold">Documento:</strong> {selectedOrder.cuil}</p>
                    <p className="flex items-center gap-2">
                      <strong className="font-semibold">Email:</strong> {selectedOrder.email}
                      <a href={`mailto:${selectedOrder.email}`} className="text-primary hover:underline"><span className="material-symbols-outlined text-[14px]">mail</span></a>
                    </p>
                    <p className="flex items-center gap-2">
                      <strong className="font-semibold">WhatsApp:</strong> {selectedOrder.phone}
                      <a href={`https://wa.me/549${selectedOrder.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-[#25D366] hover:underline"><span className="material-symbols-outlined text-[14px]">chat</span></a>
                    </p>
                  </div>
                </div>
                <div className="bg-surface-container p-4 rounded-lg border border-outline-variant/30">
                  <h3 className="font-label-md text-label-md text-on-surface-variant mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">local_shipping</span> Envío
                  </h3>
                  <div className="space-y-2 text-body-sm text-on-surface">
                    <p><strong className="font-semibold">Domicilio:</strong> {selectedOrder.address}</p>
                    <p><strong className="font-semibold">Código Postal:</strong> {selectedOrder.cp}</p>
                    <p><strong className="font-semibold">Costo Envío:</strong> {formatMoney(selectedOrder.costoEnvio)}</p>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Productos</h3>
                <div className="border border-surface-container rounded-lg overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low text-on-surface-variant text-[12px] uppercase tracking-wider">
                        <th className="px-4 py-2 font-medium">Producto</th>
                        <th className="px-4 py-2 font-medium text-center">Cant.</th>
                        <th className="px-4 py-2 font-medium text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container text-body-sm">
                      {selectedOrder.items.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="px-4 py-3 text-center text-on-surface-variant">Sin artículos registrados.</td>
                        </tr>
                      ) : (
                        selectedOrder.items.map((item: any, i: number) => (
                          <tr key={i}>
                            <td className="px-4 py-3">{item.name}</td>
                            <td className="px-4 py-3 text-center">{item.qty}</td>
                            <td className="px-4 py-3 text-right font-data-tabular">{formatMoney(item.price * item.qty)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  <div className="bg-surface-container-lowest px-4 py-3 border-t border-surface-container">
                    <div className="flex justify-between text-body-sm text-on-surface-variant mb-1">
                      <span>Subtotal</span>
                      <span className="font-data-tabular">{formatMoney(selectedOrder.monto - selectedOrder.costoEnvio)}</span>
                    </div>
                    <div className="flex justify-between text-body-sm text-on-surface-variant mb-3">
                      <span>Costo de envío</span>
                      <span className="font-data-tabular">{formatMoney(selectedOrder.costoEnvio)}</span>
                    </div>
                    <div className="flex justify-between text-label-lg font-bold text-on-surface pt-2 border-t border-outline-variant/30">
                      <span>Total</span>
                      <span className="font-data-tabular text-primary">{formatMoney(selectedOrder.monto)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comprobante */}
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                  Comprobante de Transferencia
                </h3>
                {selectedOrder.comprobante ? (
                  <div className="bg-surface-container-low border border-outline-variant/50 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-[32px]">image</span>
                    </div>
                    <p className="font-label-md text-on-surface break-all text-center">{selectedOrder.comprobante.split('/').pop()}</p>
                    <button
                      onClick={() => openReceipt(selectedOrder.comprobante!)}
                      className="text-primary hover:text-primary-container font-label-md underline inline-flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                      Ver o descargar comprobante
                    </button>
                  </div>
                ) : (
                  <div className="bg-error-container/30 text-on-surface-variant rounded-lg p-4 flex items-center gap-2 text-body-sm border border-error/20">
                    <span className="material-symbols-outlined text-error">error</span>
                    El cliente aún no ha subido el comprobante de transferencia.
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-surface-container bg-surface-container-low flex justify-between items-center">
              <div>
                <span className="text-xs text-on-surface-variant font-medium">Estado actual: <strong>{selectedOrder.estado}</strong></span>
              </div>
              <div className="flex gap-2">
                {selectedOrder.estado !== 'Pago Confirmado' && (
                  <button 
                    onClick={() => handleStatusChange(selectedOrder.id, 'Pago Confirmado')}
                    className="bg-[#137333] hover:bg-[#0d5023] text-white px-5 py-2 rounded-lg font-label-md transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    Confirmar Pago
                  </button>
                )}
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="border border-outline bg-surface hover:bg-surface-container text-on-surface px-5 py-2 rounded-lg font-label-md transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
