'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type CategoryItem = {
  id: string
  nombre: string
  slug: string
  productos: number
  activa: boolean
}

export default function AdminCategoriasPage() {
  const [categorias, setCategorias] = useState<CategoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newCatName, setNewCatName] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const loadCategories = async () => {
    try {
      setLoading(true)
      const { data: cats, error: catError } = await supabase
        .from('categories')
        .select('*, products(id)')
        .order('order_index', { ascending: true })

      if (!catError && cats) {
        setCategorias(
          cats.map((c: any) => ({
            id: c.id,
            nombre: c.name,
            slug: c.slug,
            productos: c.products ? c.products.length : 0,
            activa: Boolean(c.is_active),
          }))
        )
      }
    } catch (e) {
      console.error('Error loading categories:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const handleToggleActive = async (id: string, current: boolean) => {
    try {
      await supabase.from('categories').update({ is_active: !current }).eq('id', id)
      setCategorias(prev => prev.map(c => c.id === id ? { ...c, activa: !current } : c))
    } catch (err) {
      console.error('Error toggling category:', err)
    }
  }

  const handleCreateCategory = async () => {
    if (!newCatName.trim()) return
    try {
      setIsSaving(true)
      const slug = newCatName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')

      const { data, error } = await supabase.from('categories').insert({
        name: newCatName.trim(),
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        is_active: true,
      }).select().single()

      if (error) {
        alert('Error: ' + error.message)
      } else if (data) {
        setCategorias(prev => [...prev, {
          id: data.id,
          nombre: data.name,
          slug: data.slug,
          productos: 0,
          activa: true,
        }])
        setIsModalOpen(false)
        setNewCatName('')
      }
    } catch (e: any) {
      alert('Error: ' + e.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-space-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-space-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Categorías</h1>
          <p className="font-body-md text-on-surface-variant">Agrupá tus productos para facilitar la búsqueda en el catálogo.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary-container text-on-primary px-space-md py-2 rounded-lg font-label-md font-bold transition-colors flex items-center gap-2"
        >
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
              {categorias.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-on-surface-variant">
                    {loading ? 'Cargando categorías...' : 'No hay categorías cargadas.'}
                  </td>
                </tr>
              ) : (
                categorias.map((cat) => (
                  <tr key={cat.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-space-sm font-medium text-on-surface">{cat.nombre}</td>
                    <td className="p-space-sm font-data-tabular text-on-surface-variant">
                      {cat.productos} productos
                    </td>
                    <td className="p-space-sm">
                      <button 
                        onClick={() => handleToggleActive(cat.id, cat.activa)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold cursor-pointer transition-colors ${
                          cat.activa 
                            ? 'text-[#137333] bg-[#E6F4EA] hover:bg-[#d4edd9]' 
                            : 'text-on-surface-variant bg-surface-container hover:bg-surface-container-high'
                        }`}
                      >
                        {cat.activa ? 'Visible' : 'Oculta'}
                      </button>
                    </td>
                    <td className="p-space-sm text-right">
                      <button 
                        onClick={() => handleToggleActive(cat.id, cat.activa)}
                        className="text-on-surface-variant hover:text-primary transition-colors p-1" 
                        title={cat.activa ? 'Ocultar categoría' : 'Hacer visible'}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {cat.activa ? 'visibility' : 'visibility_off'}
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nueva Categoría */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-surface-container flex justify-between items-center bg-surface">
              <h2 className="font-headline-sm text-on-surface font-bold">Nueva Categoría</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-error">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-label-md font-bold text-on-surface mb-1">Nombre</label>
                <input 
                  type="text"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="Ej: Sobres Especiales"
                  className="w-full bg-surface border border-outline rounded-lg px-3 py-2 text-body-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-surface-container bg-surface-container-low flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="border border-outline bg-surface hover:bg-surface-container text-on-surface px-4 py-2 rounded-lg font-label-md"
              >
                Cancelar
              </button>
              <button 
                onClick={handleCreateCategory}
                disabled={isSaving || !newCatName.trim()}
                className="bg-primary hover:bg-primary-container text-on-primary px-5 py-2 rounded-lg font-label-md font-bold disabled:opacity-60"
              >
                {isSaving ? 'Guardando...' : 'Crear'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
