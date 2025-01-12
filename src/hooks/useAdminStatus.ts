import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useAdminStatus = (userId: string | undefined) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        // First check if we have a valid session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          setError(sessionError);
          setIsLoading(false);
          return;
        }

        if (!session) {
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        // Get user type from profile with retry logic
        const maxRetries = 3;
        let attempt = 0;
        let profileData = null;
        let profileError = null;

        while (attempt < maxRetries && !profileData) {
          try {
            const { data, error } = await supabase
              .from('profiles')
              .select('user_type')
              .eq('id', session.user.id)
              .single();

            if (error) {
              profileError = error;
              console.error(`Attempt ${attempt + 1} failed:`, error);
              await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1))); // Exponential backoff
            } else {
              profileData = data;
              break;
            }
          } catch (e) {
            profileError = e;
            console.error(`Attempt ${attempt + 1} failed with exception:`, e);
          }
          attempt++;
        }

        if (!profileData && profileError) {
          console.error("Final profile fetch error:", profileError);
          toast.error("Error checking admin status. Please try again.");
          setError(profileError as Error);
          setIsAdmin(false);
        } else if (profileData) {
          setIsAdmin(profileData.user_type === 'admin');
          setError(null);
        }

      } catch (error) {
        console.error("Admin status check error:", error);
        setError(error as Error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Only check admin status if we have a userId
    if (userId) {
      checkAdminStatus();
    } else {
      setIsAdmin(false);
      setIsLoading(false);
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setIsAdmin(false);
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);

  return { isAdmin, isLoading, error };
};