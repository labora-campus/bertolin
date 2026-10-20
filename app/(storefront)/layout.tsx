import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { AddedToast } from '@/components/cart/AddedToast'
import { BottomNav } from '@/components/layout/BottomNav'

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <CartDrawer />
      <AddedToast />
      <BottomNav />
    </>
  )
}
