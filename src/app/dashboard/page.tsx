"use client";

import { useUser } from "@/contexts/authContext";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import StatsCard from "@/components/ui/dashboard/StatsCard";
import RecentSessions from "@/components/ui/dashboard/RecentSessions";
import { Clock, Activity, FileText, Zap, Speech } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import db from "@/supabase/db";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/lib/utils";

const Dashboard = () => {
  const { user } = useUser();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSessions: 0,
    recentSessions: 0,
    totalNotes: 0,
    totalRecordings: 0,
    sessionsGrowth: { rate: 0, isPositive: true },
    recordingsGrowth: { rate: 0, isPositive: true },
  });

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Fetch dashboard statistics
  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      setLoading(true);
      try {
        // Fetch all stats in parallel
        const [
          sessionsCount,
          recentSessionsCount,
          notesCount,
          recordingsCount,
          sessionsGrowth,
          recordingsGrowth,
        ] = await Promise.all([
          db.getSessionsCount(user.id),
          db.getRecentSessionsCount(user.id, 7), // Sessions from last 7 days
          db.getNotesCount(user.id),
          db.getRecordingsCount(user.id),
          db.getSessionsGrowthRate(user.id),
          db.getRecordingsGrowthRate(user.id),
        ]);

        setStats({
          totalSessions: sessionsCount.count || 0,
          recentSessions: recentSessionsCount.count || 0,
          totalNotes: notesCount.count || 0,
          totalRecordings: recordingsCount.count || 0,
          sessionsGrowth: {
            rate: sessionsGrowth.rate || 0,
            isPositive: sessionsGrowth.isPositive,
          },
          recordingsGrowth: {
            rate: recordingsGrowth.rate || 0,
            isPositive: recordingsGrowth.isPositive,
          },
        });
      } catch (error: any) {
        console.error("Error fetching dashboard stats:", error);
        toast("error", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  const formattedDate = format(currentTime, "EEEE, MMMM do, yyyy");
  const formattedTime = format(currentTime, "h:mm a");

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-bold text-gray-800">
          Hi {user?.user_metadata?.full_name?.split(" ")[0] ?? "___"}, Welcome
          back👋
        </h1>
        <p className="text-gray-600">
          {formattedDate} | {formattedTime}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          <>
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </>
        ) : (
          <>
            <StatsCard
              title="Total Sessions"
              value={stats.totalSessions}
              icon={<Activity className="h-4 w-4" />}
              description="Your debugging activity"
              trend={
                stats.sessionsGrowth.rate > 0
                  ? {
                      value: stats.sessionsGrowth.rate,
                      isPositive: stats.sessionsGrowth.isPositive,
                    }
                  : undefined
              }
            />
            <StatsCard
              title="Recent Activity"
              value={stats.recentSessions}
              icon={<Clock className="h-4 w-4" />}
              description="Sessions this week"
            />
            <StatsCard
              title="Notes Created"
              value={stats.totalNotes}
              icon={<FileText className="h-4 w-4" />}
              description="Across all sessions"
            />
            <StatsCard
              title="Total Recordings"
              value={stats.totalRecordings}
              icon={<Speech className="h-4 w-4" />}
              description="Across all sessions"
              trend={
                stats.recordingsGrowth.rate > 0
                  ? {
                      value: stats.recordingsGrowth.rate,
                      isPositive: stats.recordingsGrowth.isPositive,
                    }
                  : undefined
              }
            />
          </>
        )}
      </div>

      {/* Recent Sessions */}
      <div className="mt-4">
        <RecentSessions />
      </div>

      {/* Quick Actions
      <div className="mt-4">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/dashboard/sessions/new">
                  New Debugging Session
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard/notes">View All Notes</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
};

export default Dashboard;
