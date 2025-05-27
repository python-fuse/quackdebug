"use client";
import authService from "@/supabase/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex">
      <div className="image w-1/3 h-screen bg-blue-500"></div>

      <div className="flex-1 flex flex-col gap-y-4 place-items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome to QuackDebug</h2>
          <p>The perfect debugging companion just for you!</p>
        </div>

        <p className="text-sm">Select an auth provider to continue.</p>

        <div className="flex flex-col gap-y-2  w-1/2">
          <Button
            variant={"outline"}
            onClick={async () => await authService.signInWithGoogle()}
          >
            <Image src={"/google.svg"} alt="Google" width={20} height={20} />{" "}
            Continue with Google
          </Button>

          <Button variant={"outline"}>
            <Image src={"/github.svg"} alt="Google" width={20} height={20} />{" "}
            Continue with Github
          </Button>

          {/* Policies */}
          <p className="text-sm text-center mt-10">
            By continuing, you agree to our{" "}
            <span className="text-blue-500">Privacy Policies</span> and{" "}
            <span className="text-blue-500">Terms of Service</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
