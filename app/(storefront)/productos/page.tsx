import Link from 'next/link'
import { CatalogProductCard } from '@/components/product/CatalogProductCard'

export const metadata = {
  title: 'Catálogo de Papeles | Papelera Bertolín',
}

export default function ProductosPage() {
  const catalogProducts = [
    {
      id: 'p1',
      refCode: 'BOR-75A4',
      brand: 'Celulosa Argentina · Obra',
      title: 'Resma Boreal Obra 75g A4 (500 Hojas)',
      specs: ['75 g/m²', '210 × 297 mm', 'Blancura 96%'],
      price: 8750,
      bulkPrice: '$ 8.100 c/u',
      stockMsg: 'Stock Inmediato',
      tag1: 'En stock',
      tag2: 'Básico Oficina',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ10Ct4tw9XL2fw_yIOyGvFLphaVTcmLkO7hIeSB_9b3HLCEse6D_sfo55z9a2nTKgh6In-qoE87v38W7h2KvvebNdWwpXKo9dOmBRR2kVfs7mqKgGzdKCsZf-0iXu9MPBnf83SslHZtXoEZK_wlCTbrns_Am7e_oDt3rgQFozF2aRfBSkRtwsej4fD2gDe33OKliJNAZCQ-BSl8qqp6AV_Kbj4-H5313tb8DpbN0Z_neRhbC4VelSzA'
    },
    {
      id: 'p2',
      refCode: 'CHM-90-6595',
      brand: 'Sylvamo · Chambril Plano',
      title: 'Chambril Obra Blanco 90g - 65×95 cm',
      specs: ['90 g/m²', '650 × 950 mm', 'Grano Largo'],
      price: 48900,
      bulkPrice: '$ 45.450 c/u',
      stockMsg: '48 resmas disp.',
      tag1: 'Más Pedido Offset',
      tag2: 'Sylvamo Molino',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnnJHH-Pkg49azPEWh8r9Ad6FRHOV3PT8CJqLd6h5DmzEBc7Le-4OPgtbi08KZMgDd-IDVb37WOc6sPuTYLlXNccBYw2Yj1_wEc_SWbxaFqpSqtScgPgqiXQAmJZxufQvpiM2Ip9SOV8u1TtPhTLyUAaFBC0gtgcPjSeV4RYr4dtZMj68p1xoWGTZhjap75oGIlp2rG_7O9IrreK-yZrjXmH4cEN32rxXcmwV7PmNvXrkOuVGJGQiueA'
    },
    {
      id: 'p3',
      refCode: 'CRT-300-7010',
      brand: 'Suzano · Encapado Satin',
      title: 'Cartulina Ilustración Semi-Mate 300g',
      specs: ['300 g/m²', '700 × 1000 mm', 'Doble faz'],
      price: 62400,
      bulkPrice: '$ 57.800 c/u',
      stockMsg: 'Stock en Barracas',
      tag1: 'Alta Rigidez',
      tag2: 'Packaging',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV4_hNT4RzFf0zqnpoI4hoBQD_T9WOlO762ItxKNUOuAMKXrZSg7umn4WPuO-DvJ50b0CYR66BUuN-J81AwCxl1Rrn8pFFA-QeaRCUhJ2kmkyJkk4-JwibYW5Utr61wVEI__Izc2nCI1bIAvWImNzTF612_Ir9ZX2uCigRlhbSNxh9QILM0MMYdYqGZ5bhgAkFkZUsG9VRwoBsMGvLFGSF2ke58Fwv1UIQuD-EB1ogcBUbkTGLuIdGqw'
    },
    {
      id: 'p4',
      refCode: 'KFT-120-BOB',
      brand: 'Klabin · Kraft Puro',
      title: 'Bobina Kraft Puro 120g - 90cm ancho',
      specs: ['120 g/m²', 'Ancho 90cm', 'Fibra larga'],
      price: 115000,
      bulkPrice: '$ 105.000 c/u',
      stockMsg: '12 bobinas disp.',
      tag1: 'Alta Resistencia',
      tag2: 'Industrial',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMVTu4NDQxqzxdPlq6F3L7XQgQLuz4wATeLc48Gbl9AUaDWpt_HypAm6bT4SujZ9aCoGZbEwqwUEzA4xVwMs9qSgae1NHEgN2JJookL4GXt_XzY15m-iBcRyk5ByybFpAJd6TxOV3rif1CzJVr1m5kdPSx7ItNoiq0HQA7013yAvk-cFVLFYRhO7jdcSQpAyK-r4YBkXhzD0zMRlUV6__UNIwKCpV_eZHWtqHJryRB_BG0MWP1xpVChw'
    },
    {
      id: 'p5',
      refCode: 'CG-20-7210',
      brand: 'Nacional · Cartón Gris',
      title: 'Cartón Gris 2mm - 72×102 cm (Paq. x10)',
      specs: ['2 mm', '720 × 1020 mm', 'Rígido'],
      price: 18200,
      bulkPrice: '$ 16.500 c/u',
      stockMsg: 'Stock Inmediato',
      tag1: 'Encuadernación',
      tag2: '',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJmnQ-Xu5uLJM45JvVXtY2x_QyfZmpSI4AAT2jKcVCwg2VAACJjcNRfr0lSLz-JzNi9Zv1yUniCA9pYb6pVnk4PCh4UK3wkaKTpUkNhtm73PPgfk_bo-xs5L1oH60h6_-Ei23L05zlnjRt1ziKJIdq6PWRayQmzXxGy_PrXBFmikq8NtkIw8qOQgGLLpcwG8Zg0O618y7kxKdLqnXjUhgH9Q59RZoAuVsy4QLh5N9DwlCxGSJGa6ujEw'
    },
    {
      id: 'p6',
      refCode: 'ADH-MT-6595',
      brand: 'Fasson · Autoadhesivo',
      title: 'Autoadhesivo Mate 90g - 65×95 (Paq. x25)',
      specs: ['90 g/m²', '650 × 950 mm', 'Siliconado'],
      price: 28900,
      bulkPrice: '$ 26.000 c/u',
      stockMsg: 'Stock Planta',
      tag1: 'Oferta',
      tag2: '',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcyjucJlYGs2aQq9O1NGj1bSLzpZYbNIj5T9J9bm2pIg3qYPCRnSYvjprd4ad8p2kUyu7xAuHksyKi_HqDk7fnz-RdRtov1ko0SSZwry-MM6gb6dxmxj8JQQmk13KVM4tiB67il7wSHAzQeifHHDT1EkgwweZ8uMrEcBSwh42pL0xZkj5o1R9iGzm1WlCIF8BzBcFcXb-buGEGfu4Vq2HiNFEPuHtDUOt4OUPz50OcAB6MHKO_qjqaCQ'
    }
  ]

  return (
    <main className="w-full pt-[132px] bg-surface min-h-[calc(100vh-280px)]">
      <div className="flex flex-col w-full">
        {/* Header Section: Architectural Heritage Mood */}
        <section className="w-full px-margin-sm md:px-gutter pt-space-lg pb-space-md">
          <div className="max-w-[1280px] mx-auto relative">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md pb-space-md">
              <div className="max-w-3xl space-y-space-xs">
                <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mt-2">Catálogo de Productos</h1>
              </div>
            </div>


          </div>
        </section>

        {/* Main Content Layout (Sidebar + Product Grid) */}
        <div className="w-full px-margin-sm md:px-gutter pb-space-xl">
          <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-start gap-gutter">
            
            {/* LEFT SIDEBAR: Professional Parametric B2B Filters (280px fixed width on desktop) */}
            <aside className="w-full lg:w-[280px] shrink-0 bg-surface-container-low rounded-xl p-space-md space-y-space-md shadow-sm">
              
              {/* Active applied filters header */}
              <div className="space-y-space-xs pb-space-sm bg-surface-container-lowest p-space-sm rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-eyebrow text-label-eyebrow uppercase text-on-surface font-bold tracking-wider">Filtros Activos</span>
                  <button className="text-primary hover:text-primary-container text-body-sm font-label-md underline underline-offset-2">Limpiar todo</button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="inline-flex items-center gap-1 bg-surface-container text-on-surface font-label-md text-[11px] px-2 py-0.5 rounded-full">
                    Papel Plano <span className="material-symbols-outlined text-[13px] cursor-pointer hover:text-primary">close</span>
                  </span>
                  <span className="inline-flex items-center gap-1 bg-secondary-fixed text-on-secondary-fixed-variant font-label-md text-[11px] px-2 py-0.5 rounded-full">
                    En Stock Inmediato <span className="material-symbols-outlined text-[13px] cursor-pointer hover:text-primary">close</span>
                  </span>
                </div>
              </div>

              {/* Filter 1: Gramaje with Slider & Checks */}
              <div className="space-y-space-xs bg-surface-container-lowest p-space-sm rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Gramaje (g/m²)</h3>
                  <span className="material-symbols-outlined text-[18px] text-outline">tune</span>
                </div>
                {/* Grammage Range Gauge Indicator SVG */}
                <div className="py-space-xs">
                  <div className="flex justify-between text-data-tabular font-data-tabular text-on-surface-variant mb-1">
                    <span>55 g</span>
                    <span className="font-semibold text-primary">70 - 300 g</span>
                    <span>450 g</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden relative">
                    <div className="absolute left-[15%] right-[25%] h-full bg-primary rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-1.5 pt-1 font-body-sm text-body-sm text-on-surface">
                  <label className="flex items-center justify-between cursor-pointer hover:text-primary transition-colors py-0.5">
                    <span className="flex items-center gap-2">
                      <input defaultChecked className="accent-primary rounded-sm w-4 h-4 cursor-pointer" type="checkbox"/>
                      <span>70 a 90 grs</span>
                    </span>
                    <span className="font-data-tabular text-data-tabular text-on-surface-variant bg-surface-container px-1.5 rounded">18</span>
                  </label>
                  <label className="flex items-center justify-between cursor-pointer hover:text-primary transition-colors py-0.5">
                    <span className="flex items-center gap-2">
                      <input className="accent-primary rounded-sm w-4 h-4 cursor-pointer" type="checkbox"/>
                      <span>120 a 180 grs</span>
                    </span>
                    <span className="font-data-tabular text-data-tabular text-on-surface-variant bg-surface-container px-1.5 rounded">14</span>
                  </label>
                  <label className="flex items-center justify-between cursor-pointer hover:text-primary transition-colors py-0.5">
                    <span className="flex items-center gap-2">
                      <input defaultChecked className="accent-primary rounded-sm w-4 h-4 cursor-pointer" type="checkbox"/>
                      <span>200 a 300 grs</span>
                    </span>
                    <span className="font-data-tabular text-data-tabular text-on-surface-variant bg-surface-container px-1.5 rounded">22</span>
                  </label>
                  <label className="flex items-center justify-between cursor-pointer hover:text-primary transition-colors py-0.5">
                    <span className="flex items-center gap-2">
                      <input className="accent-primary rounded-sm w-4 h-4 cursor-pointer" type="checkbox"/>
                      <span>350 grs o superior</span>
                    </span>
                    <span className="font-data-tabular text-data-tabular text-on-surface-variant bg-surface-container px-1.5 rounded">9</span>
                  </label>
                </div>
              </div>

              {/* Filter 2: Formatos y Medidas Industriales */}
              <div className="space-y-space-xs bg-surface-container-lowest p-space-sm rounded-lg shadow-sm">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Formato / Medidas</h3>
                <div className="grid grid-cols-2 gap-1.5 font-body-sm text-body-sm pt-1">
                  <button className="text-left px-2 py-1.5 rounded bg-surface hover:bg-surface-container-high transition-colors flex flex-col">
                    <span className="font-label-md text-label-md font-semibold text-primary">Pliego 65×95</span>
                    <span className="text-[11px] text-on-surface-variant">Offset estándar</span>
                  </button>
                  <button className="text-left px-2 py-1.5 rounded bg-surface hover:bg-surface-container-high transition-colors flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface">Pliego 70×100</span>
                    <span className="text-[11px] text-on-surface-variant">Editorial / Cajas</span>
                  </button>
                  <button className="text-left px-2 py-1.5 rounded bg-surface hover:bg-surface-container-high transition-colors flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface">Pliego 82×118</span>
                    <span className="text-[11px] text-on-surface-variant">Extra grande</span>
                  </button>
                  <button className="text-left px-2 py-1.5 rounded bg-surface hover:bg-surface-container-high transition-colors flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface">Resmas A4</span>
                    <span className="text-[11px] text-on-surface-variant">21 × 29.7 cm</span>
                  </button>
                  <button className="text-left px-2 py-1.5 rounded bg-surface hover:bg-surface-container-high transition-colors flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface">Oficio Comercial</span>
                    <span className="text-[11px] text-on-surface-variant">22 × 34 cm</span>
                  </button>
                  <button className="text-left px-2 py-1.5 rounded bg-surface hover:bg-surface-container-high transition-colors flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface">Bobinas 60/90</span>
                    <span className="text-[11px] text-on-surface-variant">Plotter / Empaque</span>
                  </button>
                </div>
              </div>

              {/* Filter 3: Molino y Marca */}
              <div className="space-y-space-xs bg-surface-container-lowest p-space-sm rounded-lg shadow-sm">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Marca / Fabricante</h3>
                <div className="space-y-1.5 font-body-sm text-body-sm text-on-surface">
                  <label className="flex items-center justify-between cursor-pointer hover:text-primary">
                    <span className="flex items-center gap-2">
                      <input defaultChecked className="accent-primary rounded-sm w-4 h-4" type="checkbox"/>
                      <span>Chambril (Sylvamo)</span>
                    </span>
                    <span className="text-data-tabular font-data-tabular text-on-surface-variant">12</span>
                  </label>
                  <label className="flex items-center justify-between cursor-pointer hover:text-primary">
                    <span className="flex items-center gap-2">
                      <input defaultChecked className="accent-primary rounded-sm w-4 h-4" type="checkbox"/>
                      <span>Boreal (Celulosa Arg.)</span>
                    </span>
                    <span className="text-data-tabular font-data-tabular text-on-surface-variant">9</span>
                  </label>
                  <label className="flex items-center justify-between cursor-pointer hover:text-primary">
                    <span className="flex items-center gap-2">
                      <input className="accent-primary rounded-sm w-4 h-4" type="checkbox"/>
                      <span>Ledesma Nat Caña</span>
                    </span>
                    <span className="text-data-tabular font-data-tabular text-on-surface-variant">6</span>
                  </label>
                  <label className="flex items-center justify-between cursor-pointer hover:text-primary">
                    <span className="flex items-center gap-2">
                      <input className="accent-primary rounded-sm w-4 h-4" type="checkbox"/>
                      <span>Suzano / Klabin</span>
                    </span>
                    <span className="text-data-tabular font-data-tabular text-on-surface-variant">8</span>
                  </label>
                </div>
              </div>

            </aside>

            {/* RIGHT COLUMN: Listing Toolbar & Product Cards Grid */}
            <div className="flex-1 w-full space-y-space-md">
              
              {/* Results Toolbar */}
              <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-sm">
                <div className="flex items-center gap-space-md">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Mostrando <strong className="text-on-surface font-semibold">36 resultados</strong> de papeles planos y continuos
                  </span>
                  <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
                  <span className="hidden md:inline-block font-label-eyebrow text-label-eyebrow text-secondary uppercase font-semibold">Envíos AMBA en 24/48 hs</span>
                </div>
                <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
                  {/* Sort Selector */}
                  <div className="flex items-center gap-1.5 bg-surface px-space-sm py-1.5 rounded-lg text-body-sm font-body-sm text-on-surface">
                    <span className="text-on-surface-variant font-label-md text-label-md text-nowrap">Ordenar por:</span>
                    <select className="bg-transparent font-label-md text-label-md text-on-surface focus:outline-none cursor-pointer">
                      <option defaultValue="Mas populares">Más populares</option>
                      <option value="Menor precio por kg">Menor precio por kg</option>
                      <option value="Mayor precio">Mayor precio</option>
                      <option value="Mayor gramaje">Mayor gramaje</option>
                      <option value="Novedades de molino">Novedades de molino</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* PRODUCT CARDS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-md">
                {catalogProducts.map((prod) => (
                  <CatalogProductCard key={prod.id} {...prod} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
