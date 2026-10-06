export default function AdminEnviosPage() {
  const zonas = [
    { id: 1, nombre: 'CABA', codigoPostal: '1000 - 1499', costo: 15000, activo: true },
    { id: 2, nombre: 'GBA Norte', codigoPostal: '1600 - 1699', costo: 24640, activo: true },
    { id: 3, nombre: 'GBA Sur', codigoPostal: '1800 - 1899', costo: 24640, activo: true },
    { id: 4, nombre: 'GBA Oeste', codigoPostal: '1700 - 1799', costo: 28000, activo: true },
    { id: 5, nombre: 'Interior del País', codigoPostal: 'Resto', costo: 0, activo: false, nota: 'A coordinar expreso' },
  ]

  return (
    <div className="space-y-space-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-space-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Costos de Envío</h1>
          <p className="font-body-md text-on-surface-variant">Configurá las tarifas logísticas según el código postal del cliente.</p>
        </div>
        <button className="bg-primary hover:bg-primary-container text-on-primary px-space-md py-2 rounded-lg font-label-md font-bold transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Nueva Zona
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-label-md">
                <th className="p-space-sm font-medium">Zona</th>
                <th className="p-space-sm font-medium">Rango de CP</th>
                <th className="p-space-sm font-medium">Costo Fijo (ARS)</th>
                <th className="p-space-sm font-medium">Estado</th>
                <th className="p-space-sm font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-body-sm text-on-surface divide-y divide-surface-container">
              {zonas.map((zona) => (
                <tr key={zona.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-space-sm font-medium">{zona.nombre}</td>
                  <td className="p-space-sm font-data-tabular text-on-surface-variant">{zona.codigoPostal}</td>
                  <td className="p-space-sm font-data-tabular">
                    {zona.costo > 0 ? `$${zona.costo.toLocaleString('es-AR')}` : zona.nota}
                  </td>
                  <td className="p-space-sm">
                    {zona.activo ? (
                      <span className="inline-flex items-center gap-1 text-[#137333] bg-[#E6F4EA] px-2 py-0.5 rounded-full text-[11px] font-bold">
                        Habilitado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full text-[11px] font-bold">
                        Inhabilitado
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
