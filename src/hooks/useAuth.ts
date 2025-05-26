import authService from "@/supabase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.getUser();
        setIsAuthenticated(!!user);
      } catch (error) {
        console.error("Error getting user:", error);
        setIsAuthenticated(false);
        router.push("/auth/signin");
      }
    };
    checkAuth();
  }, []);

  return {
    isAuthenticated,
  };
};

export default useAuth;
