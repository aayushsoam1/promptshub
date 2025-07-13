
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface UserProfile {
  id: string;
  email: string;
  subscription_status: boolean;
  display_name?: string;
  first_name?: string;
  last_name?: string;
  subscribed_at: string;
  last_login: string;
}

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get or create user profile by email
  const getOrCreateProfile = async (email: string): Promise<UserProfile | null> => {
    try {
      setIsLoading(true);
      
      // First, try to get existing profile
      const { data: existingProfile, error: fetchError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('email', email)
        .single();

      if (existingProfile && !fetchError) {
        // Update last login
        const { data: updatedProfile } = await supabase
          .from('user_profiles')
          .update({ last_login: new Date().toISOString() })
          .eq('id', existingProfile.id)
          .select()
          .single();

        const profile = updatedProfile || existingProfile;
        setUserProfile(profile);
        
        // Show welcome back message
        toast({
          title: ">>> WELCOME_BACK",
          description: `Access granted to ${email}. All prompts unlocked.`,
        });
        
        return profile;
      }

      // Create new profile if doesn't exist
      const emailParts = email.split('@')[0];
      const displayName = emailParts.substring(0, Math.min(emailParts.length, 15));
      
      const { data: newProfile, error: createError } = await supabase
        .from('user_profiles')
        .insert([{
          email,
          display_name: displayName,
          subscription_status: true,
        }])
        .select()
        .single();

      if (createError) {
        console.error('Error creating profile:', createError);
        return null;
      }

      setUserProfile(newProfile);
      
      // Show welcome message for new user
      toast({
        title: ">>> WELCOME_TO_SYSTEM",
        description: `Profile created for ${email}. Full access granted.`,
      });
      
      return newProfile;
    } catch (error) {
      console.error('Profile creation error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Get user's prompts with stats
  const getUserPrompts = async (email: string) => {
    const { data, error } = await supabase
      .from('prompt_stats')
      .select('*')
      .eq('user_email', email)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user prompts:', error);
      return [];
    }

    return data || [];
  };

  return {
    userProfile,
    setUserProfile,
    isLoading,
    getOrCreateProfile,
    getUserPrompts,
  };
};
