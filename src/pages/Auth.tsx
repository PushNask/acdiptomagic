import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { AuthError } from "@supabase/supabase-js";

const Auth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/dashboard");
      }
      if (event === "SIGNED_OUT") {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleError = (error: AuthError) => {
    switch (error.message) {
      case "Invalid login credentials":
        setError("Invalid email or password. Please try again.");
        break;
      case "Email not confirmed":
        setError("Please verify your email address before signing in.");
        break;
      default:
        setError(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Welcome to AcDiToPush
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <SupabaseAuth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#1E88E5',
                      brandAccent: '#F97316',
                    },
                  },
                },
              }}
              providers={[]}
              redirectTo={window.location.origin}
              localization={{
                variables: {
                  sign_up: {
                    email_label: "Email",
                    password_label: "Password",
                    button_label: "Sign Up",
                    loading_button_label: "Signing up...",
                    social_provider_text: "Sign in with {{provider}}",
                    link_text: "Don't have an account? Sign up",
                    confirmation_text: "Check your email for the confirmation link",
                  },
                },
              }}
              extendSignUpFields={[
                {
                  name: "full_name",
                  label: "Full Name",
                  type: "text",
                  required: true,
                },
                {
                  name: "phone_number",
                  label: "Phone Number",
                  type: "tel",
                  required: true,
                },
                {
                  name: "user_type",
                  label: "I am a",
                  type: "select",
                  options: [
                    { label: "Startup", value: "startup" },
                    { label: "SME", value: "sme" },
                    { label: "Investor", value: "investor" },
                    { label: "Student", value: "student" },
                  ],
                  required: true,
                },
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;