import { createServerClient, type CookieOptions } from '@supabase/ssr'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query

  if (code) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return req.cookies[name]
          },
          set(name: string, value: string, options: CookieOptions) {
            res.setHeader('Set-Cookie', name + '=' + value)
          },
          remove(name: string, options: CookieOptions) {
            res.setHeader('Set-Cookie', name + '=; Max-Age=0')
          },
        },
      }
    )
    
    await supabase.auth.exchangeCodeForSession(String(code))
  }

  res.redirect('/dashboard')
}