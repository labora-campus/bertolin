'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export async function isAdminSession() {
  const { data } = await supabase.auth.getSession()
  return data.session?.user.app_metadata?.role === 'admin'
}

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [ok, setOk] = useState(false)

  useEffect(() => {
    let active = true
    isAdminSession().then((admin) => {
      if (!active) return
      if (admin) setOk(true)
      else router.replace('/admin/login')
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user.app_metadata?.role !== 'admin') router.replace('/admin/login')
    })
    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [router])

  if (!ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <span className="material-symbols-outlined animate-spin text-primary">progress_activity</span>
      </div>
    )
  }
  return <>{children}</>
}

export function LogoutButton() {
  const router = useRouter()
  return (
    <button
      onClick={async () => {
        await supabase.auth.signOut()
        router.replace('/admin/login')
      }}
      className="w-full flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-error hover:bg-error-container hover:text-on-error-container transition-colors mt-1"
    >
      <span className="material-symbols-outlined text-[20px]">logout</span>
      <span className="font-label-md">Cerrar Sesión</span>
    </button>
  )
}
