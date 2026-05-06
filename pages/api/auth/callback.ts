import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(String(code))
    if (!error) {
      return res.redirect('/dashboard')
    }
  }

  return res.redirect('/login?error=auth_failed')
}