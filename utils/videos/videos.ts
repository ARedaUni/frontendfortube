import { createClient } from "@/utils/supabase/server";
import { unstable_cache } from 'next/cache';

export type Video = {
  id: string;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
  metadata: {
    width: number;
    height: number;
    duration: number;
    format: string;
  };
  processed_videos: {
    [key: string]: string;
  };
};

export const getVideos = 
  async () => {
    const supabase = await createClient();
    
    const { data: videos, error } = await supabase
      .from('videos')
      .select('*')
      .eq('status', 'completed')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return videos as Video[];
  }
