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
      <div>
        <Header />
        <div className="flex">
          <Sidebar />

          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </AuthProvider>
  );
};

export default DashboardLayout;
