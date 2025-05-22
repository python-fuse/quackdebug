import React, { ReactNode } from "react";
import DashboardLayout from "../../components/ui/dashboard/DashboardLayout";

const layout = ({ children }: { children: ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default layout;
