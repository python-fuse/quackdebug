"use client";

import { FormEvent, useState } from "react";
import { Button } from "../button";
import { LogOut, Plus } from "lucide-react";
import SidebarItems from "./SidebarItems";
import authService from "@/supabase/auth";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../dialog";
import { Input } from "../input";
import { Label } from "../label";
import Spinner from "../spinner";
import db from "@/supabase/db";
import { useUser } from "@/contexts/authContext";

const Sidebar = () => {
  const router = useRouter();
  const [isNewSessionModalOpen, setIsNewSessionModalOpen] = useState(false);
  const [sessionName, setSessionName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user: user } = useUser();

  const handleSignout = async () => {
    const error = await authService.signOut();
    if (error) {
      console.error("Error signing out:", error);
    } else {
      console.log("Signed out successfully");
      router.push("/auth/signin");
    }
  };

  const handleCreateSession = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await db.createSession({
      title: sessionName,
      owner_id: user?.id || "",
    });

    if (response.error) {
      console.error("Error creating session:", response.error);
      setLoading(false);
      return;
    }

    console.log("Session created successfully:", response.data);
    setLoading(false);
    setIsNewSessionModalOpen(false);
    router.push(`/dashboard/sessions/${response.data.id}`);
  };

  return (
    <>
      {/* Main sidebar */}
      <aside className="w-1/6 h-[calc(100dvh-66.8px)] p-4 overflow-y-auto border-r flex flex-col space-y-4">
        {/* New Session */}
        <Button
          variant={"outline"}
          onClick={() => setIsNewSessionModalOpen(true)}
        >
          <Plus size={20} /> New Session
        </Button>

        {/* Current pages and other links */}
        <SidebarItems />
        {/* Recent projects */}

        {/* Logout */}
        <Button
          variant={"destructive"}
          className="mt-auto"
          onClick={handleSignout}
        >
          <LogOut size={20} /> Logout
        </Button>
      </aside>

      {/* New Session Modal */}
      <Dialog
        open={isNewSessionModalOpen}
        onOpenChange={setIsNewSessionModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Session</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreateSession}>
            <Label htmlFor="session-name" className="block mb-2">
              Title
            </Label>

            <Input
              id="session-name"
              placeholder="Session Name"
              className="mb-4"
              required
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
            />
            <Button
              variant={"default"}
              className={`w-full ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? <Spinner /> : "Create Session"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Sidebar;
