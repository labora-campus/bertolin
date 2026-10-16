'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { parseCsv, slugify } from '@/lib/csv'

type AdminProduct = {
  id: string
  sku: string
  name: string
  cat: string
  categoryId?: string
  stock: number
  price: number
  status: string
  image?: string
  description?: string
}

export default function AdminProductosPage() {
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [importMsg, setImportMsg] = useState('')

  // New product form state
  const [newProd, setNewProd] = useState({
    name: '',
    sku: '',
    categoryId: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
  })

  const emptyForm = { name: '', sku: '', categoryId: '', description: '', price: '', stock: '', imageUrl: '' }

  const openNew = () => {
    setEditingId(null)
    setNewProd(emptyForm)
    setIsModalOpen(true)
  }

  const openEdit = (p: AdminProduct) => {
    setEditingId(p.id)
    setNewProd({
      name: p.name,
      sku: p.sku === 'S/SKU' ? '' : p.sku,
      categoryId: p.categoryId || '',
      description: p.description || '',
      price: String(p.price),
      stock: String(p.stock),
      imageUrl: p.image || '',
    })
    setIsModalOpen(true)
  }

  const handleImageUpload = async (file: File) => {
    setIsUploading(true)
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    const { error } = await supabase.storage.from('products').upload(path, file, { contentType: file.type })
    if (error) {
      alert('Error al subir la imagen: ' + error.message)
    } else {
      const { data } = supabase.storage.from('products').getPublicUrl(path)
      setNewProd((prev) => ({ ...prev, imageUrl: data.publicUrl }))
    }
    setIsUploading(false)
  }

  const handleImportCsv = async (file: File) => {
    setImportMsg('Importando...')
    try {
      const rows = parseCsv(await file.text())
      if (rows.length === 0) {
        setImportMsg('El CSV está vacío.')
        return
      }

      const { data: allCats } = await supabase.from('categories').select('id, name')
      const catByName = new Map<string, string>((allCats || []).map((c: any) => [c.name.toLowerCase(), c.id]))

      let created = 0
      let updated = 0
      const errors: string[] = []
      for (const [i, r] of rows.entries()) {
        const name = r.nombre || r.name
        const price = Number((r.precio || r.price || '').replace(/\./g, '').replace(',', '.'))
        if (!name || !price) {
          errors.push('Fila ' + (i + 2) + ': falta nombre o precio')
          continue
        }

        let categoryId: string | null = null
        const catName = (r.categoria || r.category || '').trim()
        if (catName) {
          categoryId = catByName.get(catName.toLowerCase()) ?? null
          if (!categoryId) {
            const { data: nc, error: ce } = await supabase
              .from('categories')
              .insert({ name: catName, slug: slugify(catName), is_active: true })
              .select('id')
              .single()
            if (ce || !nc) {
              errors.push('Fila ' + (i + 2) + ': categoría "' + catName + '": ' + ce?.message)
              continue
            }
            categoryId = nc.id
            catByName.set(catName.toLowerCase(), nc.id)
          }
        }

        const sku = (r.sku || '').trim() || null
        const desc = r.descripcion || r.description || null
        const img = r.imagen_url || r.image_url
        const fields = {
          name,
          sku,
          category_id: categoryId,
          description: desc,
          specs: desc,
          price,
          stock: Number(r.stock || 0) || 0,
          is_active: true,
          ...(img ? { images: [img] } : {}),
        }

        // Upsert by SKU when present, so re-importing updates instead of duplicating
        let existingId: string | null = null
        if (sku) {
          const { data: ex } = await supabase.from('products').select('id').eq('sku', sku).maybeSingle()
          existingId = ex?.id ?? null
        }
        const suffix = sku ? slugify(sku) : Math.random().toString(36).slice(2, 6)
        const { error } = existingId
          ? await supabase.from('products').update(fields).eq('id', existingId)
          : await supabase.from('products').insert({ ...fields, slug: slugify(name) + '-' + suffix })
        if (error) errors.push('Fila ' + (i + 2) + ': ' + error.message)
        else if (existingId) updated++
        else created++
      }
      setImportMsg(
        'Importación lista: ' + created + ' nuevos, ' + updated + ' actualizados' +
          (errors.length ? ', ' + errors.length + ' con error. ' + errors.slice(0, 3).join(' | ') : '.')
      )
      loadData()
    } catch (e: any) {
      setImportMsg('Error al importar: ' + e.message)
    }
  }

  const loadData = async () => {
    try {
      setLoading(true)
      // 1. Fetch categories
      const { data: catData } = await supabase
        .from('categories')
        .select('id, name')
        .eq('is_active', true)
        .order('name')

      if (catData) {
        setCategories(catData)
      }

      // 2. Fetch products
      const { data: prodData, error } = await supabase
        .from('products')
        .select('*, categories(id, name)')
        .order('created_at', { ascending: false })

      if (!error && prodData) {
        setProducts(
          prodData.map((p: any) => ({
            id: p.id,
            sku: p.sku || 'S/SKU',
            name: p.name,
            cat: p.categories?.name || 'Sin categoría',
            categoryId: p.category_id,
            stock: p.stock || 0,
            price: Number(p.price || 0),
            status: p.stock <= 5 ? 'Stock Bajo' : 'Activo',
            image: p.images?.[0] || '',
            description: p.description || '',
          }))
        )
      }
    } catch (e) {
      console.error('Error fetching admin products:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Create Product in Supabase
  const handleSaveProduct = async () => {
    if (!newProd.name.trim() || !newProd.price) {
      alert('Por favor completá el nombre y precio del producto.')
      return
    }

    try {
      setIsSaving(true)
      const slug = newProd.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')

      const fields = {
        name: newProd.name.trim(),
        sku: newProd.sku.trim() || null,
        category_id: newProd.categoryId || null,
        description: newProd.description.trim() || null,
        specs: newProd.description.trim() || null,
        price: Number(newProd.price),
        stock: Number(newProd.stock || 0),
        images: newProd.imageUrl ? [newProd.imageUrl] : [],
      }
      const query = editingId
        ? supabase.from('products').update(fields).eq('id', editingId)
        : supabase.from('products').insert({ ...fields, slug: slug + '-' + Date.now().toString().slice(-4), is_active: true })
      const { data, error } = await query.select('*, categories(name)').single()

      if (error) {
        alert('Error al guardar el producto: ' + error.message)
      } else if (data) {
        const item: AdminProduct = {
            id: data.id,
            sku: data.sku || 'S/SKU',
            name: data.name,
            cat: data.categories?.name || 'Sin categoría',
            categoryId: data.category_id,
            stock: data.stock,
            price: Number(data.price),
            status: data.stock <= 5 ? 'Stock Bajo' : 'Activo',
            image: data.images?.[0] || '',
            description: data.description || '',
        }
        setProducts((prev) => (editingId ? prev.map((p) => (p.id === editingId ? item : p)) : [item, ...prev]))
        setIsModalOpen(false)
        setEditingId(null)
        setNewProd(emptyForm)
      }
    } catch (err: any) {
      alert('Error inesperado: ' + err.message)
    } finally {
      setIsSaving(false)
    }
  }

  // Delete product
  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar "${name}"?`)) return

    try {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (!error) {
        setProducts((prev) => prev.filter((p) => p.id !== id))
      } else {
        alert('Error al eliminar: ' + error.message)
      }
    } catch (err: any) {
      alert('Error: ' + err.message)
    }
  }

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.cat.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-space-lg relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-space-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Gestión de Productos</h1>
          <p className="font-body-md text-on-surface-variant">Altas, bajas, modificaciones y control de stock en tiempo real.</p>
        </div>
        <div className="flex gap-2">
          <label className="border border-outline bg-surface hover:bg-surface-container text-on-surface px-space-md py-2 rounded-lg font-label-md transition-colors flex items-center gap-2 cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">upload_file</span>
            Importar CSV
            <input
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) handleImportCsv(f)
                e.target.value = ''
              }}
            />
          </label>
          <button
            onClick={openNew}
            className="bg-primary hover:bg-primary-container text-on-primary px-space-md py-2 rounded-lg font-label-md font-bold transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Nuevo Producto
          </button>
        </div>
      </div>
      {importMsg && (
        <div className="bg-surface-container-lowest border border-surface-container rounded-lg px-space-sm py-2 text-body-sm text-on-surface">
          {importMsg} <span className="text-on-surface-variant">(columnas: sku, nombre, categoria, precio, stock, descripcion, imagen_url)</span>
        </div>
      )}

      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container overflow-hidden">
        <div className="p-space-sm border-b border-surface-container flex items-center justify-between gap-space-sm">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar producto por SKU, nombre o categoría..."
            className="bg-surface border border-outline rounded-lg px-space-sm py-2 text-body-sm w-full max-w-md focus:outline-none focus:border-primary"
          />
          <span className="text-body-sm text-on-surface-variant font-data-tabular">
            {filtered.length} productos
          </span>
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
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-on-surface-variant">
                    {loading ? 'Cargando catálogo...' : 'No se encontraron productos.'}
                  </td>
                </tr>
              ) : (
                filtered.map((prod) => (
                  <tr key={prod.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-space-sm font-data-tabular text-on-surface-variant">{prod.sku}</td>
                    <td className="p-space-sm font-medium">
                      <div className="flex items-center gap-3">
                        {prod.image && (
                          <img src={prod.image} alt={prod.name} className="w-8 h-8 rounded object-cover border" />
                        )}
                        <span>{prod.name}</span>
                      </div>
                    </td>
                    <td className="p-space-sm text-on-surface-variant">{prod.cat}</td>
                    <td className="p-space-sm">
                      <span className={`inline-flex items-center gap-1 font-data-tabular ${prod.status === 'Stock Bajo' ? 'text-error font-bold' : 'text-on-surface'}`}>
                        {prod.status === 'Stock Bajo' && <span className="material-symbols-outlined text-[14px]">warning</span>}
                        {prod.stock} u.
                      </span>
                    </td>
                    <td className="p-space-sm font-data-tabular font-semibold">${prod.price.toLocaleString('es-AR')}</td>
                    <td className="p-space-sm text-right">
                      <button
                        onClick={() => openEdit(prod)}
                        className="text-on-surface-variant hover:text-primary transition-colors p-1"
                        title="Editar producto"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(prod.id, prod.name)}
                        className="text-on-surface-variant hover:text-error transition-colors p-1"
                        title="Eliminar producto"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL NUEVO PRODUCTO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">

            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-surface-container flex justify-between items-center bg-surface">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">{editingId ? 'Editar Producto' : 'Crear Nuevo Producto'}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-on-surface-variant hover:text-error transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-error/10"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">

              <div className="space-y-4">
                <div>
                  <label className="block text-label-md font-bold text-on-surface mb-1">Nombre del producto *</label>
                  <input
                    type="text"
                    value={newProd.name}
                    onChange={(e) => setNewProd(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ej: Resma Punax A4 75g"
                    className="w-full bg-surface border border-outline rounded-lg px-3 py-2 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-label-md font-bold text-on-surface mb-1">SKU / Código</label>
                    <input
                      type="text"
                      value={newProd.sku}
                      onChange={(e) => setNewProd(prev => ({ ...prev, sku: e.target.value }))}
                      placeholder="Ej: PUN-A4-75"
                      className="w-full bg-surface border border-outline rounded-lg px-3 py-2 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-data-tabular uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-label-md font-bold text-on-surface mb-1">Categoría</label>
                    <select
                      value={newProd.categoryId}
                      onChange={(e) => setNewProd(prev => ({ ...prev, categoryId: e.target.value }))}
                      className="w-full bg-surface border border-outline rounded-lg px-3 py-2 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                      <option value="">Seleccionar categoría...</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-label-md font-bold text-on-surface mb-1">Imagen</label>
                  <div className="flex items-center gap-3">
                    {newProd.imageUrl && (
                      <img src={newProd.imageUrl} alt="Vista previa" className="w-16 h-16 rounded object-cover border" />
                    )}
                    <label className="border border-outline bg-surface hover:bg-surface-container px-4 py-2 rounded-lg text-body-sm cursor-pointer">
                      {isUploading ? 'Subiendo...' : newProd.imageUrl ? 'Cambiar imagen' : 'Subir imagen'}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={isUploading}
                        onChange={(e) => {
                          const f = e.target.files?.[0]
                          if (f) handleImageUpload(f)
                          e.target.value = ''
                        }}
                      />
                    </label>
                    {newProd.imageUrl && (
                      <button type="button" onClick={() => setNewProd((prev) => ({ ...prev, imageUrl: '' }))} className="text-error text-body-sm hover:underline">
                        Quitar
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-label-md font-bold text-on-surface mb-1">Descripción / Especificaciones</label>
                  <textarea
                    rows={3}
                    value={newProd.description}
                    onChange={(e) => setNewProd(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="75 g/m² · 210 × 297 mm · 500 hojas..."
                    className="w-full bg-surface border border-outline rounded-lg px-3 py-2 text-body-sm focus:outline-none focus:border-primary resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-label-md font-bold text-on-surface mb-1">Precio Unitario (ARS) *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant font-data-tabular">$</span>
                      <input
                        type="number"
                        value={newProd.price}
                        onChange={(e) => setNewProd(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="8500"
                        className="w-full bg-surface border border-outline rounded-lg pl-8 pr-3 py-2 text-body-sm focus:outline-none focus:border-primary font-data-tabular"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-label-md font-bold text-on-surface mb-1">Stock Inicial *</label>
                    <input
                      type="number"
                      value={newProd.stock}
                      onChange={(e) => setNewProd(prev => ({ ...prev, stock: e.target.value }))}
                      placeholder="500"
                      className="w-full bg-surface border border-outline rounded-lg px-3 py-2 text-body-sm focus:outline-none focus:border-primary font-data-tabular"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-surface-container bg-surface-container-low flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="border border-outline bg-surface hover:bg-surface-container text-on-surface px-6 py-2 rounded-lg font-label-md transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveProduct}
                disabled={isSaving || isUploading}
                className="bg-primary hover:bg-primary-container text-on-primary px-6 py-2 rounded-lg font-label-md transition-colors font-bold disabled:opacity-60"
              >
                {isSaving ? 'Guardando...' : editingId ? 'Guardar Cambios' : 'Guardar Producto'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
