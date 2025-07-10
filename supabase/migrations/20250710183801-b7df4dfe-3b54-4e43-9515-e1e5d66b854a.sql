
-- Create prompts table to store all prompts
CREATE TABLE public.prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  tags TEXT[] DEFAULT '{}',
  author TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create table to track user interactions (likes, views, copies)
CREATE TABLE public.prompt_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID REFERENCES public.prompts(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL CHECK (interaction_type IN ('like', 'view', 'copy')),
  user_session TEXT, -- For anonymous users, we'll use session ID
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(prompt_id, interaction_type, user_session)
);

-- Create view to get prompt stats
CREATE VIEW public.prompt_stats AS
SELECT 
  p.id,
  p.title,
  p.description,
  p.content,
  p.category,
  p.tags,
  p.author,
  p.created_at,
  p.updated_at,
  COALESCE(likes.count, 0) as likes,
  COALESCE(views.count, 0) as views,
  COALESCE(copies.count, 0) as copies
FROM public.prompts p
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

-- Insert sample prompts from existing data
INSERT INTO public.prompts (title, description, content, category, tags, author) VALUES
('Creative Writing Assistant', 'Generate compelling stories, characters, and plot developments with rich narrative details.', 'You are a creative writing assistant. Help me develop [STORY ELEMENT]. Create vivid descriptions, compelling dialogue, and engaging plot developments. Focus on [GENRE] and maintain [TONE]. Include sensory details and emotional depth.', 'writing', '{"storytelling", "creative", "fiction", "narrative"}', 'Sarah Chen'),
('Code Review Expert', 'Comprehensive code analysis with optimization suggestions and best practices.', 'Act as a senior software engineer reviewing code. Analyze the following [LANGUAGE] code for: 1) Bugs and potential issues 2) Performance optimizations 3) Code readability 4) Best practices 5) Security considerations. Provide specific suggestions with examples.', 'coding', '{"programming", "review", "optimization", "debugging"}', 'Alex Rodriguez'),
('Marketing Copy Generator', 'Create persuasive marketing content that converts prospects into customers.', 'You are a direct response copywriter. Create compelling marketing copy for [PRODUCT/SERVICE]. Target audience: [AUDIENCE]. Focus on benefits over features, use emotional triggers, include social proof, and end with a clear call-to-action. Tone: [TONE].', 'marketing', '{"copywriting", "sales", "conversion", "advertising"}', 'Emma Johnson'),
('UI/UX Design Consultant', 'Expert guidance on user interface design principles and user experience optimization.', 'Act as a UX/UI design expert. Analyze [DESIGN/INTERFACE] and provide feedback on: 1) User experience flow 2) Visual hierarchy 3) Accessibility 4) Mobile responsiveness 5) Conversion optimization. Suggest specific improvements with design principles.', 'design', '{"UI", "UX", "design", "user-experience", "accessibility"}', 'David Park'),
('Business Strategy Advisor', 'Strategic business insights and actionable recommendations for growth.', 'You are a business strategy consultant. Analyze [BUSINESS SITUATION/CHALLENGE] and provide: 1) Market analysis 2) Competitive positioning 3) Strategic recommendations 4) Risk assessment 5) Implementation roadmap. Focus on actionable insights and measurable outcomes.', 'business', '{"strategy", "consulting", "analysis", "growth", "planning"}', 'Michael Torres'),
('Educational Content Creator', 'Design engaging educational materials and learning experiences.', 'Act as an educational content designer. Create learning materials for [TOPIC] targeting [AUDIENCE LEVEL]. Include: 1) Clear learning objectives 2) Engaging explanations 3) Practical examples 4) Interactive elements 5) Assessment methods. Make it accessible and memorable.', 'education', '{"teaching", "learning", "curriculum", "education", "training"}', 'Lisa Wong'),
('Technical Documentation Writer', 'Create clear, comprehensive technical documentation for developers and users.', 'You are a technical writer. Create documentation for [TECHNOLOGY/API/FEATURE]. Include: 1) Clear overview 2) Step-by-step instructions 3) Code examples 4) Troubleshooting guide 5) Best practices. Write for [AUDIENCE LEVEL] with proper formatting and structure.', 'writing', '{"documentation", "technical", "API", "guide", "reference"}', 'James Miller'),
('Social Media Content Planner', 'Strategic social media content creation with engagement optimization.', 'Act as a social media strategist. Create a content plan for [PLATFORM] promoting [BRAND/PRODUCT]. Include: 1) Content pillars 2) Post formats 3) Hashtag strategy 4) Engagement tactics 5) Posting schedule. Focus on [TARGET AUDIENCE] and [BRAND VOICE].', 'marketing', '{"social-media", "content", "engagement", "branding", "strategy"}', 'Rachel Green'),
('Python Code Optimizer', 'Optimize Python code for performance, readability, and best practices.', 'You are a Python optimization expert. Review this Python code and suggest improvements for: 1) Performance optimization 2) Memory efficiency 3) Code readability 4) Pythonic practices 5) Error handling. Provide refactored code examples with explanations.', 'coding', '{"python", "optimization", "performance", "best-practices", "refactoring"}', 'Kevin Zhang');

-- Enable Row Level Security (RLS) for public access
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompt_interactions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can read prompts" ON public.prompts FOR SELECT USING (true);
CREATE POLICY "Anyone can read interactions" ON public.prompt_interactions FOR SELECT USING (true);
CREATE POLICY "Anyone can insert prompts" ON public.prompts FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert interactions" ON public.prompt_interactions FOR INSERT WITH CHECK (true);

-- Function to increment interaction count
CREATE OR REPLACE FUNCTION public.increment_interaction(
  prompt_id_param UUID,
  interaction_type_param TEXT,
  user_session_param TEXT
)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.prompt_interactions (prompt_id, interaction_type, user_session)
  VALUES (prompt_id_param, interaction_type_param, user_session_param)
  ON CONFLICT (prompt_id, interaction_type, user_session) DO NOTHING;
END;
$$;
