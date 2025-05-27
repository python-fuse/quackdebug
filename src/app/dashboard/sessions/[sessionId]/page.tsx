"use client";
import Notes from "@/components/sessions/Notes";
import Recordings from "@/components/sessions/Recordings";
import { DebugSession, Note, Recording } from "@/lib/definitions";
import { capitalize } from "@/lib/utils";
import DB from "@/supabase/db";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const page = () => {
  const params = useParams();
  const sessionId: string = params.sessionId as string;
  const [loading, setLoading] = useState(true);

  const [session, setSession] = useState<DebugSession | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [recordings, setRecordings] = useState<Recording[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);

      const [sessionRes, notesRes, recordingsRes] = await Promise.all([
        DB.getSession(sessionId),
        DB.getNotes(sessionId),
        DB.getRecordings(sessionId),
      ]);

      if (sessionRes.error) {
        console.error("Error fetching session:", sessionRes.error);
      } else {
        setSession(sessionRes.data);
      }

      if (notesRes.error) {
        console.error("Error fetching notes:", notesRes.error);
        toast("error", notesRes.error.message);
      } else {
        setNotes(notesRes.data);
      }

      if (recordingsRes.error) {
        toast("error", recordingsRes.error.message);
      } else {
        setRecordings(recordingsRes.data);
      }

      setLoading(false);
    };
    fetchAll();
  }, [sessionId]);

  return (
    <>
      {/* Header */}
      <SessionHeader session={session} />

      {/* Split screen notes and recordings */}
      <div className="flex flex-col md:flex-row-reverse overflow-y-auto">
        {/* Notes */}
        <Notes notes={notes} sessionId={sessionId} />

        {/* Recordings */}
        <Recordings initialRecordings={recordings} sessionId={sessionId} />
      </div>
    </>
  );
};

const SessionHeader = ({ session }: { session: DebugSession | null }) => {
  const router = useRouter();

  if (!session) return null;

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-300">
      <div className="flex">
        <Button
          variant="ghost"
          size="sm"
          className="p-1 h-8 w-8"
          onClick={() => router.push("/dashboard/sessions")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold">
              {capitalize(session?.title || "")}
            </h1>
          </div>

          <p className="text-gray-500 text-xs">
            {session?.created_at
              ? new Date(session.created_at).toLocaleString()
              : "..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
