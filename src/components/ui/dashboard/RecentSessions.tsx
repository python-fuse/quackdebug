"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DebugSession } from "@/lib/definitions";
import db from "@/supabase/db";
import { useUser } from "@/contexts/authContext";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const RecentSessions = () => {
  const [sessions, setSessions] = useState<DebugSession[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchSessions = async () => {
      if (!user) return;

      setLoading(true);
      const { data, error } = await db.getSessions(user.id);

      if (error) {
        console.error("Error fetching sessions:", error);
      } else {
        setSessions(data.slice(0, 5)); // Get only the 5 most recent sessions
      }

      setLoading(false);
    };

    fetchSessions();
  }, [user]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : sessions.length > 0 ? (
          <div className="space-y-2">
            {sessions.map((session) => (
              <Link
                href={`/dashboard/sessions/${session.id}`}
                key={session.id}
                className="block"
              >
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md transition-colors">
                  <div>
                    <h3 className="font-medium">{session.title}</h3>
                    <p className="text-sm text-gray-500">
                      {session.created_at &&
                        formatDistanceToNow(new Date(session.created_at), {
                          addSuffix: true,
                        })}
                    </p>
                  </div>
                  <div className="text-sm text-blue-500">View →</div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            No sessions found. Create your first debugging session!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentSessions;
