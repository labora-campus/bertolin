import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<any>(supabaseUrl, supabaseAnonKey)

// Types export
export type Category = Database['public']['Tables']['categories']['Row']
export type Product = Database['public']['Tables']['products']['Row']
export type Order = Database['public']['Tables']['orders']['Row']
export type OrderItem = Database['public']['Tables']['order_items']['Row']
export type ShippingZone = Database['public']['Tables']['shipping_zones']['Row']
export type Banner = Database['public']['Tables']['banners']['Row']

// Helper functions for Storefront
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }
  return data
}

export async function getProducts(categorySlug?: string) {
  let query = supabase
    .from('products')
    .select('*, categories(*)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (categorySlug && categorySlug !== 'Todos') {
    // Check if category matches
    query = query.eq('categories.slug', categorySlug)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  return data
}

export async function getProductByIdOrSlug(identifier: string) {
  // Try by id first if valid uuid or fallback to slug
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*), product_variants(*)')
    .or(`id.eq.${identifier},slug.eq.${identifier}`)
    .single()

  if (error) {
    return null
  }
  return data
}

export async function getBanners() {
  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching banners:', error)
    return []
  }
  return data
}

export async function getShippingZones() {
  const { data, error } = await supabase
    .from('shipping_zones')
    .select('*')
    .eq('is_active', true)

  if (error) {
    console.error('Error fetching shipping zones:', error)
    return []
  }
  return data
}
