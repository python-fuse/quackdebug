"use client";

import Header from "@/components/ui/dashboard/Header";
import Sidebar from "@/components/ui/dashboard/Sidebar";
import { AuthProvider } from "@/contexts/authContext";
import useAuth from "@/hooks/useAuth";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  useAuth();

  return (
    <AuthProvider>
      <div className="max-h-screen">
        <Header />
        <div className="flex h-[calc(100dvh-66.8px)]">
          <Sidebar />

          <main className="flex-1 p-4  overflow-y-auto">{children}</main>
        </div>
      </div>
    </AuthProvider>
  );
};

export default DashboardLayout;
