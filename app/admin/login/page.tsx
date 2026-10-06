'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      router.push('/admin')
    }, 800)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-space-md">
      <div className="max-w-sm w-full bg-surface-container-lowest p-space-xl rounded-xl shadow-lg border border-surface-container">
        <div className="text-center mb-space-lg">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-space-sm">
            <span className="material-symbols-outlined text-[32px]">admin_panel_settings</span>
          </div>
          <h1 className="font-headline-md text-headline-md text-on-surface">Panel de Control</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Ingresá tus credenciales para acceder</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-space-md">
          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-1">Email</label>
            <input 
              type="email" 
              required
              defaultValue="admin@papelerabertolin.com"
              className="w-full bg-surface border border-outline rounded-lg px-space-sm py-2 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
            />
          </div>
          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-1">Contraseña</label>
            <input 
              type="password" 
              required
              defaultValue="123456"
              className="w-full bg-surface border border-outline rounded-lg px-space-sm py-2 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-container text-on-primary py-2.5 rounded-lg font-label-md font-bold transition-colors disabled:opacity-70 flex justify-center items-center gap-2 mt-4"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
            ) : (
              'Ingresar'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
