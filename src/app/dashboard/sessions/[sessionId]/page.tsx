"use client";
import Notes from "@/components/sessions/Notes";
import Recordings from "@/components/sessions/Recordings";
import { DebugSession, Note, Recording } from "@/lib/definitions";
import { capitalize } from "@/lib/utils";
import DB from "@/supabase/db";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
      } else {
        setNotes(notesRes.data);
      }

      if (recordingsRes.error) {
        console.error("Error fetching recordings:", recordingsRes.error);
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
      <div className="flex flex-col md:flex-row">
        {/* Notes */}
        <Notes notes={notes} sessionId={sessionId} />

        {/* Recordings */}
        <Recordings recordings={recordings} sessionId={sessionId} />
      </div>
    </>
  );
};

const SessionHeader = ({ session }: { session: DebugSession | null }) => {
  if (!session) return null;

  return (
    <div className="flex justify-between items-center p-4  border-b border-gray-300 ">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">
          {capitalize(session?.title || "")}
        </h1>

        <p className="text-gray-500 text-xs">
          {session?.created_at
            ? new Date(session.created_at).toLocaleString()
            : "..."}
        </p>
      </div>
    </div>
  );
};

export default page;
