
-- Create a table to store subscriber emails
CREATE TABLE public.subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to insert (subscribe)
CREATE POLICY "Anyone can subscribe" 
  ON public.subscribers 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy that allows anyone to read (for admin purposes)
CREATE POLICY "Anyone can read subscribers" 
  ON public.subscribers 
  FOR SELECT 
  USING (true);
