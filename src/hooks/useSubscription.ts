
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const useSubscription = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase
        .from('subscribers')
        .insert([{ email }])
        .select()
        .single();
      
      if (error) {
        console.error('Error saving subscriber:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      console.log('Subscriber saved successfully');
    },
    onError: (error: any) => {
      console.error('Subscription error:', error);
      if (error.code === '23505') { // Unique constraint violation
        toast({
          title: "Already Subscribed",
          description: "This email is already subscribed!",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to subscribe. Please try again.",
          variant: "destructive",
        });
      }
    }
  });
};
