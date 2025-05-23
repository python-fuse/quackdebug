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
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const page = () => {
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
    <Card className="rounded-sm hover:shadow-lg duration-300" key={session.id}>
      <CardContent>
        <CardHeader>
          <Link
            href={`/dashboard/sessions/${session.id}`}
            className="hover:text-blue-500 duration-300"
          >
            <CardTitle className="text-xl">
              {capitalize(session.title || "")}
            </CardTitle>
          </Link>
          <CardDescription>
            {new Date(session.created_at || "").toLocaleString()}
          </CardDescription>
        </CardHeader>
      </CardContent>
    </Card>
  ));

  return (
    <div className="flex flex-col space-y-4 p-4">
      <h2 className="text-3xl font-bold text-gray-800">Sessions</h2>
      <div className="flex flex-col space-y-2">{sessionsList}</div>
    </div>
  );
};

export default page;
