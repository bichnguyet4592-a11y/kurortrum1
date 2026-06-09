import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Property = {
  id: string
  owner_id: string
  title: string
  description: string
  city: string
  address: string
  price_per_night: number
  guests: number
  rooms: number
  type: 'apartment' | 'house'
  amenities: string[]
  latitude: number
  longitude: number
  is_active: boolean
  created_at: string
  property_images?: { url: string }[]
}

export type Profile = {
  id: string
  role: 'owner' | 'admin'
  name: string
  phone: string
  email: string
}

export type Lead = {
  id: string
  property_id: string
  name: string
  phone: string
  message: string
  need_transfer: boolean
  created_at: string
}

export type Subscription = {
  id: string
  owner_id: string
  plan_type: 'starter' | 'pro' | 'agency'
  status: 'trial' | 'active' | 'expired'
  expires_at: string
}