'use client'

import { useEffect, useState } from 'react'
import { supabase, type Banner } from '@/lib/supabase'

const emptyForm = { title: '', subtitle: '', badge: '', link: '/productos', order: '1', imageUrl: '' }

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('banners').select('*').order('order_index')
    setBanners((data as Banner[]) || [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const openNew = () => {
    setEditingId(null)
    setForm({ ...emptyForm, order: String(banners.length + 1) })
    setOpen(true)
  }

  const openEdit = (b: Banner) => {
    setEditingId(b.id)
    setForm({
      title: b.title,
      subtitle: b.subtitle || '',
      badge: b.badge || '',
      link: b.link_url || '',
      order: String(b.order_index ?? 1),
      imageUrl: b.image_url,
    })
    setOpen(true)
  }

  const uploadImage = async (file: File) => {
    setUploading(true)
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const path = `banners/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    const { error } = await supabase.storage.from('products').upload(path, file, { contentType: file.type })
    if (error) alert('Error al subir la imagen: ' + error.message)
    else setForm((f) => ({ ...f, imageUrl: supabase.storage.from('products').getPublicUrl(path).data.publicUrl }))
    setUploading(false)
  }

  const save = async () => {
    if (!form.title.trim() || !form.imageUrl) {
      alert('Completá el título y subí una imagen.')
      return
    }
    setSaving(true)
    const fields = {
      title: form.title.trim(),
      subtitle: form.subtitle.trim() || null,
      badge: form.badge.trim() || null,
      link_url: form.link.trim() || null,
      order_index: Number(form.order) || 1,
      image_url: form.imageUrl,
    }
    const { error } = editingId
      ? await supabase.from('banners').update(fields).eq('id', editingId)
      : await supabase.from('banners').insert({ ...fields, is_active: true })
    setSaving(false)
    if (error) {
      alert('Error al guardar: ' + error.message)
      return
    }
    setOpen(false)
    load()
  }

  const toggle = async (b: Banner) => {
    const { error } = await supabase.from('banners').update({ is_active: !b.is_active }).eq('id', b.id)
    if (error) alert('Error: ' + error.message)
    else setBanners((prev) => prev.map((x) => (x.id === b.id ? { ...x, is_active: !b.is_active } : x)))
  }

  const remove = async (b: Banner) => {
    if (!confirm(`¿Eliminar el banner "${b.title}"?`)) return
    const { error } = await supabase.from('banners').delete().eq('id', b.id)
    if (error) alert('Error: ' + error.message)
    else setBanners((prev) => prev.filter((x) => x.id !== b.id))
  }

  const input =
    'w-full bg-surface border border-outline rounded-lg px-3 py-2 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary'

  return (
    <div className="space-y-space-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-space-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Gestión de Banners</h1>
          <p className="font-body-md text-on-surface-variant">
            Administrá las imágenes del carrusel principal de la portada. Si no hay banners activos, se muestran los de ejemplo.
          </p>
        </div>
        <button
          onClick={openNew}
          className="bg-primary hover:bg-primary-container text-on-primary px-space-md py-2 rounded-lg font-label-md font-bold transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
          Nuevo Banner
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
              {banners.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-on-surface-variant">
                    {loading ? 'Cargando banners...' : 'No hay banners cargados.'}
                  </td>
                </tr>
              ) : (
                banners.map((b) => (
                  <tr key={b.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-space-sm font-data-tabular text-center text-on-surface-variant">{b.order_index}</td>
                    <td className="p-space-sm">
                      <img src={b.image_url} alt={b.title} className="w-24 h-12 object-cover rounded border border-outline-variant" />
                    </td>
                    <td className="p-space-sm">
                      <div className="font-medium">{b.title}</div>
                      <div className="text-on-surface-variant text-[12px]">{b.subtitle}</div>
                    </td>
                    <td className="p-space-sm">
                      <button
                        onClick={() => toggle(b)}
                        title="Click para cambiar"
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          b.is_active ? 'text-primary bg-primary-container' : 'text-on-surface-variant bg-surface-container'
                        }`}
                      >
                        {b.is_active ? 'Activo' : 'Inactivo'}
                      </button>
                    </td>
                    <td className="p-space-sm text-right">
                      <button onClick={() => openEdit(b)} className="text-on-surface-variant hover:text-primary transition-colors p-1" title="Editar">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button onClick={() => remove(b)} className="text-on-surface-variant hover:text-error transition-colors p-1" title="Eliminar">
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

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface-container-lowest rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-surface-container flex justify-between items-center bg-surface">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">{editingId ? 'Editar Banner' : 'Nuevo Banner'}</h2>
              <button onClick={() => setOpen(false)} className="text-on-surface-variant hover:text-error w-8 h-8 flex items-center justify-center rounded-full">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-label-md font-bold text-on-surface mb-1">Título *</label>
                <input className={input} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Ej: Cyber Monday Papelero" />
              </div>
              <div>
                <label className="block text-label-md font-bold text-on-surface mb-1">Subtítulo</label>
                <input className={input} value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} placeholder="Ej: Hasta 30% OFF en Bobinas" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-label-md font-bold text-on-surface mb-1">Etiqueta</label>
                  <input className={input} value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="Ej: 15% OFF" />
                </div>
                <div>
                  <label className="block text-label-md font-bold text-on-surface mb-1">Orden</label>
                  <input className={`${input} font-data-tabular`} type="number" min="1" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-label-md font-bold text-on-surface mb-1">Enlace del botón</label>
                <input className={input} value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="/productos" />
              </div>
              <div>
                <label className="block text-label-md font-bold text-on-surface mb-1">Imagen *</label>
                <div className="flex items-center gap-3">
                  {form.imageUrl && <img src={form.imageUrl} alt="Vista previa" className="w-24 h-12 rounded object-cover border" />}
                  <label className="border border-outline bg-surface hover:bg-surface-container px-4 py-2 rounded-lg text-body-sm cursor-pointer">
                    {uploading ? 'Subiendo...' : form.imageUrl ? 'Cambiar imagen' : 'Subir imagen'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) => {
                        const f = e.target.files?.[0]
                        if (f) uploadImage(f)
                        e.target.value = ''
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-surface-container bg-surface-container-low flex justify-end gap-3">
              <button onClick={() => setOpen(false)} className="border border-outline bg-surface hover:bg-surface-container text-on-surface px-6 py-2 rounded-lg font-label-md">
                Cancelar
              </button>
              <button onClick={save} disabled={saving || uploading} className="bg-primary hover:bg-primary-container text-on-primary px-6 py-2 rounded-lg font-label-md font-bold disabled:opacity-60">
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
