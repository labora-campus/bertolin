'use client'

import { useState } from 'react'

export default function AdminPedidosPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const orders = [
    { id: '#PB-1050', cliente: 'Imprenta Grafos SRL', monto: '$145.000', estado: 'Pendiente Pago', fecha: 'Hoy, 14:30', comprobante: null },
    { id: '#PB-1049', cliente: 'Estudio XYZ', monto: '$24.640', estado: 'Comprobante Subido', fecha: 'Hoy, 10:15', comprobante: 'comprobante_1049.pdf' },
    { id: '#PB-1048', cliente: 'Librería El Ateneo', monto: '$890.500', estado: 'Pago Confirmado', fecha: 'Ayer, 16:45', comprobante: 'transferencia_1048.png' },
    { id: '#PB-1047', cliente: 'Editorial Sur', monto: '$320.000', estado: 'En Preparación', fecha: '04 Oct, 09:20', comprobante: 'comprobante_1047.pdf' },
  ]

  return (
    <div className="space-y-space-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-space-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Gestión de Pedidos</h1>
          <p className="font-body-md text-on-surface-variant">Revisá comprobantes y cambiá los estados de los pedidos.</p>
        </div>
        <div className="flex items-center gap-space-sm">
          <input 
            type="text" 
            placeholder="Buscar por cliente o #ID..." 
            className="bg-surface border border-outline rounded-lg px-space-sm py-2 text-body-sm w-full sm:w-64 focus:outline-none focus:border-primary"
          />
          <button className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface p-2 rounded-lg transition-colors">
            <span className="material-symbols-outlined">filter_list</span>
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
                <th className="p-space-sm font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-body-sm text-on-surface divide-y divide-surface-container">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-space-sm font-data-tabular font-semibold text-primary">{order.id}</td>
                  <td className="p-space-sm">
                    <div className="font-medium">{order.cliente}</div>
                    <div className="text-on-surface-variant font-data-tabular">{order.monto}</div>
                  </td>
                  <td className="p-space-sm">{order.fecha}</td>
                  <td className="p-space-sm">
                    {order.comprobante ? (
                      <button className="inline-flex items-center gap-1 text-primary hover:text-primary-container hover:underline text-[12px] font-label-md">
                        <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                        Ver archivo
                      </button>
                    ) : (
                      <span className="text-on-surface-variant text-[12px]">Sin subir</span>
                    )}
                  </td>
                  <td className="p-space-sm">
                    <select 
                      defaultValue={order.estado}
                      className={`text-[12px] font-bold px-2 py-1 rounded-full outline-none cursor-pointer appearance-none ${
                        order.estado === 'Pendiente Pago' ? 'bg-secondary-container text-on-secondary-container' :
                        order.estado === 'Comprobante Subido' ? 'bg-primary-container text-on-primary-container' :
                        order.estado === 'Pago Confirmado' ? 'bg-[#E6F4EA] text-[#137333]' :
                        'bg-surface-container text-on-surface'
                      }`}
                    >
                      <option value="Pendiente Pago">Pendiente Pago</option>
                      <option value="Comprobante Subido">Comprobante Subido</option>
                      <option value="Pago Confirmado">Pago Confirmado</option>
                      <option value="En Preparación">En Preparación</option>
                      <option value="Despachado">Despachado</option>
                    </select>
                  </td>
                  <td className="p-space-sm">
                    <button className="text-on-surface-variant hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
