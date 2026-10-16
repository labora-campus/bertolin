export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      banners: {
        Row: {
          badge: string | null
          created_at: string | null
          id: string
          image_url: string
          is_active: boolean | null
          link_url: string | null
          order_index: number | null
          subtitle: string | null
          title: string
        }
        Insert: {
          badge?: string | null
          created_at?: string | null
          id?: string
          image_url: string
          is_active?: boolean | null
          link_url?: string | null
          order_index?: number | null
          subtitle?: string | null
          title: string
        }
        Update: {
          badge?: string | null
          created_at?: string | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          link_url?: string | null
          order_index?: number | null
          subtitle?: string | null
          title?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          order_index: number | null
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          order_index?: number | null
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          order_index?: number | null
          slug?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string | null
          id: string
          order_id: string | null
          product_id: string | null
          product_image: string | null
          product_name: string
          product_sku: string | null
          quantity: number
          subtotal: number
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id?: string | null
          product_id?: string | null
          product_image?: string | null
          product_name: string
          product_sku?: string | null
          quantity?: number
          subtotal: number
          unit_price: number
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string | null
          product_id?: string | null
          product_image?: string | null
          product_name?: string
          product_sku?: string | null
          quantity?: number
          subtotal?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_cuit: string | null
          customer_email: string
          customer_name: string
          customer_phone: string
          id: string
          notes: string | null
          payment_method: string | null
          receipt_uploaded_at: string | null
          receipt_url: string | null
          shipping_address: string
          shipping_city: string | null
          shipping_cost: number | null
          shipping_postal_code: string | null
          status: string
          subtotal: number
          total: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_cuit?: string | null
          customer_email: string
          customer_name: string
          customer_phone: string
          id?: string
          notes?: string | null
          payment_method?: string | null
          receipt_uploaded_at?: string | null
          receipt_url?: string | null
          shipping_address: string
          shipping_city?: string | null
          shipping_cost?: number | null
          shipping_postal_code?: string | null
          status?: string
          subtotal?: number
          total?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_cuit?: string | null
          customer_email?: string
          customer_name?: string
          customer_phone?: string
          id?: string
          notes?: string | null
          payment_method?: string | null
          receipt_uploaded_at?: string | null
          receipt_url?: string | null
          shipping_address?: string
          shipping_city?: string | null
          shipping_cost?: number | null
          shipping_postal_code?: string | null
          status?: string
          subtotal?: number
          total?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      product_variants: {
        Row: {
          created_at: string | null
          id: string
          name: string
          price: number | null
          product_id: string | null
          sku: string | null
          stock: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          price?: number | null
          product_id?: string | null
          sku?: string | null
          stock?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          price?: number | null
          product_id?: string | null
          sku?: string | null
          stock?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: string | null
          created_at: string | null
          description: string | null
          id: string
          images: string[] | null
          is_active: boolean | null
          is_featured: boolean | null
          name: string
          price: number
          sku: string | null
          slug: string
          specs: string | null
          stock: number
          stock_status: string | null
          tag: string | null
          updated_at: string | null
          wholesale_price: number | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          is_featured?: boolean | null
          name: string
          price?: number
          sku?: string | null
          slug: string
          specs?: string | null
          stock?: number
          stock_status?: string | null
          tag?: string | null
          updated_at?: string | null
          wholesale_price?: number | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          is_featured?: boolean | null
          name?: string
          price?: number
          sku?: string | null
          slug?: string
          specs?: string | null
          stock?: number
          stock_status?: string | null
          tag?: string | null
          updated_at?: string | null
          wholesale_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      shipping_zones: {
        Row: {
          created_at: string | null
          estimated_days: string | null
          id: string
          is_active: boolean | null
          name: string
          postal_codes: string[] | null
          price: number
        }
        Insert: {
          created_at?: string | null
          estimated_days?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          postal_codes?: string[] | null
          price?: number
        }
        Update: {
          created_at?: string | null
          estimated_days?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          postal_codes?: string[] | null
          price?: number
        }
        Relationships: []
      }
    }
  }
}
