export default function AdminDashboardPage() {
  return (
    <div className="space-y-space-lg">
      <div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface">Bienvenido al Panel de Control</h1>
        <p className="font-body-md text-on-surface-variant">Resumen de la actividad reciente en tu tienda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container">
          <div className="flex items-center gap-space-sm text-primary mb-2">
            <span className="material-symbols-outlined">shopping_bag</span>
            <h3 className="font-label-lg font-bold">Pedidos Pendientes</h3>
          </div>
          <p className="font-headline-xl text-headline-xl text-on-surface">12</p>
          <p className="text-body-sm text-on-surface-variant mt-1">3 nuevos hoy</p>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container">
          <div className="flex items-center gap-space-sm text-secondary mb-2">
            <span className="material-symbols-outlined">inventory_2</span>
            <h3 className="font-label-lg font-bold">Stock Bajo</h3>
          </div>
          <p className="font-headline-xl text-headline-xl text-on-surface">5</p>
          <p className="text-body-sm text-on-surface-variant mt-1">Productos por reponer</p>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container">
          <div className="flex items-center gap-space-sm text-tertiary mb-2">
            <span className="material-symbols-outlined">attach_money</span>
            <h3 className="font-label-lg font-bold">Ventas del Mes</h3>
          </div>
          <p className="font-headline-xl text-headline-xl text-on-surface">$4.5M</p>
          <p className="text-body-sm text-on-surface-variant mt-1">+12% vs mes pasado</p>
        </div>
      </div>

      {/* Recent Orders Table Skeleton */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container overflow-hidden">
        <div className="p-space-md border-b border-surface-container flex justify-between items-center">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Últimos Pedidos</h2>
          <button className="text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg text-label-md font-bold transition-colors">
            Ver todos
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-label-md">
                <th className="p-space-sm font-medium">Pedido</th>
                <th className="p-space-sm font-medium">Cliente</th>
                <th className="p-space-sm font-medium">Fecha</th>
                <th className="p-space-sm font-medium">Estado</th>
                <th className="p-space-sm font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="text-body-sm text-on-surface divide-y divide-surface-container">
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="p-space-sm font-data-tabular">#PB-1050</td>
                <td className="p-space-sm">Imprenta Grafos SRL</td>
                <td className="p-space-sm">Hace 10 min</td>
                <td className="p-space-sm">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold">
                    Pendiente Pago
                  </span>
                </td>
                <td className="p-space-sm font-data-tabular">$145.000</td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="p-space-sm font-data-tabular">#PB-1049</td>
                <td className="p-space-sm">Estudio XYZ</td>
                <td className="p-space-sm">Hace 1 hora</td>
                <td className="p-space-sm">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container text-[11px] font-bold">
                    Comprobante Subido
                  </span>
                </td>
                <td className="p-space-sm font-data-tabular">$24.640</td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="p-space-sm font-data-tabular">#PB-1048</td>
                <td className="p-space-sm">Librería El Ateneo</td>
                <td className="p-space-sm">Ayer</td>
                <td className="p-space-sm">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333] text-[11px] font-bold">
                    Pago Confirmado
                  </span>
                </td>
                <td className="p-space-sm font-data-tabular">$890.500</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
