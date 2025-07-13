
-- Create a table to store YouTube video URLs
CREATE TABLE public.youtube_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT 'Tutorial Video',
  url TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.youtube_videos ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to read videos
CREATE POLICY "Anyone can read youtube videos" 
  ON public.youtube_videos 
  FOR SELECT 
  USING (true);

-- Create policy that allows anyone to insert videos (for admin purposes)
CREATE POLICY "Anyone can insert youtube videos" 
  ON public.youtube_videos 
  FOR INSERT 
  WITH CHECK (true);

-- Insert a sample YouTube video URL (you can change this later)
INSERT INTO public.youtube_videos (title, url, description, is_active)
VALUES (
  'PromptHub Tutorial',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'Complete tutorial on how to use PromptHub',
  true
);
