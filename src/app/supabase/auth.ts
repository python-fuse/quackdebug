import { supabase } from "./index";
class AuthService {
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    console.log("Google sign-in data:", data);

    if (error) {
      console.error("Error signing in with Google:", error);
      return null;
    }
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error);
      return null;
    }
  }
}

const authService = new AuthService();
export default authService;
