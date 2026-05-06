import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query

  if (code) {
    const supabase = createPagesServerClient({ req, res })
    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(String(code))
  }

  // Go to dashboard after successful exchange
  res.redirect('/dashboard')
}

export default handler