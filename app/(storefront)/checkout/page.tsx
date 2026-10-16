'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { supabase, getShippingZones, type ShippingZone } from '@/lib/supabase'
import { findShippingZone } from '@/lib/shipping'

export default function CheckoutPage() {
  const { cart, totalItems, cartTotal, clearCart } = useCart()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [createdOrderId, setCreatedOrderId] = useState<string>('#PB-1051')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    docType: 'CUIT / CUIL',
    docNumber: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
  })

  const [zones, setZones] = useState<ShippingZone[]>([])
  useEffect(() => {
    getShippingZones().then(setZones)
  }, [])

  // Calculos (el servidor los recalcula al crear el pedido)
  const safeTotal = cartTotal || 0
  const subtotalNeto = safeTotal / 1.21
  const iva = safeTotal - subtotalNeto
  const zone = findShippingZone(zones, formData.postalCode)
  const envio = safeTotal > 0 && zone ? Number(zone.price) : 0
  const envioPendiente = safeTotal > 0 && !zone
  const totalFinal = safeTotal > 0 ? (safeTotal + envio) : 0

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrorMessage('')
  }

  // Handle Order Creation
  const handleConfirmOrder = async () => {
    if (!formData.name.trim()) {
      setErrorMessage('Por favor ingresá tu nombre o razón social.')
      return
    }
    if (!formData.email.trim()) {
      setErrorMessage('Por favor ingresá tu correo electrónico.')
      return
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Por favor ingresá tu WhatsApp o teléfono de contacto.')
      return
    }
    if (!formData.address.trim()) {
      setErrorMessage('Por favor ingresá tu domicilio de entrega.')
      return
    }

    try {
      setIsSubmitting(true)
      setErrorMessage('')

      // 1. Create order + items (RPC: guests cannot read/write tables directly)
      const { data: newOrderId, error: orderError } = await supabase.rpc('create_order', {
        p_order: {
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          customer_cuit: formData.docNumber ? `${formData.docType}: ${formData.docNumber}` : null,
          shipping_address: formData.address,
          shipping_city: 'CABA / GBA',
          shipping_postal_code: formData.postalCode,
        },
        p_items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      })

      if (orderError || !newOrderId) {
        console.error('Error creating order:', orderError)
        setErrorMessage('No pudimos registrar tu pedido. Por favor intentá nuevamente.')
        return
      }
      setCreatedOrderId(`#${newOrderId}`)

      // 3. Clear cart and show confirmation screen
      clearCart()
      setIsSubmitted(true)
    } catch (err: any) {
      console.error('Submission error:', err)
      setErrorMessage('Ocurrió un error al procesar el pedido. Por favor intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle Receipt Upload
  const handleUploadReceipt = async () => {
    if (!file) return

    try {
      setIsUploading(true)
      const cleanId = createdOrderId.replace('#', '')
      const fileExt = file.name.split('.').pop()
      const fileName = `${cleanId}/${Date.now()}.${fileExt}`

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('receipts')
        .upload(fileName, file)

      let receiptUrl = ''
      if (!uploadError && uploadData) {
        // Private bucket: store the object path; the admin opens it via a signed URL
        receiptUrl = uploadData.path
      }

      // Update Order Status in Supabase
      await supabase.rpc('attach_receipt', {
        p_order_id: cleanId,
        p_receipt_url: receiptUrl || file.name,
      })

      setShowPopup(true)
    } catch (err) {
      console.error('Error uploading receipt:', err)
      setShowPopup(true)
    } finally {
      setIsUploading(false)
    }
  }

  if (isSubmitted) {
    return (
      <main className="w-full pt-[132px] bg-surface min-h-[calc(100vh-280px)] p-space-lg relative">
        <div className="max-w-2xl mx-auto bg-surface-container-lowest rounded-xl p-space-xl shadow-lg border border-surface-container">
          <div className="text-center mb-space-lg">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-space-md">
              <span className="material-symbols-outlined text-[32px]">task_alt</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">¡Gracias por tu compra!</h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              Tu número de pedido es <strong className="text-primary font-data-tabular">{createdOrderId}</strong>
            </p>
          </div>

          <div className="bg-surface-container-low rounded-lg p-space-md mb-space-lg">
            <h3 className="font-label-md text-label-md uppercase text-on-surface-variant mb-space-sm tracking-wider">Datos para Transferencia Bancaria</h3>
            <div className="space-y-space-xs font-body-md text-on-surface">
              <div className="flex justify-between border-b border-surface-container pb-space-xs">
                <span className="text-on-surface-variant">Titular</span>
                <span className="font-bold">Papelera Bertolín S.R.L.</span>
              </div>
              <div className="flex justify-between border-b border-surface-container py-space-xs">
                <span className="text-on-surface-variant">CUIT</span>
                <span className="font-data-tabular font-bold">30-58472910-7</span>
              </div>
              <div className="flex justify-between border-b border-surface-container py-space-xs">
                <span className="text-on-surface-variant">Banco</span>
                <span className="font-bold">Banco Galicia</span>
              </div>
              <div className="flex justify-between border-b border-surface-container py-space-xs">
                <span className="text-on-surface-variant">Alias</span>
                <span className="font-data-tabular font-bold text-primary">PAPELERA.BERTOLIN</span>
              </div>
              <div className="flex justify-between py-space-xs">
                <span className="text-on-surface-variant">Monto a transferir</span>
                <span className="font-data-tabular font-bold text-primary text-headline-sm">{formatMoney(totalFinal)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-space-md pt-space-md">
            <div className="bg-primary/5 border-2 border-dashed border-primary/30 rounded-xl p-space-lg text-center transition-colors hover:bg-primary/10 hover:border-primary/50 relative">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-space-sm">
                <span className="material-symbols-outlined text-[24px]">upload_file</span>
              </div>
              <label className="font-headline-sm text-headline-sm text-on-surface block mb-space-xs cursor-pointer">
                Subir Comprobante de Transferencia
              </label>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                Adjuntá el comprobante (PDF o imagen) para agilizar la validación del pedido.
              </p>
              <input 
                type="file" 
                accept="image/*,application/pdf"
                onChange={(e) => setFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                className="block w-full max-w-xs mx-auto text-body-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-label-md file:font-bold file:bg-primary file:text-on-primary hover:file:bg-primary-container hover:file:text-on-primary-container transition-colors cursor-pointer" 
              />
              {file && (
                <p className="text-xs text-primary font-semibold mt-2">
                  Archivo seleccionado: {file.name}
                </p>
              )}
            </div>
            
            <button 
              onClick={handleUploadReceipt}
              disabled={!file || isUploading}
              className={`w-full py-space-md rounded-xl font-headline-sm text-headline-sm font-bold tracking-wide transition-all shadow-sm flex items-center justify-center gap-space-sm ${file && !isUploading ? 'bg-primary hover:bg-primary-container text-on-primary scale-100 hover:scale-[1.02]' : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed opacity-70'}`}
            >
              {isUploading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  Subiendo comprobante...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">send</span>
                  Enviar comprobante
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal / Popup */}
        {showPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-space-md">
            <div className="bg-surface-container-lowest rounded-xl p-space-xl max-w-md w-full shadow-2xl animate-fade-in text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mx-auto mb-space-md">
                <span className="material-symbols-outlined text-[32px]">schedule</span>
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-space-sm">Pedido por confirmarse</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg">
                Recibimos tu comprobante. En breve validaremos el pago y procesaremos tu orden para el despacho.
              </p>
              <div className="space-y-space-sm">
                <a 
                  href={`https://wa.me/5491142011180?text=Hola,%20acabo%20de%20hacer%20el%20pedido%20${encodeURIComponent(createdOrderId)}%20y%20ya%20envi%C3%A9%20el%20comprobante.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-space-sm bg-[#25D366] hover:bg-[#1DA851] text-white py-space-sm px-space-md rounded-lg font-label-md transition-colors"
                >
                  <span className="material-symbols-outlined">chat</span>
                  Hacer seguimiento de mi pedido
                </a>
                <Link 
                  href="/" 
                  className="w-full flex items-center justify-center bg-surface-container hover:bg-surface-container-high text-on-surface py-space-sm px-space-md rounded-lg font-label-md transition-colors"
                >
                  Volver a la tienda
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    )
  }

  return (
    <main className="w-full pt-[132px] bg-surface min-h-[calc(100vh-280px)]">
      <div className="flex flex-col w-full">
        {/* Order Header */}
        <div className="w-full bg-surface-container-low py-space-md">
          <div className="max-w-[1280px] mx-auto px-margin-sm md:px-gutter">
            <div className="flex flex-wrap items-center justify-between gap-gutter-sm">
              <div className="flex items-center gap-space-sm text-on-surface-variant">
                <Link className="hover:text-primary transition-colors flex items-center gap-space-xs font-label-md text-label-md" href="/">
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  <span>Volver al inicio</span>
                </Link>
                <span className="text-outline">/</span>
                <span className="font-label-eyebrow text-label-eyebrow uppercase text-on-surface tracking-wider">Checkout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Stepper */}
        <div className="w-full bg-surface py-space-lg">
          <div className="max-w-[1280px] mx-auto px-margin-sm md:px-gutter">
            <div className="bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                <div className="flex items-center gap-space-md p-space-sm rounded-lg bg-surface-container-low">
                  <div className="w-9 h-9 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">check</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-eyebrow text-label-eyebrow uppercase text-secondary">Paso 01</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface truncate">1. Carrito</span>
                    <span className="font-data-tabular text-data-tabular text-on-surface-variant">Completado · {totalItems} artículos</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-md p-space-sm rounded-lg bg-primary-fixed">
                  <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm animate-pulse">
                    <span className="font-label-md text-label-md">2</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-eyebrow text-label-eyebrow uppercase text-primary font-bold">Paso Activo</span>
                    <span className="font-headline-sm text-headline-sm text-primary truncate font-bold">2. Datos & Entrega</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-md p-space-sm rounded-lg bg-surface-container-low opacity-60">
                  <div className="w-9 h-9 rounded-full bg-surface-dim text-on-surface-variant flex items-center justify-center shrink-0">
                    <span className="font-label-md text-label-md">3</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-eyebrow text-label-eyebrow uppercase text-outline">Paso 03</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface truncate">3. Pago & Confirmación</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full pb-space-xl">
          <div className="max-w-[1280px] mx-auto px-margin-sm md:px-gutter">
            <div className="flex flex-col lg:flex-row gap-gutter items-start">
              
              {/* LEFT COLUMN: Forms */}
              <div className="w-full lg:w-[65%] space-y-space-lg">
                
                {errorMessage && (
                  <div className="p-4 bg-error-container text-on-error-container rounded-xl flex items-center gap-2 border border-error/20">
                    <span className="material-symbols-outlined text-[20px]">warning</span>
                    <span className="text-sm font-semibold">{errorMessage}</span>
                  </div>
                )}

                {/* 1. Datos Fiscales */}
                <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
                  <div className="flex items-center justify-between pb-space-md mb-space-md bg-surface-container-low -mx-space-lg -mt-space-lg p-space-lg rounded-t-xl">
                    <div className="flex items-center gap-space-sm">
                      <span className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-md text-label-md font-bold">1</span>
                      <div>
                        <h2 className="font-headline-md text-headline-md text-on-surface">Tus Datos</h2>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-space-md">
                    <div className="space-y-space-xs">
                      <label className="font-label-md text-label-md text-on-surface flex items-center justify-between">
                        <span>Nombre Completo o Razón Social</span>
                        <span className="text-primary font-body-sm text-body-sm">*Obligatorio</span>
                      </label>
                      <input 
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded px-space-md py-space-sm focus:outline-none focus:ring-1 focus:ring-primary" 
                        type="text" 
                        placeholder="Ej: Imprenta San Martín SRL / Juan Pérez" 
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                      <div className="space-y-space-xs">
                        <label className="font-label-md text-label-md text-on-surface flex items-center justify-between">
                          <span>Tipo de Documento</span>
                        </label>
                        <select 
                          value={formData.docType}
                          onChange={(e) => handleInputChange('docType', e.target.value)}
                          className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded px-space-md py-space-sm focus:outline-none pr-space-xl appearance-none"
                        >
                          <option value="CUIT / CUIL">CUIT / CUIL</option>
                          <option value="DNI">DNI</option>
                        </select>
                      </div>
                      <div className="space-y-space-xs">
                        <label className="font-label-md text-label-md text-on-surface flex items-center justify-between">
                          <span>Número de Documento</span>
                        </label>
                        <input 
                          value={formData.docNumber}
                          onChange={(e) => handleInputChange('docNumber', e.target.value)}
                          className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded px-space-md py-space-sm focus:outline-none" 
                          type="text" 
                          placeholder="Sin guiones ni puntos" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                      <div className="space-y-space-xs">
                        <label className="font-label-md text-label-md text-on-surface flex items-center justify-between">
                          <span>Email</span>
                          <span className="text-primary font-body-sm text-body-sm">*Obligatorio</span>
                        </label>
                        <input 
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded px-space-md py-space-sm focus:outline-none" 
                          type="email" 
                          placeholder="tu@email.com" 
                        />
                      </div>
                      <div className="space-y-space-xs">
                        <label className="font-label-md text-label-md text-on-surface flex items-center justify-between">
                          <span>WhatsApp / Teléfono</span>
                          <span className="text-primary font-body-sm text-body-sm">*Obligatorio</span>
                        </label>
                        <input 
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded px-space-md py-space-sm focus:outline-none" 
                          type="tel" 
                          placeholder="Ej: 11 4455 6677" 
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* 2. Dirección de Entrega */}
                <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
                  <div className="flex items-center justify-between pb-space-md mb-space-md bg-surface-container-low -mx-space-lg -mt-space-lg p-space-lg rounded-t-xl">
                    <div className="flex items-center gap-space-sm">
                      <span className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-md text-label-md font-bold">2</span>
                      <div>
                        <h2 className="font-headline-md text-headline-md text-on-surface">Dirección de Entrega</h2>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-space-md">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                      <div className="sm:col-span-2 space-y-space-xs">
                        <label className="font-label-md text-label-md text-on-surface flex items-center justify-between">
                          <span>Domicilio de Entrega</span>
                          <span className="text-primary font-body-sm text-body-sm">*Obligatorio</span>
                        </label>
                        <input 
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded px-space-md py-space-sm focus:outline-none" 
                          type="text" 
                          placeholder="Calle, Altura, Piso, Depto" 
                        />
                      </div>
                      <div className="space-y-space-xs">
                        <label className="font-label-md text-label-md text-on-surface">Código Postal</label>
                        <input 
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange('postalCode', e.target.value)}
                          className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded px-space-md py-space-sm focus:outline-none" 
                          type="text" 
                          placeholder="Ej: C1266" 
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* 3. Método de Pago */}
                <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
                  <div className="flex items-center justify-between pb-space-md mb-space-md bg-surface-container-low -mx-space-lg -mt-space-lg p-space-lg rounded-t-xl">
                    <div className="flex items-center gap-space-sm">
                      <span className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-md text-label-md font-bold">3</span>
                      <div>
                        <h2 className="font-headline-md text-headline-md text-on-surface">Método de Pago</h2>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-space-md">
                    <div className="bg-surface-container-low rounded-xl p-space-md border-2 border-primary/20">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-space-sm">
                          <input defaultChecked className="mt-0.5 text-primary" name="payment_method" type="radio" />
                          <div>
                            <span className="font-headline-sm text-headline-sm text-primary font-bold">Transferencia Bancaria</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-space-md bg-surface-container-lowest rounded-lg p-space-md space-y-space-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                          <div className="flex flex-col bg-surface-container-low p-space-sm rounded">
                            <span className="font-label-eyebrow text-label-eyebrow uppercase text-on-surface-variant">Alias Único CBU</span>
                            <span className="font-data-tabular text-body-lg text-primary font-bold mt-1">PAPELERA.BERTOLIN</span>
                          </div>
                          <div className="flex flex-col bg-surface-container-low p-space-sm rounded">
                            <span className="font-label-eyebrow text-label-eyebrow uppercase text-on-surface-variant">CUIT Titular</span>
                            <span className="font-data-tabular text-body-lg text-on-surface font-bold mt-1">30-58472910-7</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Confirmación */}
                <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md">
                  <button 
                    onClick={handleConfirmOrder}
                    disabled={cart.length === 0 || isSubmitting}
                    className="w-full bg-primary hover:bg-primary-container text-on-primary py-space-md px-space-lg rounded-xl font-label-md text-headline-sm text-center font-bold tracking-wide shadow-md transition-all flex items-center justify-center gap-space-sm disabled:opacity-60 disabled:cursor-not-allowed" 
                    type="button"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-[22px]">progress_activity</span>
                        <span>Procesando Pedido...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[22px]">lock</span>
                        <span>Confirmar y Realizar Pedido ({formatMoney(totalFinal)})</span>
                      </>
                    )}
                  </button>
                </section>

              </div>

              {/* RIGHT COLUMN: Resumen */}
              <aside className="w-full lg:w-[35%] lg:sticky lg:top-[150px] space-y-space-md">
                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md">
                  <div className="flex items-center justify-between pb-space-sm bg-surface-container-low -mx-space-lg -mt-space-lg p-space-md rounded-t-xl">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[20px]">shopping_basket</span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">Resumen de Compra</h3>
                    </div>
                    <span className="font-data-tabular text-data-tabular bg-surface-container-highest px-space-xs py-0.5 rounded text-on-surface-variant">{totalItems} artículos</span>
                  </div>

                  <div className="space-y-space-md max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                    {cart.length === 0 ? (
                      <p className="text-body-sm text-on-surface-variant text-center py-4">Tu carrito está vacío.</p>
                    ) : (
                      cart.map((item, index) => (
                        <div key={index} className="flex items-start gap-space-sm">
                          <div className="w-14 h-14 rounded bg-surface-container-high shrink-0 overflow-hidden relative">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-surface-dim" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-label-md text-label-md text-on-surface truncate">{item.name}</h4>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">{item.category} (x{item.quantity})</p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-data-tabular text-body-md text-on-surface font-bold">{formatMoney(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="bg-surface-container-low p-space-md rounded-lg space-y-space-xs font-body-sm text-body-sm mt-4">
                    <div className="flex justify-between text-on-surface-variant">
                      <span>Subtotal Neto Gravado</span>
                      <span className="font-data-tabular text-on-surface font-semibold">{formatMoney(subtotalNeto)}</span>
                    </div>
                    <div className="flex justify-between text-on-surface-variant">
                      <span>IVA Liquidado (21%)</span>
                      <span className="font-data-tabular text-on-surface font-semibold">{formatMoney(iva)}</span>
                    </div>
                    <div className="flex justify-between text-on-surface-variant">
                      <span className="flex items-center gap-space-xs">
                        <span>Flete Logística Propia</span>
                        <span className="material-symbols-outlined text-[14px] text-secondary">local_shipping</span>
                      </span>
                      <span className="font-data-tabular text-secondary font-bold">{envioPendiente ? 'A coordinar' : formatMoney(envio)}</span>
                    </div>
                  </div>

                  <div className="p-space-md rounded-lg bg-surface-container flex items-center justify-between">
                    <div>
                      <span className="font-label-eyebrow text-label-eyebrow uppercase text-on-surface-variant">Total Final a Pagar</span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Incluye IVA</p>
                    </div>
                    <div className="text-right">
                      <span className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight leading-none">{formatMoney(totalFinal)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-high rounded-xl p-space-md space-y-space-sm shadow-sm">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">support_agent</span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface">Asistencia para este pedido</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Línea directa (011) 4201-1180</p>
                    </div>
                  </div>
                </div>
              </aside>

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
