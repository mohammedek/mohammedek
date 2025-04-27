import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for the browser
const createBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

  return createClient(supabaseUrl, supabaseAnonKey)
}

// Create a single supabase client for server components
const createServerClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL as string
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

  return createClient(supabaseUrl, supabaseServiceKey)
}

// Browser client singleton
let browserClient: ReturnType<typeof createBrowserClient> | null = null

// Get the browser client (singleton pattern)
export const getSupabaseBrowserClient = () => {
  if (!browserClient) {
    browserClient = createBrowserClient()
  }
  return browserClient
}

// Get a fresh server client (don't reuse)
export const getSupabaseServerClient = () => {
  return createServerClient()
}
