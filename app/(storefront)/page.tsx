import Link from 'next/link'
import { ProductCard } from '@/components/product/ProductCard'

export default function Page() {
  return (
    <main className="w-full pt-[132px] bg-surface min-h-[calc(100vh-280px)]">
      {/* HERO SECTION */}
      <section className="relative w-full bg-surface-container-lowest overflow-hidden border-b border-surface-container select-none">
        <div className="relative w-full min-h-[540px] md:min-h-[580px] lg:min-h-[540px] flex">
          <div className="w-full py-space-lg lg:py-[3.75rem] flex items-center">
            <div className="max-w-[1280px] w-full mx-auto px-margin-sm md:px-gutter">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
                
                <div className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-space-md order-2 lg:order-1">
                  <span className="inline-flex items-center gap-space-xs font-label-eyebrow text-label-eyebrow text-primary tracking-widest uppercase mb-space-sm bg-primary-fixed/60 px-space-sm py-0.5 rounded">
                    <span className="material-symbols-outlined text-[15px]">local_fire_department</span>
                    OFERTA DESTACADA DEL MES • HASTA 25% OFF
                  </span>
                  <h1 className="font-headline-xl text-headline-xl text-on-surface mb-space-md tracking-tight leading-[1.08]">
                    Escala Mayorista en <br className="hidden sm:inline"/>
                    <span className="text-primary italic">Resmas y Papel Kraft</span>
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mb-space-lg max-w-xl">
                    Precios especiales por pallet cerrado y bulto para imprentas, editoriales y librerías comerciales. Despacho programado en 24/48 hs en AMBA.
                  </p>
                  <div className="flex flex-wrap items-center gap-space-sm mb-space-lg w-full sm:w-auto">
                    <Link className="flex items-center justify-center gap-space-xs bg-primary text-on-primary hover:bg-primary-container px-space-lg py-space-sm rounded font-label-md text-label-md transition-all shadow-sm" href="#catalogo">
                      <span>Ver Ofertas Mayoristas</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>
                    <Link className="flex items-center justify-center gap-space-xs border border-outline/30 bg-surface-container-lowest hover:bg-surface-container text-on-surface px-space-md py-space-sm rounded font-label-md text-label-md transition-colors" href="#">
                      <span className="material-symbols-outlined text-[18px] text-secondary">table_view</span>
                      <span>Descargar Lista de Precios (.xlsx)</span>
                    </Link>
                  </div>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-y-space-xs gap-x-space-md font-body-sm text-body-sm text-on-surface-variant">
                    <span className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                      Cotización inmediata con CUIT
                    </span>
                    <span className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-secondary text-[18px]">inventory_2</span>
                      Pallets zunchados y protegidos
                    </span>
                    <span className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-secondary text-[18px]">local_shipping</span>
                      Flete bonificado por volumen
                    </span>
                  </div>
                </div>
                
                <div className="lg:col-span-6 relative mt-space-md lg:mt-0 order-1 lg:order-2">
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-low shadow-sm group">
                    <img alt="Comercial de papeles para imprentas" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBs7jy4gjWk1I3alH-cllWekfACwT6aE-h2LvQ_15uvX3d5WYGFdi86vsp_Iqkpb0nGT2CP__a_TIti-v51JqyqU20t_2zxUYa-xzbZZvO4BPb-PCo0fqeTvSiKGPq44GYPpCzt2W9DBp7qITVGsZ2ftf0DRVY4jhZylwPJW4FiyAVX8WRUrAILSZf1dkthyP0egLlCWrHlVk15Tb1uBhpwzCiMgfLLoCBkv2XN-PP7"/>
                    <div className="absolute top-space-md left-space-md bg-primary text-on-primary px-space-md py-space-xs rounded shadow-md flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[18px]">percent</span>
                      <span className="font-label-md text-label-md font-bold uppercase tracking-wider">-20% en Pallets Cerrados</span>
                    </div>
                    <div className="absolute bottom-space-md right-space-md bg-surface-container-lowest/95 backdrop-blur-md p-space-sm rounded-lg shadow-md flex items-center gap-space-sm border border-surface-container">
                      <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                        <span className="material-symbols-outlined text-[20px]">warehouse</span>
                      </div>
                      <div className="flex flex-col text-left pr-space-xs">
                        <span className="font-label-eyebrow text-[10px] text-on-surface-variant uppercase tracking-wider">Entrega Directa</span>
                        <span className="font-label-md text-label-md text-on-surface font-bold leading-tight">Stock en Planta Avellaneda</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-[1280px] mx-auto px-margin-sm md:px-gutter">
          <div className="flex items-baseline justify-between mb-space-lg">
            <div>
              <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant uppercase tracking-widest block mb-space-xs">
                Encontrá lo que buscás
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Comprar por categoría
              </h2>
            </div>
            <Link className="font-label-md text-label-md text-primary hover:text-primary-container flex items-center gap-space-xs transition-colors" href="#catalogo">
              <span>Ver todo</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {[
              { id: '01', title: 'Resmitas', desc: 'Oficio, A4 y presentación' },
              { id: '02', title: 'Obra en papel plano', desc: 'Formatos 65×95, 82×118' },
              { id: '03', title: 'Cartulinas color', desc: 'Color y creatividad' },
              { id: '04', title: 'Cartulinas pesadas', desc: 'Triplex, ilustración, encapadas' },
              { id: '05', title: 'Cartón gris', desc: 'Base y encuadernación 1.5 a 3mm' },
              { id: '06', title: 'Autoadhesivos', desc: 'Etiquetas, fasones y OPP' },
              { id: '07', title: 'Papel kraft', desc: 'Embalaje y bobinas puras' },
              { id: '08', title: 'Sobres comerciales', desc: 'Bolsa, carta y fuelles' },
            ].map((cat) => (
              <Link key={cat.id} className="group bg-surface-container-lowest hover:bg-surface-container-low p-space-md rounded-lg shadow-sm transition-all flex flex-col justify-between h-36" href="#">
                <div className="flex items-start justify-between">
                  <span className="font-label-eyebrow text-label-eyebrow text-primary">{cat.id}</span>
                  <span className="material-symbols-outlined text-[18px] text-outline group-hover:text-primary group-hover:translate-x-1 transition-all">north_east</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">{cat.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="w-full py-space-xl bg-surface-container-low" id="catalogo">
        <div className="max-w-[1280px] mx-auto px-margin-sm md:px-gutter">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-space-sm mb-space-lg">
            <div>
              <span className="font-label-eyebrow text-label-eyebrow text-primary uppercase tracking-widest block mb-space-xs">
                Catálogo Online
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Productos destacados
              </h2>
            </div>
            <div className="flex items-center gap-space-md self-stretch sm:self-auto justify-between">
              <span className="font-body-sm text-body-sm text-on-surface-variant">6 productos en vista</span>
              <button className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-xs rounded shadow-sm text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors" type="button">
                <span className="material-symbols-outlined text-[18px]">tune</span>
                <span>Filtros</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            <div className="lg:col-span-3 space-y-space-md">
              <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm">
                <h3 className="font-label-eyebrow text-label-eyebrow uppercase text-on-surface-variant mb-space-md tracking-wider">
                  Categorías
                </h3>
                <ul className="space-y-space-xs font-body-sm text-body-sm">
                  <li>
                    <button className="w-full flex items-center justify-between py-space-xs px-space-sm rounded bg-primary-fixed text-primary font-semibold text-left" type="button">
                      <span>Todos los productos</span>
                      <span className="font-data-tabular text-data-tabular">24</span>
                    </button>
                  </li>
                  {[
                    ['Resmitas', '3'],
                    ['Obra en papel plano', '3'],
                    ['Cartulinas color', '3'],
                    ['Cartulinas pesadas', '3'],
                    ['Cartón gris', '3'],
                    ['Autoadhesivos', '3'],
                    ['Papel kraft', '3'],
                    ['Sobres comerciales', '3'],
                  ].map((cat) => (
                    <li key={cat[0]}>
                      <button className="w-full flex items-center justify-between py-space-xs px-space-sm rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors text-left" type="button">
                        <span>{cat[0]}</span>
                        <span className="font-data-tabular text-data-tabular text-outline">{cat[1]}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-secondary-container text-on-secondary-fixed p-space-md rounded-lg shadow-sm relative overflow-hidden">
                <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center mb-space-sm">
                  <span className="material-symbols-outlined text-[20px]">content_cut</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-secondary-fixed mb-space-xs">
                  ¿Necesitás una medida especial?
                </h4>
                <p className="font-body-sm text-body-sm text-on-secondary-container mb-space-md">
                  Fraccionamos y guillotinamos cualquier papel de nuestro catálogo según el pliego exacto de tu máquina.
                </p>
                <Link className="inline-flex items-center gap-space-xs font-label-md text-label-md text-on-secondary-fixed font-semibold hover:underline" href="#servicios">
                  <span>Conocer servicio</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-space-md">
              {[
                { id: '1', cat: 'Resmitas', title: 'Resma Boreal A4', desc: '75 gr · 210 × 297 mm · 500 hojas', price: 8750, stock: '48 disponibles', tag: 'Oferta', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOHyxCaME7bdwoHVpIK1X-a8EOZzYlvExLM7jd6h1iWukqcIgwPKBxWpYwAJzpEDsOBg3bjFKofBJMSZKe4D91Dpucwjwr3R-vwm7X2cpk78Ua2bxldE0Mmjp0g1HO7FZRwwJjA_z5PsaazBhIyAtOYUSL_vZlD8hw2vZxyO3tAR4mj6qc7uQcKO-rtdeCbXYucaATVnq_zG2ZqxUzhKKrLRdabVwjosv6rC5n2Hd6_5acGx9hL_w14g' },
                { id: '2', cat: 'Obra en papel plano', title: 'Obra blanco natural', desc: '80 gr · 65 × 95 cm · 100 hojas', price: 22400, stock: '22 disponibles', tag: '', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7JyjIShPlseS2BXJpGLU79vhhTztZptoMQQOGSgrM8dj_1DQSDtg30syY3NiyDkSSg26V4m6vaxZZsMOs6irruRpgBMmk7tF0JJ-FICYOdioAfdPXV9Kz5IFFJQiZ6gEwdPG0rtCTBWQfR1wFDEwUTTc4mAP9iiYQNqMDE2cHumTR4v5CJIsJpiuzcduWsGnG-vzz9FKwSxmtnyYkGpXhxCQKBPJhj_8AiK_VPheTaOo3qf44f8rvEQ' },
                { id: '3', cat: 'Cartulinas color', title: 'Cartulina color surtida', desc: '180 gr · 50 × 70 cm · Pack x 10', price: 11900, stock: '14 disponibles', tag: 'Más pedido', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMVTu4NDQxqzxdPlq6F3L7XQgQLuz4wATeLc48Gbl9AUaDWpt_HypAm6bT4SujZ9aCoGZbEwqwUEzA4xVwMs9qSgae1NHEgN2JJookL4GXt_XzY15m-iBcRyk5ByybFpAJd6TxOV3rif1CzJVr1m5kdPSx7ItNoiq0HQA7013yAvk-cFVLFYRhO7jdcSQpAyK-r4YBkXhzD0zMRlUV6__UNIwKCpV_eZHWtqHJryRB_BG0MWP1xpVChw' },
                { id: '4', cat: 'Cartulinas pesadas', title: 'Cartulina ilustración', desc: '300 gr · 70 × 100 cm · Pack x 25', price: 39800, stock: '8 disponibles', tag: '', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBcyi5OdnMryVLuqZ_zHZh6xcgVILpiTng93Maozq8Y9HmTWhddtd9ARh_9AGn6rodfOVI-zPSncjiNorjah_lYrJSq2Wm31OuQoSYFZLUpjQqTE1bYvvryV9nTzGqrsj6boQ9w0H8K8xVb7PWCV9_nDNijUsCiEykKrEuFWVZlbjb_pvP8gXcDVrLOtcoV9Lg_HPt0AAktyeRoF5DnYfszO0sNpRudR8-jW-sl1bPu5mT5i0Ls8Bidw' },
                { id: '5', cat: 'Cartón gris', title: 'Cartón gris encuadernación', desc: '2 mm · 72 × 102 cm · Pack x 10', price: 18200, stock: '5 disponibles', tag: '', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJmnQ-Xu5uLJM45JvVXtY2x_QyfZmpSI4AAT2jKcVCwg2VAACJjcNRfr0lSLz-JzNi9Zv1yUniCA9pYb6pVnk4PCh4UK3wkaKTpUkNhtm73PPgfk_bo-xs5L1oH60h6_-Ei23L05zlnjRt1ziKJIdq6PWRayQmzXxGy_PrXBFmikq8NtkIw8qOQgGLLpcwG8Zg0O618y7kxKdLqnXjUhgH9Q59RZoAuVsy4QLh5N9DwlCxGSJGa6ujEw' },
                { id: '6', cat: 'Autoadhesivos', title: 'Autoadhesivo mate', desc: '90 gr · 65 × 95 cm · Pack x 25', price: 28900, stock: '19 disponibles', tag: '', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcyjucJlYGs2aQq9O1NGj1bSLzpZYbNIj5T9J9bm2pIg3qYPCRnSYvjprd4ad8p2kUyu7xAuHksyKi_HqDk7fnz-RdRtov1ko0SSZwry-MM6gb6dxmxj8JQQmk13KVM4tiB67il7wSHAzQeifHHDT1EkgwweZ8uMrEcBSwh42pL0xZkj5o1R9iGzm1WlCIF8BzBcFcXb-buGEGfu4Vq2HiNFEPuHtDUOt4OUPz50OcAB6MHKO_qjqaCQ' }
              ].map((prod) => (
                <ProductCard key={prod.id} {...prod} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE PILLARS */}
      <section className="w-full py-space-xl bg-surface" id="servicios">
        <div className="max-w-[1280px] mx-auto px-margin-sm md:px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <div className="lg:col-span-5">
              <span className="font-label-eyebrow text-label-eyebrow text-primary uppercase tracking-widest block mb-space-xs">
                Más que papel
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-md">
                Resolvemos lo que tu negocio necesita.
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
                Desde una resma para oficina hasta una compra industrial por pallet cerrado. Te asesoramos para que elijas el material técnico correcto y lo recibas directo en tus talleres sin contratiempos.
              </p>
            </div>
            <div className="lg:col-span-7 space-y-space-md">
              <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex items-start gap-space-md">
                <div className="w-12 h-12 rounded bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">square_foot</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Corte a medida</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Medidas especiales, cortes precisos en escuadra y terminación prolija para alimentar offset, serigrafía y packaging digital sin desperdicio.
                  </p>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex items-start gap-space-md">
                <div className="w-12 h-12 rounded bg-secondary-fixed text-secondary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">local_shipping</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Logística propia</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Entregas diarias programadas en AMBA con camiones propios acondicionados para resguardo de humedad, y despachos diarios a expresos de todo el país.
                  </p>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex items-start gap-space-md">
                <div className="w-12 h-12 rounded bg-tertiary-fixed text-tertiary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">support_agent</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Atención personalizada</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Asesoramiento técnico directo por especialistas en gramajes, fibras, rendimiento de pliegos y cotizaciones en escala mayorista.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL HERO BANNER */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-[1280px] mx-auto px-margin-sm md:px-gutter">
          <div className="bg-on-secondary-fixed-variant text-on-secondary rounded-xl p-space-lg lg:p-space-xl shadow-md relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center relative z-10">
              <div className="lg:col-span-7">
                <span className="font-label-eyebrow text-label-eyebrow text-secondary-fixed uppercase tracking-widest block mb-space-xs">
                  Papelera Bertolín
                </span>
                <h2 className="font-headline-xl text-headline-xl text-on-secondary leading-tight mb-space-sm">
                  Una empresa familiar, un servicio de siempre.
                </h2>
                <p className="font-body-md text-body-md text-secondary-fixed max-w-xl">
                  Desde 1980 trabajamos junto a imprentas, librerías y empresas de todo el país. Contamos con más de 5 depósitos propios y una flota que garantiza que nunca te falte el papel para seguir produciendo.
                </p>
              </div>
              <div className="lg:col-span-5 flex lg:justify-end">
                <Link className="bg-surface-container-lowest text-on-surface hover:bg-surface-container px-space-lg py-space-sm rounded font-label-md text-label-md transition-colors shadow-sm flex items-center gap-space-xs" href="#contacto">
                  <span>Conocer la empresa</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Link aria-label="Contactar por WhatsApp" className="fixed bottom-space-lg right-space-lg z-50 flex items-center gap-space-sm bg-secondary text-on-secondary px-space-md py-space-sm rounded-full shadow-[0_12px_24px_-6px_rgba(74,74,74,0.08)] hover:bg-on-secondary-fixed-variant transition-all" href="#">
        <span className="material-symbols-outlined text-[20px]">chat</span>
        <span className="font-label-md text-label-md hidden sm:inline">Asesor en línea</span>
      </Link>
    </main>
  )
}
