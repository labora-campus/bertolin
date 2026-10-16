import Link from 'next/link'
import AdminGuard, { LogoutButton } from '@/components/admin/AdminGuard'

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminGuard>
    <div className="min-h-screen bg-surface-container flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-surface-container-lowest border-r border-surface-container flex flex-col shrink-0">
        <div className="p-space-md border-b border-surface-container">
          <Link href="/admin" className="flex items-center gap-space-xs text-primary font-headline-sm">
            <span className="material-symbols-outlined text-[24px]">shield_person</span>
            <span>Admin Panel</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-space-sm space-y-1 overflow-y-auto">
          <Link href="/admin/pedidos" className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            <span className="font-label-md">Pedidos</span>
          </Link>
          <Link href="/admin/productos" className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-[20px]">inventory_2</span>
            <span className="font-label-md">Productos</span>
          </Link>
          <Link href="/admin/categorias" className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-[20px]">category</span>
            <span className="font-label-md">Categorías</span>
          </Link>
          <Link href="/admin/envios" className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            <span className="font-label-md">Envíos</span>
          </Link>
          <Link href="/admin/banners" className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-[20px]">view_carousel</span>
            <span className="font-label-md">Banners</span>
          </Link>
        </nav>

        <div className="p-space-sm border-t border-surface-container">
          <Link href="/" className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" target="_blank">
            <span className="material-symbols-outlined text-[20px]">open_in_new</span>
            <span className="font-label-md">Ver Tienda</span>
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-space-md md:p-space-xl overflow-y-auto">
        {children}
      </main>
    </div>
    </AdminGuard>
  )
}
