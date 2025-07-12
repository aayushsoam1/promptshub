
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useYouTubeVideo = () => {
  return useQuery({
    queryKey: ['youtube-video'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('youtube_videos')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching YouTube video:', error);
        throw error;
      }
      
      return data as YouTubeVideo | null;
    }
  });
};

// Helper function to extract video ID from YouTube URL
export const getYouTubeVideoId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
