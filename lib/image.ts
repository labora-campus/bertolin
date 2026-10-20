// Hosts allowed in next.config.mjs images.remotePatterns. Images from any other
// host (e.g. a URL pasted in the CSV import) are rendered without optimization
// instead of failing.
const OPTIMIZED_IMAGE_HOSTS = ['lh3.googleusercontent.com', 'http2.mlstatic.com', 'images.unsplash.com']

export function canOptimizeImage(src: string): boolean {
  try {
    const { hostname, pathname } = new URL(src)
    const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (supabase && hostname === new URL(supabase).hostname) return pathname.startsWith('/storage/v1/object/public/')
    return OPTIMIZED_IMAGE_HOSTS.includes(hostname)
  } catch {
    return false
  }
}
