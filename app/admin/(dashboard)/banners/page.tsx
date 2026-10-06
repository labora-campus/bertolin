export default function AdminBannersPage() {
  const banners = [
    { id: 1, titulo: 'Cyber Monday Papelero', subtitulo: 'Hasta 30% OFF en Bobinas', estado: 'Activo', orden: 1 },
    { id: 2, titulo: 'Nuevas Cartulinas', subtitulo: 'Línea Premium 300g', estado: 'Activo', orden: 2 },
    { id: 3, titulo: 'Corte a Medida', subtitulo: 'Servicio de Guillotinado Industrial', estado: 'Inactivo', orden: 3 },
  ]

  return (
    <div className="space-y-space-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-space-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Gestión de Banners</h1>
          <p className="font-body-md text-on-surface-variant">Administrá las imágenes del carrusel principal de la portada.</p>
        </div>
        <button className="bg-primary hover:bg-primary-container text-on-primary px-space-md py-2 rounded-lg font-label-md font-bold transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
          Subir Banner
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-label-md">
                <th className="p-space-sm font-medium w-16 text-center">Orden</th>
                <th className="p-space-sm font-medium">Imagen</th>
                <th className="p-space-sm font-medium">Contenido</th>
                <th className="p-space-sm font-medium">Estado</th>
                <th className="p-space-sm font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-body-sm text-on-surface divide-y divide-surface-container">
              {banners.map((banner) => (
                <tr key={banner.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-space-sm font-data-tabular text-center text-on-surface-variant">{banner.orden}</td>
                  <td className="p-space-sm">
                    <div className="w-24 h-12 bg-surface-container rounded border border-outline-variant flex items-center justify-center text-on-surface-variant">
                      <span className="material-symbols-outlined text-[16px]">image</span>
                    </div>
                  </td>
                  <td className="p-space-sm">
                    <div className="font-medium">{banner.titulo}</div>
                    <div className="text-on-surface-variant text-[12px]">{banner.subtitulo}</div>
                  </td>
                  <td className="p-space-sm">
                    {banner.estado === 'Activo' ? (
                      <span className="inline-flex items-center gap-1 text-primary bg-primary-container px-2 py-0.5 rounded-full text-[11px] font-bold">
                        Activo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full text-[11px] font-bold">
                        Inactivo
                      </span>
                    )}
                  </td>
                  <td className="p-space-sm text-right">
                    <button className="text-on-surface-variant hover:text-primary transition-colors p-1" title="Editar">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button className="text-on-surface-variant hover:text-error transition-colors p-1" title="Eliminar">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
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
