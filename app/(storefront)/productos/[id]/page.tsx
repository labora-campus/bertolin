'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params)
  const { addToCart } = useCart()

  // React State for interactive elements
  const [activeTab, setActiveTab] = useState<'specs' | 'usage' | 'logistics'>('specs')
  const [activeThumb, setActiveThumb] = useState(0)
  const [quantity, setQuantity] = useState(5)
  const [cuttingMode, setCuttingMode] = useState(false)
  const [cutPreset, setCutPreset] = useState('sra3')
  const [cutWidth, setCutWidth] = useState(32)
  const [cutHeight, setCutHeight] = useState(45)

  // Constants
  const baseSheetCount = 100
  const cutCostFlat = 3500

  // Pricing Logic
  const getUnitPrice = (qty: number) => {
    if (qty >= 20) return 53040
    if (qty >= 5) return 57408
    return 62400
  }

  const unitPrice = getUnitPrice(quantity)
  const sheetPrice = Math.round(unitPrice / baseSheetCount)
  const subtotalPaper = unitPrice * quantity
  const cuttingExtra = cuttingMode ? cutCostFlat : 0
  const grandTotal = subtotalPaper + cuttingExtra

  // Yield Calculation
  const calculateYield = () => {
    const sheetW = 70
    const sheetH = 100
    if (cutWidth <= 0 || cutHeight <= 0) return { cuts: 0, pct: 0, total: 0 }
    
    const cuts1 = Math.floor(sheetW / cutWidth) * Math.floor(sheetH / cutHeight)
    const cuts2 = Math.floor(sheetW / cutHeight) * Math.floor(sheetH / cutWidth)
    const maxCuts = Math.max(cuts1, cuts2, 1)
    const usedArea = maxCuts * (cutWidth * cutHeight)
    const totalSheetArea = sheetW * sheetH
    const yieldPct = Math.min(Math.round((usedArea / totalSheetArea) * 100), 99)
    const totalHojas = maxCuts * (quantity * baseSheetCount)

    return { maxCuts, yieldPct, totalHojas }
  }

  const yieldData = calculateYield()

  const handlePresetChange = (val: string) => {
    setCutPreset(val)
    if (val === 'sra3') { setCutWidth(32); setCutHeight(45) }
    else if (val === 'a3') { setCutWidth(29.7); setCutHeight(42) }
    else if (val === 'a4') { setCutWidth(21); setCutHeight(29.7) }
    else if (val === 'half') { setCutWidth(50); setCutHeight(70) }
  }

  const handleAddToCart = () => {
    addToCart({
      id: unwrappedParams.id || 'p3',
      name: 'Cartulina Ilustración Semi-Mate 300g',
      category: 'Pliego 70x100 cm',
      price: unitPrice,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrJPUWG5a4yJk4cN_X-4GGTR2JFNHSC45X4U-_M6fZ_m9Zcod21OV4_VMGsSdr5BynYCb_gBVv7QePLfXlP8zbHKrZTlXbDkWJgk6jRnPWoK8greSlaY-kzVgnZGYaCspYwESmqVvrnniUJ9FLxEZtesagjcX90YEv79qBuMfi2ZFW05x37I51FQ8dkvFfIVEQOiyKnpB4T9pk5KVyNuTit7vg894KlaEW7sWT0Nr9keCdMkVkLQPFlg',
    })
    // Can optionally add quantity logic if the context supports it, 
    // for now we add it `quantity` times or modify the cart to accept quantity.
    // For simplicity, we add 1 item that represents the whole bulk if we want,
    // or call addToCart multiple times.
    for(let i = 1; i < quantity; i++){
        addToCart({
            id: unwrappedParams.id || 'p3',
            name: 'Cartulina Ilustración Semi-Mate 300g',
            category: 'Pliego 70x100 cm',
            price: unitPrice,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrJPUWG5a4yJk4cN_X-4GGTR2JFNHSC45X4U-_M6fZ_m9Zcod21OV4_VMGsSdr5BynYCb_gBVv7QePLfXlP8zbHKrZTlXbDkWJgk6jRnPWoK8greSlaY-kzVgnZGYaCspYwESmqVvrnniUJ9FLxEZtesagjcX90YEv79qBuMfi2ZFW05x37I51FQ8dkvFfIVEQOiyKnpB4T9pk5KVyNuTit7vg894KlaEW7sWT0Nr9keCdMkVkLQPFlg',
        })
    }
  }

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount)

  const thumbs = [
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrJPUWG5a4yJk4cN_X-4GGTR2JFNHSC45X4U-_M6fZ_m9Zcod21OV4_VMGsSdr5BynYCb_gBVv7QePLfXlP8zbHKrZTlXbDkWJgk6jRnPWoK8greSlaY-kzVgnZGYaCspYwESmqVvrnniUJ9FLxEZtesagjcX90YEv79qBuMfi2ZFW05x37I51FQ8dkvFfIVEQOiyKnpB4T9pk5KVyNuTit7vg894KlaEW7sWT0Nr9keCdMkVkLQPFlg', label: '1. Pliegos 70x100' },
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4IfmrkZdUqQlCcC0jDkov3ypdjjTzceYGzVqjH5f8mfP42JBLA7BURuVEORk16ghh1ZvPMMMA6YKzhAiEUaOMYfxvw4yO84jGurEVGmjuDBi3YpUQuzB3Y0KDfbx3JeSoP6pEt5GARcxc3SDpOFxv_f5Wu5SwlXAGJMcuXogNkq8-Bep4HmSVU3wS2-hVckK89rLfSGrcNFYlqMAQENnHELU7LnWNbvdb5p2yEaynLuxBRGPYML36jw', label: '2. Fibra y Grano' },
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsh23PbwrwhfD-1eebQ7JAqNFr3N4ndyAmre-RiKiQej_-Fh_FoyZTucSJE_wf6HDJAkWZNpUXORoNVsi9RF_yQCNNQySPbeyUHa9UpfZ7wxCwcOFIRCkVGFAwUlNObclZjeb_gzUlR6L28WjFNOez5dEkz8--Y5b8E4RcX-_AMhsN7m_QRtbQyT2ombfT0HfurHToimUAl50udM6CFhC8uiAbcftpiH1AgKdsVFHAe_HE_yfHFJiCwA', label: '3. Test Rigidez' },
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJRv35_zqiyVFiSOJs4cBYnWrGsh15U7cfe4ScMLl68dxrGrvrpyNTVVLtRWHWhASQdEd3IE507Z32kp5PSHItN6cuX_LtpeXH6XudannxK7ERKsmJScBl-YtAQODXgGmHDdmOGXaayzPXevjtNtxX-uAm5i9s9yatnu2U52ZGfoTaXG_U38ynsVUq8L6jrKSywa-_7Lw3JITNTTDVIzcmPhHwWsuIZbYt9XRmBSsnWxY1haqZd0-qTQ', label: '4. Empaque Fabril' }
  ]

  return (
    <main className="w-full pt-[132px] bg-surface min-h-[calc(100vh-280px)]">
      <div className="flex flex-col w-full">
        <div className="max-w-[1280px] w-full mx-auto px-margin-sm md:px-gutter py-space-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            
            {/* LEFT COLUMN: Gallery */}
            <div className="lg:col-span-5 flex flex-col gap-space-md">
              <div className="relative w-full rounded-xl overflow-hidden bg-surface-container-low shadow-sm flex flex-col items-center justify-center p-space-md">
                <div className="absolute top-space-md left-space-md z-10 flex flex-col gap-space-xs">
                  <span className="inline-flex items-center gap-1 bg-surface-container-lowest text-primary font-label-eyebrow text-label-eyebrow uppercase px-space-sm py-1 rounded shadow-sm">
                    <span className="material-symbols-outlined text-[14px] text-secondary">verified</span>
                    FSC Certificado
                  </span>
                  <span className="inline-flex items-center gap-1 bg-tertiary-container text-on-tertiary font-label-eyebrow text-label-eyebrow uppercase px-space-sm py-1 rounded shadow-sm">
                    Stock Inmediato
                  </span>
                </div>
                <div className="absolute top-space-md right-space-md z-10">
                  <button className="w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                  </button>
                </div>
                <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-container-lowest flex items-center justify-center relative group p-space-sm">
                  <img className="w-full h-full object-cover rounded shadow-md transition-transform duration-300 group-hover:scale-[1.02]" src={thumbs[activeThumb].src} alt="Product image" />
                  <div className="absolute bottom-space-sm right-space-sm bg-inverse-surface/85 backdrop-blur-sm text-inverse-on-surface text-[11px] font-label-md px-space-sm py-0.5 rounded flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">zoom_in</span> Pliego 70 x 100 cm
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-space-sm">
                {thumbs.map((t, idx) => (
                  <button key={idx} onClick={() => setActiveThumb(idx)} className={`p-1 rounded-lg bg-surface-container-lowest shadow-sm transition-all focus:outline-none ${activeThumb === idx ? 'ring-2 ring-primary' : 'hover:bg-surface-container'}`}>
                    <div className="aspect-square rounded overflow-hidden bg-surface-container-low">
                      <img className="w-full h-full object-cover" src={t.src} alt={t.label} />
                    </div>
                    <p className="font-data-tabular text-[10px] text-on-surface-variant text-center mt-1 truncate">{t.label}</p>
                  </button>
                ))}
              </div>

              {/* Technical Pills */}
              <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
                <div className="flex items-center gap-space-sm bg-surface-container-lowest p-space-sm rounded-lg shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px] text-on-secondary-fixed-variant">eco</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-eyebrow text-label-eyebrow uppercase text-on-surface-variant">Origen Sustentable</span>
                    <span className="font-label-md text-label-md text-on-surface truncate">FSC Certificado 100%</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm bg-surface-container-lowest p-space-sm rounded-lg shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px] text-on-primary-fixed-variant">wb_sunny</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-eyebrow text-label-eyebrow uppercase text-on-surface-variant">Luminosidad</span>
                    <span className="font-label-md text-label-md text-on-surface truncate">Blancura 98% ISO</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-surface-container p-space-md rounded-xl flex items-center justify-between mt-2">
                <div className="flex items-center gap-space-md">
                  <div className="w-14 h-11 bg-surface-container-lowest rounded shadow-sm flex flex-col items-center justify-center font-data-tabular text-[10px] text-on-surface-variant font-bold leading-tight">
                    <span>70 cm</span>
                    <span className="text-[8px] opacity-60">× 100 cm</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface">Formato Madre Estándar</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Apto guillotina lineal cortes especiales.</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-primary text-[24px]">aspect_ratio</span>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-7 flex flex-col gap-space-md">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between flex-wrap gap-space-xs">
                  <span className="bg-secondary-fixed text-on-secondary-fixed-variant px-space-sm py-0.5 rounded font-label-eyebrow text-label-eyebrow uppercase tracking-wider font-bold">
                    SUZANO / CHAMBRIL · CALIDAD PRIMERA A
                  </span>
                  <div className="flex items-center gap-1 text-on-surface-variant font-data-tabular text-body-sm">
                    <span>SKU: <strong className="text-on-surface">CAR-ILU-300-70100</strong></span>
                  </div>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface leading-tight mt-1">
                  Cartulina Ilustración Semi-Mate 300 grs — Pliego 70 x 100 cm
                </h1>
                <div className="flex items-center gap-space-md flex-wrap mt-1">
                  <div className="flex items-center gap-1.5 text-secondary">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
                    <span className="font-label-md text-label-md font-semibold text-secondary">En stock (140 paquetes)</span>
                  </div>
                  <span className="text-outline-variant">•</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Despacho en 24h</span>
                </div>
              </div>

              {/* Price Display */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-end justify-between gap-space-md">
                <div className="flex flex-col">
                  <span className="font-label-eyebrow text-label-eyebrow uppercase text-on-surface-variant">Precio mayorista por paquete (100 pliegos)</span>
                  <div className="flex items-baseline gap-space-sm mt-0.5">
                    <span className="font-headline-xl text-headline-xl text-primary font-normal leading-none">{formatMoney(unitPrice)}</span>
                    <span className="font-label-md text-label-md text-on-surface-variant">IVA incl.</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-data-tabular text-body-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">
                      {formatMoney(sheetPrice)} por pliego
                    </span>
                    <span className="font-body-sm text-body-sm text-secondary font-medium">Factura A o B</span>
                  </div>
                </div>
                <div className="bg-primary-fixed/40 px-space-md py-space-sm rounded-lg flex items-center gap-space-sm shrink-0">
                  <span className="material-symbols-outlined text-primary text-[22px]">savings</span>
                  <div className="flex flex-col">
                    <span className="font-label-eyebrow text-label-eyebrow uppercase text-on-surface-variant">Ahorro Escalonado</span>
                    <span className="font-label-md text-label-md text-primary font-bold">Hasta 15% OFF</span>
                  </div>
                </div>
              </div>

              {/* Tiers */}
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-label-eyebrow text-label-eyebrow uppercase text-on-surface font-bold tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">scale</span> Escala de Precios por Volumen
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                  <div onClick={() => setQuantity(1)} className={`p-space-sm rounded-lg transition-all cursor-pointer ${quantity < 5 ? 'ring-2 ring-primary bg-surface-container-lowest' : 'bg-surface-container-low'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">1 a 4 paquetes</span>
                    </div>
                    <div className="font-headline-sm text-headline-sm text-on-surface font-normal">$ 62.400</div>
                    <p className="font-data-tabular text-[11px] text-on-surface-variant mt-0.5">$ 624 / pliego</p>
                  </div>
                  <div onClick={() => setQuantity(5)} className={`p-space-sm rounded-lg transition-all cursor-pointer relative ${quantity >= 5 && quantity < 20 ? 'ring-2 ring-primary bg-surface-container-lowest' : 'bg-surface-container-low'}`}>
                    <span className="absolute -top-2 right-2 bg-primary text-on-primary font-label-eyebrow text-[10px] px-1.5 py-0.5 rounded uppercase">-8% Ahorro</span>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">5 a 19 paquetes</span>
                    </div>
                    <div className="font-headline-sm text-headline-sm text-primary font-medium">$ 57.408</div>
                    <p className="font-data-tabular text-[11px] text-on-surface-variant mt-0.5">$ 574 / pliego</p>
                  </div>
                  <div onClick={() => setQuantity(20)} className={`p-space-sm rounded-lg transition-all cursor-pointer relative ${quantity >= 20 ? 'ring-2 ring-primary bg-surface-container-lowest' : 'bg-surface-container-low'}`}>
                    <span className="absolute -top-2 right-2 bg-secondary text-on-secondary font-label-eyebrow text-[10px] px-1.5 py-0.5 rounded uppercase">-15% Pallet</span>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">20+ paquetes</span>
                    </div>
                    <div className="font-headline-sm text-headline-sm text-secondary font-bold">$ 53.040</div>
                    <p className="font-data-tabular text-[11px] text-on-surface-variant mt-0.5">Ahorro: $ 9.360/paq</p>
                  </div>
                </div>
              </div>

              {/* Cutter Form */}
              <div className="bg-surface-container-low rounded-xl p-space-md shadow-sm">
                <div className="flex items-center gap-space-sm pb-space-sm">
                  <div className="w-8 h-8 rounded bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">content_cut</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">Servicio de Guillotina Computarizada</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Entregamos tus pliegos fraccionados con precisión micrométrica</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-space-xs p-1 bg-surface-container rounded-lg my-space-sm">
                  <button onClick={() => setCuttingMode(false)} className={`py-space-xs font-label-md text-label-md rounded transition-all flex items-center justify-center gap-1.5 ${!cuttingMode ? 'bg-surface-container-lowest text-on-surface shadow-sm' : 'text-on-surface-variant'}`}>
                    <span className="material-symbols-outlined text-[16px]">check_box_outline_blank</span> Pliego Entero
                  </button>
                  <button onClick={() => setCuttingMode(true)} className={`py-space-xs font-label-md text-label-md rounded transition-all flex items-center justify-center gap-1.5 ${cuttingMode ? 'bg-surface-container-lowest text-on-surface shadow-sm' : 'text-on-surface-variant'}`}>
                    <span className="material-symbols-outlined text-[16px]">content_cut</span> Cortar a Medida
                  </button>
                </div>

                {cuttingMode && (
                  <div className="flex flex-col gap-space-sm pt-space-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-space-sm items-center">
                      <div className="sm:col-span-5 flex flex-col gap-1">
                        <label className="font-label-eyebrow text-label-eyebrow uppercase text-on-surface-variant">Formato Frecuente</label>
                        <select value={cutPreset} onChange={(e) => handlePresetChange(e.target.value)} className="w-full bg-surface-container-lowest px-space-sm py-2 rounded font-body-sm text-body-sm text-on-surface focus:outline-none shadow-sm">
                          <option value="custom">Medida Manual...</option>
                          <option value="sra3">SRA3 (32 × 45 cm) · Digital</option>
                          <option value="a3">A3 Estándar (29,7 × 42 cm)</option>
                          <option value="a4">A4 Oficio / Carpeta (21 × 29,7 cm)</option>
                          <option value="half">Medio Pliego (50 × 70 cm)</option>
                        </select>
                      </div>
                      <div className="sm:col-span-7 grid grid-cols-2 gap-space-xs">
                        <div className="flex flex-col gap-1">
                          <label className="font-label-eyebrow text-label-eyebrow uppercase text-on-surface-variant">Ancho (cm)</label>
                          <input type="number" step="0.5" value={cutWidth} onChange={(e) => {setCutWidth(parseFloat(e.target.value)); setCutPreset('custom')}} className="w-full bg-surface-container-lowest px-space-sm py-2 rounded font-data-tabular text-body-sm text-on-surface focus:outline-none shadow-sm" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="font-label-eyebrow text-label-eyebrow uppercase text-on-surface-variant">Alto (cm)</label>
                          <input type="number" step="0.5" value={cutHeight} onChange={(e) => {setCutHeight(parseFloat(e.target.value)); setCutPreset('custom')}} className="w-full bg-surface-container-lowest px-space-sm py-2 rounded font-data-tabular text-body-sm text-on-surface focus:outline-none shadow-sm" />
                        </div>
                      </div>
                    </div>
                    <div className="p-space-sm rounded-lg bg-surface-container-lowest flex flex-col sm:flex-row items-center justify-between gap-space-sm shadow-sm">
                      <div className="flex items-center gap-space-sm">
                        <span className="material-symbols-outlined text-secondary text-[22px]">analytics</span>
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">Rinde {yieldData.maxCuts} cortes por hoja base ({yieldData.yieldPct}% apv.)</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">Obtendrás <strong>{yieldData.totalHojas.toLocaleString('es-AR')} hojas cortadas</strong> con el pedido actual.</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 font-label-eyebrow text-label-eyebrow uppercase bg-secondary-fixed text-on-secondary-fixed-variant px-space-sm py-1 rounded">
                        Refile Incluido
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Add to Cart Actions */}
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-md flex flex-col gap-space-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                  <div className="flex items-center gap-space-sm">
                    <div className="flex flex-col">
                      <span className="font-label-eyebrow text-label-eyebrow uppercase text-on-surface-variant">Cantidad (Paquetes x100)</span>
                      <div className="flex items-center bg-surface-container rounded-lg p-1 mt-1 shadow-inner">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded bg-surface-container-lowest hover:bg-surface-container-high transition-colors shadow-sm focus:outline-none"><span className="material-symbols-outlined text-[18px]">remove</span></button>
                        <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)||1))} className="w-16 text-center bg-transparent font-headline-sm text-headline-sm text-on-surface font-bold focus:outline-none" />
                        <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded bg-surface-container-lowest hover:bg-surface-container-high transition-colors shadow-sm focus:outline-none"><span className="material-symbols-outlined text-[18px]">add</span></button>
                      </div>
                    </div>
                    <div className="text-body-sm text-on-surface-variant flex flex-col justify-end pt-5">
                      <span>= {(quantity * baseSheetCount).toLocaleString('es-AR')} pliegos base</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end">
                    <span className="font-label-eyebrow text-label-eyebrow uppercase text-on-surface-variant">Subtotal Final Calculado</span>
                    <div className="font-headline-xl text-headline-xl text-primary font-bold leading-tight">{formatMoney(grandTotal)}</div>
                    <span className="font-data-tabular text-[11px] text-on-surface-variant">Incluye IVA 21%</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs">
                  <button onClick={handleAddToCart} className="w-full bg-primary hover:bg-primary-container text-on-primary py-space-md px-gutter rounded-lg font-label-md text-label-md flex items-center justify-center gap-space-sm transition-all shadow-md">
                    <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                    <span>Agregar al Carrito</span>
                  </button>
                  <Link href="/checkout" className="w-full bg-secondary hover:bg-on-secondary-fixed-variant text-on-secondary py-space-md px-gutter rounded-lg font-label-md text-label-md flex items-center justify-center gap-space-sm transition-all shadow-md">
                    <span className="material-symbols-outlined text-[20px]">flash_on</span>
                    <span>Comprar Ahora (Factura A)</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>

          {/* Technical Tabs */}
          <div className="w-full mt-space-xl pt-space-md">
            <div className="flex items-center gap-space-sm overflow-x-auto pb-space-xs">
              <button onClick={() => setActiveTab('specs')} className={`px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-all flex items-center gap-2 shrink-0 ${activeTab === 'specs' ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container text-on-surface-variant'}`}>
                <span className="material-symbols-outlined text-[18px]">tune</span> Especificaciones Técnicas
              </button>
              <button onClick={() => setActiveTab('usage')} className={`px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-all flex items-center gap-2 shrink-0 ${activeTab === 'usage' ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container text-on-surface-variant'}`}>
                <span className="material-symbols-outlined text-[18px]">auto_stories</span> Guía de Impresión y Usos
              </button>
              <button onClick={() => setActiveTab('logistics')} className={`px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-all flex items-center gap-2 shrink-0 ${activeTab === 'logistics' ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container text-on-surface-variant'}`}>
                <span className="material-symbols-outlined text-[18px]">local_shipping</span> Envíos y Logística
              </button>
            </div>
            
            <div className="mt-space-md">
              {activeTab === 'specs' && (
                <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                    <div className="flex flex-col gap-space-sm">
                      <h4 className="font-headline-sm text-headline-sm text-primary flex items-center gap-2">Parámetros Físicos</h4>
                      <div className="space-y-space-xs">
                        <div className="flex justify-between py-1 bg-surface-container-low px-space-sm rounded"><span className="font-body-sm text-body-sm text-on-surface-variant">Gramaje Nominal:</span><strong className="font-data-tabular text-body-sm text-on-surface">300 g/m²</strong></div>
                        <div className="flex justify-between py-1 px-space-sm"><span className="font-body-sm text-body-sm text-on-surface-variant">Formato Plano:</span><strong className="font-data-tabular text-body-sm text-on-surface">700 × 1000 mm</strong></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'usage' && (
                <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm grid grid-cols-1 md:grid-cols-3 gap-gutter">
                  <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-sm">
                    <h4 className="font-headline-sm text-headline-sm text-on-surface">Tapas de Libros & Revistas</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Gramaje insignia para encuadernación rústica.</p>
                  </div>
                </div>
              )}
              {activeTab === 'logistics' && (
                <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                    <div className="flex items-start gap-space-sm">
                      <span className="material-symbols-outlined text-primary text-[28px] mt-1 shrink-0">local_shipping</span>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">Flota Propia en AMBA</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Camiones equipados con plataforma hidráulica. Entregas en 24/48 hs.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
