import { toast } from "@/lib/utils";
import { supabase } from "./index";
class AuthService {
  redirectTo =
    process.env.NODE_ENV == "development"
      ? "http://localhost:3000/dashboard"
      : "https://quackdebug.vercel.app/dashboard";

  async signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: this.redirectTo,
      },
    });

    if (error) {
      console.error("Error signing in with Google:", error);
      toast("error", "Failed to sign in with Google. Please try again.");
      return false;
    }

    toast("success", "Successfully signed in with Google!");
    return true;
  }

  async signInWithGitHub() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: this.redirectTo,
      },
    });

    if (error) {
      console.error("Error signing in with GitHub:", error);
      toast("error", "Failed to sign in with GitHub. Please try again.");
      return false;
    }

    toast("success", "Successfully signed in with GitHub!");
    return true;
  }

  async getUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Error getting user:", error);
      throw error;
    }

    return user;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error);
      return error;
    }
  }
}

const authService = new AuthService();
export default authService;
