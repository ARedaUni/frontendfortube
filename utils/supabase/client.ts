import { createBrowserClient } from "@supabase/ssr";
import { type Video, type VideoCreateInput, type VideoUpdateInput } from "../../types/video";

export const createClient = () => {
  const client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  return {
    videos: {
      async list() {
        const { data, error } = await client
          .from('videos')
          .select('*')
          .eq('status', 'completed')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        return data as Video[];
      },
      
      async getById(id: string) {
        const { data, error } = await client
          .from('videos')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        return data as Video;
      },
      
      async create(video: VideoCreateInput) {
        const { data, error } = await client
          .from('videos')
          .insert(video)
          .select()
          .single();
          
        if (error) throw error;
        return data as Video;
      },
      
      async update(id: string, updates: VideoUpdateInput) {
        const { data, error } = await client
          .from('videos')
          .update(updates)
          .eq('id', id)
          .select()
          .single();
          
        if (error) throw error;
        return data as Video;
      },
      
      subscribe(callback: (video: Video) => void) {
        const subscription = client
          .channel('videos')
          .on('postgres_changes', 
            { event: '*', schema: 'public', table: 'videos' },
            (payload) => callback(payload.new as Video)
          )
          .subscribe();
          
        return () => {
          subscription.unsubscribe();
        };
      }
    }
  };
};
