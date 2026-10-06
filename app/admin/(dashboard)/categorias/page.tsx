export default function AdminCategoriasPage() {
  const categorias = [
    { id: 1, nombre: 'Papel Obra Plano', productos: 24, activa: true },
    { id: 2, nombre: 'Cartulinas Ilustración', productos: 12, activa: true },
    { id: 3, nombre: 'Cartón Gris Encuadernación', productos: 8, activa: true },
    { id: 4, nombre: 'Kraft Embalaje & Bolsas', productos: 15, activa: true },
    { id: 5, nombre: 'Autoadhesivos & Sintéticos', productos: 6, activa: true },
    { id: 6, nombre: 'Resmas A4 / Oficio', productos: 10, activa: true },
  ]

  return (
    <div className="space-y-space-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-space-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Categorías</h1>
          <p className="font-body-md text-on-surface-variant">Agrupá tus productos para facilitar la búsqueda en el catálogo.</p>
        </div>
        <button className="bg-primary hover:bg-primary-container text-on-primary px-space-md py-2 rounded-lg font-label-md font-bold transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Nueva Categoría
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-label-md">
                <th className="p-space-sm font-medium">Nombre de la Categoría</th>
                <th className="p-space-sm font-medium">Productos Asignados</th>
                <th className="p-space-sm font-medium">Estado</th>
                <th className="p-space-sm font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-body-sm text-on-surface divide-y divide-surface-container">
              {categorias.map((cat) => (
                <tr key={cat.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-space-sm font-medium text-on-surface">{cat.nombre}</td>
                  <td className="p-space-sm font-data-tabular text-on-surface-variant">
                    {cat.productos} productos
                  </td>
                  <td className="p-space-sm">
                    {cat.activa ? (
                      <span className="inline-flex items-center gap-1 text-[#137333] bg-[#E6F4EA] px-2 py-0.5 rounded-full text-[11px] font-bold">
                        Visible
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full text-[11px] font-bold">
                        Oculta
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
