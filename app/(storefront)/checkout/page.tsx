'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function CheckoutPage() {
  const { cart, totalItems, cartTotal } = useCart()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [hasFile, setHasFile] = useState(false)

  // Calculos simulados
  const safeTotal = cartTotal || 0
  const subtotalNeto = safeTotal / 1.21
  const iva = safeTotal - subtotalNeto
  const envio = safeTotal > 0 ? 24640 : 0
  const totalFinal = safeTotal > 0 ? (safeTotal + envio) : 0

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount)

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
              Tu número de pedido es <strong className="text-primary font-data-tabular">#PB-1049</strong>
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
                Adjuntá el PDF o captura de pantalla de la transferencia para agilizar el despacho.
              </p>
              <input 
                type="file" 
                onChange={(e) => setHasFile(e.target.files && e.target.files.length > 0)}
                className="block w-full max-w-xs mx-auto text-body-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-label-md file:font-bold file:bg-primary file:text-on-primary hover:file:bg-primary-container hover:file:text-on-primary-container transition-colors cursor-pointer" 
              />
            </div>
            
            <button 
              onClick={() => setShowPopup(true)}
              disabled={!hasFile}
              className={`w-full py-space-md rounded-xl font-headline-sm text-headline-sm font-bold tracking-wide transition-all shadow-sm flex items-center justify-center gap-space-sm ${hasFile ? 'bg-primary hover:bg-primary-container text-on-primary scale-100 hover:scale-[1.02]' : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed opacity-70'}`}
            >
              <span className="material-symbols-outlined">send</span>
              Enviar comprobante
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
                  href={`https://wa.me/5491142011180?text=Hola,%20acabo%20de%20hacer%20el%20pedido%20%23PB-1049%20y%20ya%20envi%C3%A9%20el%20comprobante.`}
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
                    <span className="font-data-tabular text-data-tabular text-on-surface-variant">Completado · {totalItems} líneas</span>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                      <div className="space-y-space-xs">
                        <label className="font-label-md text-label-md text-on-surface flex items-center justify-between">
                          <span>Tipo de Documento Fiscal</span>
                          <span className="text-primary font-body-sm text-body-sm">*Obligatorio</span>
                        </label>
                        <select className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded px-space-md py-space-sm focus:outline-none pr-space-xl appearance-none">
                          <option defaultValue="cuit">CUIT / CUIL</option>
                          <option>DNI</option>
                        </select>
                      </div>
                      <div className="space-y-space-xs">
                        <label className="font-label-md text-label-md text-on-surface flex items-center justify-between">
                          <span>Número de Documento</span>
                        </label>
                        <div className="relative">
                          <input className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded px-space-md py-space-sm focus:outline-none" type="text" placeholder="Tu número sin guiones" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                      <div className="space-y-space-xs">
                        <label className="font-label-md text-label-md text-on-surface">Email</label>
                        <input className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded px-space-md py-space-sm focus:outline-none" type="email" placeholder="tu@email.com" />
                      </div>
                      <div className="space-y-space-xs">
                        <label className="font-label-md text-label-md text-on-surface">WhatsApp / Teléfono</label>
                        <input className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded px-space-md py-space-sm focus:outline-none" type="tel" placeholder="Tu celular" />
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
                        <label className="font-label-md text-label-md text-on-surface">Domicilio de Entrega</label>
                        <input className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded px-space-md py-space-sm focus:outline-none" type="text" placeholder="Calle, Altura, Piso, Depto" />
                      </div>
                      <div className="space-y-space-xs">
                        <label className="font-label-md text-label-md text-on-surface">Código Postal</label>
                        <input className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded px-space-md py-space-sm focus:outline-none" type="text" placeholder="Ej: C1266" />
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
                    onClick={() => setIsSubmitted(true)}
                    className="w-full bg-primary hover:bg-primary-container text-on-primary py-space-md px-space-lg rounded-xl font-label-md text-headline-sm text-center font-bold tracking-wide shadow-md transition-all flex items-center justify-center gap-space-sm" 
                    type="button"
                    disabled={cart.length === 0}
                  >
                    <span className="material-symbols-outlined text-[22px]">lock</span>
                    <span>Confirmar y Realizar Pedido ({formatMoney(totalFinal)})</span>
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
                      <span className="font-data-tabular text-secondary font-bold">{formatMoney(envio)}</span>
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
