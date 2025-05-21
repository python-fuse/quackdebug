import Header from "@/components/ui/dashboard/Header";
import Sidebar from "@/components/ui/dashboard/Sidebar";
import { AuthProvider } from "@/contexts/authContext";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <div>
        <Header />
        <div className="flex">
          <Sidebar />

          <main className="flex-1 px-5 py-8">{children}</main>
        </div>
      </div>
    </AuthProvider>
  );
};

export default layout;
