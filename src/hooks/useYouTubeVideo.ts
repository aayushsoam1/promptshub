
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  description: string | null;
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
        .single();
      
      if (error) {
        console.error('Error fetching YouTube video:', error);
        throw error;
      }
      
      return data as YouTubeVideo;
    }
  });
};

export const getYouTubeEmbedUrl = (url: string) => {
  // Convert YouTube watch URL to embed URL
  const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId[1]}`;
  }
  return url;
};
