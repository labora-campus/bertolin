import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-high text-on-surface">
      <div className="max-w-[1280px] mx-auto px-margin-sm md:px-gutter py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <div className="space-y-space-md">
            <div className="flex items-center gap-space-sm">
              <img alt="Papelera Bertolín Logo" className="h-7 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9fTgQI5cq3U9fwEoGXBEBiJQ9XVTKkvKUcZH5XCcXdW9FKz53Qm04wwqcbTHe7qbK3TwGtivB8I4pPyU51d5FXIzx0ONPe74upPjkaZiI9l2HTnyxzSLLBEZ_1oTcaA5RBXI_2LF4gmDKp-itIaNbxpEzobzh6cNatd3vW6aYS2kPLHOZNwdYlpcY8A5yVstGFJmrE7L--mXfpR3XDz5eJIu-0pIKoKcGCeG74xP0A7TigyhNjD4lVA" />
              <span className="font-headline-sm text-headline-sm text-primary">Papelera Bertolín</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Desde 1980 junto a imprentas, editoriales, librerías y diseñadores. Especialistas en distribución mayorista, corte programado y logística corporativa.
            </p>
            <div className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <p className="flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-1">location_on</span>
                <span>Planta Logística: Av. Hipólito Yrigoyen 1820, Avellaneda</span>
              </p>
              <p className="flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-1">store</span>
                <span>Centro de Entrega CABA: Distrito Gráfico Barracas</span>
              </p>
            </div>
          </div>
          <div className="space-y-space-md">
            <h4 className="font-headline-sm text-headline-sm text-on-surface">Catálogo Técnico</h4>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li><Link className="hover:text-primary transition-colors" href="#">Resmas Reprografía (A4, Oficio, Carta)</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Obra Primera Calidad y Satinados</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Cartulinas Encapadas y Triplex</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Papeles Especiales Chambril y Kraft</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Laminados, Adhesivos y Sintéticos</Link></li>
            </ul>
          </div>
          <div className="space-y-space-md">
            <h4 className="font-headline-sm text-headline-sm text-on-surface">Servicios Industriales</h4>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li><Link className="hover:text-primary transition-colors" href="#">Corte a medida en guillotina computarizada</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Distribución propia con camiones en AMBA</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Despacho de pallets cerrados a expresos</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Asesoría técnica en gramajes y fibras</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Muestrarios para estudios y editoriales</Link></li>
            </ul>
          </div>
          <div className="space-y-space-md">
            <h4 className="font-headline-sm text-headline-sm text-on-surface">Atención Comercial</h4>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li><span className="font-label-md text-label-md text-on-surface">Lunes a Viernes:</span> 8:00 a 17:30 hs</li>
              <li><span className="font-label-md text-label-md text-on-surface">Venta Telefónica:</span> (011) 4201-1180 / 1184</li>
              <li><span className="font-label-md text-label-md text-on-surface">Facturación:</span> Facturas A y B discriminadas</li>
              <li><span className="font-label-md text-label-md text-on-surface">Cobranzas:</span> eCheq, Transferencia, Cuentas Corrientes</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-surface-container-highest py-space-md">
        <div className="max-w-[1280px] mx-auto px-margin-sm md:px-gutter flex flex-col md:flex-row items-center justify-between gap-space-sm text-center md:text-left">
          <p className="font-body-sm text-body-sm text-on-surface-variant">© 2025 Papelera Bertolín S.R.L. Todos los derechos reservados. Industria Gráfica Argentina.</p>
          <div className="flex items-center gap-space-md font-body-sm text-body-sm text-on-surface-variant">
            <Link className="hover:text-primary transition-colors" href="#">Términos Mayoristas</Link>
            <Link className="hover:text-primary transition-colors" href="#">Política de Envíos</Link>
            <Link className="hover:text-primary transition-colors" href="#">CUIT: 30-58472910-7</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
