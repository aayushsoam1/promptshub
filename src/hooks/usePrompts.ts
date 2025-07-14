
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  likes: number;
  views: number;
  copies: number;
  created_at: string;
  updated_at: string;
  user_email?: string;
  profile_id?: string;
}

// Generate session ID for anonymous users
const getSessionId = () => {
  let sessionId = localStorage.getItem('user_session');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('user_session', sessionId);
  }
  return sessionId;
};

export const usePrompts = () => {
  return useQuery({
    queryKey: ['prompts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('prompt_stats')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching prompts:', error);
        throw error;
      }
      
      return data as Prompt[];
    }
  });
};

export const usePromptCount = () => {
  return useQuery({
    queryKey: ['prompt-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('prompts')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.error('Error fetching prompt count:', error);
        throw error;
      }
      
      return count || 0;
    }
  });
};

export const useIncrementInteraction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ promptId, interactionType }: { promptId: string; interactionType: 'like' | 'view' | 'copy' }) => {
      const sessionId = getSessionId();
      
      const { error } = await supabase.rpc('increment_interaction', {
        prompt_id_param: promptId,
        interaction_type_param: interactionType,
        user_session_param: sessionId
      });
      
      if (error) {
        console.error('Error incrementing interaction:', error);
        throw error;
      }
    },
    onSuccess: () => {
      // Refetch prompts to get updated counts
      queryClient.invalidateQueries({ queryKey: ['prompts'] });
    }
  });
};

export const useCreatePrompt = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (promptData: {
      title: string;
      description: string;
      content: string;
      category: string;
      tags: string[];
      author: string;
    }) => {
      // Get user email and profile if available
      const userEmail = localStorage.getItem('user_email');
      
      let profileId = null;
      if (userEmail) {
        // Get user profile
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('id')
          .eq('email', userEmail)
          .single();
        
        if (profile) {
          profileId = profile.id;
        }
      }

      const { data, error } = await supabase
        .from('prompts')
        .insert([{
          ...promptData,
          user_email: userEmail,
          profile_id: profileId,
        }])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating prompt:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prompts'] });
      queryClient.invalidateQueries({ queryKey: ['prompt-count'] });
      toast({
        title: ">>> SUCCESS",
        description: "Prompt uploaded to database successfully",
      });
    },
    onError: (error) => {
      console.error('Create prompt error:', error);
      toast({
        title: ">>> ERROR",
        description: "Failed to upload prompt to database",
        variant: "destructive",
      });
    }
  });
};
