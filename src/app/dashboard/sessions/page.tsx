"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/contexts/authContext";
import { DebugSession } from "@/lib/definitions";
import { capitalize, toast } from "@/lib/utils";
import DB from "@/supabase/db";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Speech } from "lucide-react";

const SessionsPage = () => {
  const [sessions, setSessions] = useState<DebugSession[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useUser();

  useEffect(() => {
    const fetchSessions = async () => {
      const { data, error } = await DB.getSessions(user?.user?.id as string);

      if (error) {
        console.error("Error fetching sessions:", error);
        toast("error", error.message);
        setLoading(false);
        return;
      }

      setSessions(data as DebugSession[]);
      setLoading(false);
    };

    if (user?.user?.id) {
      fetchSessions();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex flex-col space-y-4 p-4">
        <h2 className="text-3xl font-bold text-gray-800">Sessions</h2>
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  const sessionsList = sessions.map((session) => (
    <Card
      className="rounded-lg hover:shadow-lg duration-300 border-gray-200 overflow-hidden"
      key={session.id}
    >
      <CardContent className="p-0">
        <CardHeader className="px-4 ">
          <Link
            href={`/dashboard/sessions/${session.id}`}
            className="hover:text-blue-500 duration-300"
          >
            <CardTitle className="text-xl flex items-center gap-2">
              <Speech className="h-5 w-5 text-blue-500" />
              {capitalize(session.title || "")}
            </CardTitle>
          </Link>
          <CardDescription>
            Created: {new Date(session.created_at || "").toLocaleString()}
          </CardDescription>
        </CardHeader>

        <div className="px-4 pb-2 text-sm text-gray-600">
          {"No description provided"}
        </div>

        <div className="  p-3 flex justify-between items-center border-t border-gray-200">
          <div className="text-xs text-gray-500">
            ID: {session.id.substring(0, 8)}...
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-blue-600 hover:text-blue-700"
            asChild
          >
            <Link href={`/dashboard/sessions/${session.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  ));

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Sessions</h2>
        {/* <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          asChild
        >
          <Link href="/dashboard">
            <span>Dashboard</span>
          </Link>
        </Button> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sessionsList}
      </div>
    </div>
  );
};

export default SessionsPage;
