'use client'

import { useEffect, useState } from 'react'
import { supabase, type ShippingZone } from '@/lib/supabase'

const emptyForm = { name: '', postalCodes: '', price: '', days: '' }

export default function AdminEnviosPage() {
  const [zones, setZones] = useState<ShippingZone[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('shipping_zones').select('*').order('price')
    setZones((data as ShippingZone[]) || [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const openNew = () => {
    setEditingId(null)
    setForm(emptyForm)
    setOpen(true)
  }

  const openEdit = (z: ShippingZone) => {
    setEditingId(z.id)
    setForm({
      name: z.name,
      postalCodes: (z.postal_codes || []).join(', '),
      price: String(z.price),
      days: z.estimated_days || '',
    })
    setOpen(true)
  }

  const save = async () => {
    const codes = form.postalCodes
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean)
    if (!form.name.trim() || form.price === '' || codes.length === 0) {
      alert('Completá nombre, costo y al menos un código postal o rango.')
      return
    }
    if (!codes.every((c) => /^\d{4}(-\d{4})?$/.test(c))) {
      alert('Los códigos postales deben ser números de 4 dígitos o rangos, por ejemplo: 1000-1499, 1650')
      return
    }
    setSaving(true)
    const fields = {
      name: form.name.trim(),
      postal_codes: codes,
      price: Number(form.price),
      estimated_days: form.days.trim() || null,
    }
    const { error } = editingId
      ? await supabase.from('shipping_zones').update(fields).eq('id', editingId)
      : await supabase.from('shipping_zones').insert({ ...fields, is_active: true })
    setSaving(false)
    if (error) {
      alert('Error al guardar: ' + error.message)
      return
    }
    setOpen(false)
    load()
  }

  const toggle = async (z: ShippingZone) => {
    const { error } = await supabase.from('shipping_zones').update({ is_active: !z.is_active }).eq('id', z.id)
    if (error) alert('Error: ' + error.message)
    else setZones((prev) => prev.map((x) => (x.id === z.id ? { ...x, is_active: !z.is_active } : x)))
  }

  const remove = async (z: ShippingZone) => {
    if (!confirm(`¿Eliminar la zona "${z.name}"?`)) return
    const { error } = await supabase.from('shipping_zones').delete().eq('id', z.id)
    if (error) alert('Error: ' + error.message)
    else setZones((prev) => prev.filter((x) => x.id !== z.id))
  }

  const input =
    'w-full bg-surface border border-outline rounded-lg px-3 py-2 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary'

  return (
    <div className="space-y-space-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-space-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Costos de Envío</h1>
          <p className="font-body-md text-on-surface-variant">
            Configurá las tarifas logísticas según el código postal del cliente. Los CP sin zona quedan como &quot;A coordinar&quot;.
          </p>
        </div>
        <button
          onClick={openNew}
          className="bg-primary hover:bg-primary-container text-on-primary px-space-md py-2 rounded-lg font-label-md font-bold transition-colors flex items-center gap-2"
        >
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
                <th className="p-space-sm font-medium">Códigos postales</th>
                <th className="p-space-sm font-medium">Costo Fijo (ARS)</th>
                <th className="p-space-sm font-medium">Demora</th>
                <th className="p-space-sm font-medium">Estado</th>
                <th className="p-space-sm font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-body-sm text-on-surface divide-y divide-surface-container">
              {zones.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-on-surface-variant">
                    {loading ? 'Cargando zonas...' : 'No hay zonas configuradas.'}
                  </td>
                </tr>
              ) : (
                zones.map((z) => (
                  <tr key={z.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-space-sm font-medium">{z.name}</td>
                    <td className="p-space-sm font-data-tabular text-on-surface-variant">{(z.postal_codes || []).join(', ')}</td>
                    <td className="p-space-sm font-data-tabular">${Number(z.price).toLocaleString('es-AR')}</td>
                    <td className="p-space-sm text-on-surface-variant">{z.estimated_days || '—'}</td>
                    <td className="p-space-sm">
                      <button
                        onClick={() => toggle(z)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          z.is_active ? 'text-[#137333] bg-[#E6F4EA]' : 'text-on-surface-variant bg-surface-container'
                        }`}
                        title="Click para cambiar"
                      >
                        {z.is_active ? 'Habilitado' : 'Inhabilitado'}
                      </button>
                    </td>
                    <td className="p-space-sm text-right">
                      <button onClick={() => openEdit(z)} className="text-on-surface-variant hover:text-primary transition-colors p-1" title="Editar">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button onClick={() => remove(z)} className="text-on-surface-variant hover:text-error transition-colors p-1" title="Eliminar">
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
          <div className="bg-surface-container-lowest rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-surface-container flex justify-between items-center bg-surface">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">{editingId ? 'Editar Zona' : 'Nueva Zona'}</h2>
              <button onClick={() => setOpen(false)} className="text-on-surface-variant hover:text-error w-8 h-8 flex items-center justify-center rounded-full">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-label-md font-bold text-on-surface mb-1">Nombre *</label>
                <input className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ej: GBA Norte" />
              </div>
              <div>
                <label className="block text-label-md font-bold text-on-surface mb-1">Códigos postales *</label>
                <input
                  className={`${input} font-data-tabular`}
                  value={form.postalCodes}
                  onChange={(e) => setForm({ ...form, postalCodes: e.target.value })}
                  placeholder="1600-1699, 1650, 1702"
                />
                <p className="text-[12px] text-on-surface-variant mt-1">Rangos o valores sueltos de 4 dígitos, separados por coma.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-label-md font-bold text-on-surface mb-1">Costo (ARS) *</label>
                  <input className={`${input} font-data-tabular`} type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>
                <div>
                  <label className="block text-label-md font-bold text-on-surface mb-1">Demora estimada</label>
                  <input className={input} value={form.days} onChange={(e) => setForm({ ...form, days: e.target.value })} placeholder="48-72 hs" />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-surface-container bg-surface-container-low flex justify-end gap-3">
              <button onClick={() => setOpen(false)} className="border border-outline bg-surface hover:bg-surface-container text-on-surface px-6 py-2 rounded-lg font-label-md">
                Cancelar
              </button>
              <button onClick={save} disabled={saving} className="bg-primary hover:bg-primary-container text-on-primary px-6 py-2 rounded-lg font-label-md font-bold disabled:opacity-60">
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
