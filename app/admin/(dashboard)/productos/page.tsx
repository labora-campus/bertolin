export default function AdminProductosPage() {
  const products = [
    { id: 'BOR-75A4', name: 'Resma Boreal Obra 75g A4', cat: 'Resmas A4/Oficio', stock: 1200, price: 8750, status: 'Activo' },
    { id: 'CHM-90-6595', name: 'Chambril Obra Blanco 90g', cat: 'Papel Obra Plano', stock: 48, price: 48900, status: 'Activo' },
    { id: 'CRT-300-7010', name: 'Cartulina Ilustración 300g', cat: 'Cartulinas Ilustración', stock: 15, price: 62400, status: 'Activo' },
    { id: 'KFT-120-BOB', name: 'Bobina Kraft Puro 120g', cat: 'Kraft Embalaje', stock: 3, price: 115000, status: 'Stock Bajo' },
  ]

  return (
    <div className="space-y-space-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-space-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Gestión de Productos</h1>
          <p className="font-body-md text-on-surface-variant">Altas, bajas, modificaciones y control de stock.</p>
        </div>
        <button className="bg-primary hover:bg-primary-container text-on-primary px-space-md py-2 rounded-lg font-label-md font-bold transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Nuevo Producto
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container overflow-hidden">
        <div className="p-space-sm border-b border-surface-container flex items-center gap-space-sm">
          <input 
            type="text" 
            placeholder="Buscar producto por SKU o nombre..." 
            className="bg-surface border border-outline rounded-lg px-space-sm py-2 text-body-sm w-full max-w-md focus:outline-none focus:border-primary"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-label-md">
                <th className="p-space-sm font-medium">SKU</th>
                <th className="p-space-sm font-medium">Producto</th>
                <th className="p-space-sm font-medium">Categoría</th>
                <th className="p-space-sm font-medium">Stock</th>
                <th className="p-space-sm font-medium">Precio</th>
                <th className="p-space-sm font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-body-sm text-on-surface divide-y divide-surface-container">
              {products.map((prod) => (
                <tr key={prod.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-space-sm font-data-tabular text-on-surface-variant">{prod.id}</td>
                  <td className="p-space-sm font-medium">{prod.name}</td>
                  <td className="p-space-sm text-on-surface-variant">{prod.cat}</td>
                  <td className="p-space-sm">
                    <span className={`inline-flex items-center gap-1 font-data-tabular ${prod.status === 'Stock Bajo' ? 'text-error font-bold' : 'text-on-surface'}`}>
                      {prod.status === 'Stock Bajo' && <span className="material-symbols-outlined text-[14px]">warning</span>}
                      {prod.stock} u.
                    </span>
                  </td>
                  <td className="p-space-sm font-data-tabular">${prod.price.toLocaleString('es-AR')}</td>
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
