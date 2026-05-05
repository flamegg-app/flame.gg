import type { NextApiRequest, NextApiResponse } from 'next';

// 1. Define the structure of the data your frontend expects
interface LeaderboardUser {
  name: string;
  username: string;
  views: number;
  avatar: string;
  isPremium: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { filter } = req.query;

  try {
    /* 
       2. REAL DATABASE LOGIC GOES HERE 
       Replace the logic below with your actual database call.
    */
    
    // Example for Prisma:
    // const users = await prisma.user.findMany({
    //   orderBy: { views: 'desc' },
    //   take: 50,
    //   select: { name: true, username: true, views: true, avatar: true, isPremium: true }
    // });

    // Example for Supabase:
    // const { data: users, error } = await supabase
    //   .from('profiles')
    //   .select('name, username, views, avatar, isPremium')
    //   .order('views', { ascending: false })
    //   .limit(50);

    // For now, let's return an empty array or a simple check 
    // to ensure the connection is working.
    const realUsers: LeaderboardUser[] = []; 

    // 3. Return the data to the frontend
    return res.status(200).json(realUsers);

  } catch (error) {
    console.error('Leaderboard API Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}