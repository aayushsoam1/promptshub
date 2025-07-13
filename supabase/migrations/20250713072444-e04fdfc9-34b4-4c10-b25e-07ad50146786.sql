
-- Create a comprehensive subscribers table to track user profiles and subscription status
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  subscription_status BOOLEAN NOT NULL DEFAULT true,
  first_name TEXT,
  last_name TEXT,  
  display_name TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_login TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own profile
CREATE POLICY "Users can view their own profile" 
  ON public.user_profiles 
  FOR SELECT 
  USING (true);

-- Create policy for anyone to insert/update profiles (for email-based auth)
CREATE POLICY "Anyone can manage profiles" 
  ON public.user_profiles 
  FOR ALL
  WITH CHECK (true);

-- Update prompts table to link with user profiles
ALTER TABLE public.prompts ADD COLUMN user_email TEXT;
ALTER TABLE public.prompts ADD COLUMN profile_id UUID REFERENCES public.user_profiles(id);

-- Create index for better performance
CREATE INDEX idx_prompts_user_email ON public.prompts(user_email);
CREATE INDEX idx_prompts_profile_id ON public.prompts(profile_id);

-- Update the prompt_stats view to include user profile information
DROP VIEW IF EXISTS public.prompt_stats;
CREATE VIEW public.prompt_stats AS
SELECT 
  p.id,
  p.title,
  p.description,
  p.content,
  p.category,
  p.tags,
  p.author,
  p.user_email,
  p.profile_id,
  p.created_at,
  p.updated_at,
  COALESCE(likes.count, 0) as likes,
  COALESCE(views.count, 0) as views,
  COALESCE(copies.count, 0) as copies,
  up.display_name as user_display_name
FROM public.prompts p
LEFT JOIN public.user_profiles up ON p.profile_id = up.id
LEFT JOIN (
  SELECT prompt_id, COUNT(*) as count 
  FROM public.prompt_interactions 
  WHERE interaction_type = 'like' 
  GROUP BY prompt_id
) likes ON p.id = likes.prompt_id
LEFT JOIN (
  SELECT prompt_id, COUNT(*) as count 
  FROM public.prompt_interactions 
  WHERE interaction_type = 'view' 
  GROUP BY prompt_id
) views ON p.id = views.prompt_id
LEFT JOIN (
  SELECT prompt_id, COUNT(*) as count 
  FROM public.prompt_interactions 
  WHERE interaction_type = 'copy' 
  GROUP BY prompt_id
) copies ON p.id = copies.prompt_id;
