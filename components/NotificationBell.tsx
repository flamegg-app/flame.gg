import { useState, useEffect } from 'react';

import { supabase } from '../lib/supabase';

import { Bell, X } from 'lucide-react';



export default function NotificationBell() {

  const [notifications, setNotifications] = useState<any[]>([]);



  useEffect(() => {

    fetchNotifications();

    

    // Realtime listener: Pop an alert as soon as the DB trigger fires

    const channel = supabase

      .channel('schema-db-changes')

      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications' }, 

        (payload) => {

          setNotifications(prev => [payload.new, ...prev]);

          alert(`New Notification: ${payload.new.title}`);

      })

      .subscribe();



    return () => { supabase.removeChannel(channel); };

  }, []);



  async function fetchNotifications() {

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false });

    if (data) setNotifications(data);

  }



  return (

    <div className="relative group">

      <Bell className="text-neutral-500 cursor-pointer hover:text-white transition" />

      {notifications.filter(n => !n.is_read).length > 0 && (

        <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full border border-black"></span>

      )}

    </div>

  );

}