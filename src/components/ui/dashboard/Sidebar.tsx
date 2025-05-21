"use client";

import React from "react";
import { Button } from "../button";
import { LogOut, Plus } from "lucide-react";
import SidebarItems from "./SidebarItems";

const Sidebar = () => {
  return (
    <aside className="w-1/6 h-[calc(100dvh-66.8px)] p-4 overflow-y-auto border-r flex flex-col space-y-4">
      {/* New Session */}
      <Button variant={"outline"}>
        <Plus size={20} /> New Session
      </Button>

      {/* Current pages and other links */}
      <SidebarItems />
      {/* Recent projects */}

      {/* Logout */}
      <Button variant={"destructive"} className="mt-auto">
        <LogOut size={20} /> Logout
      </Button>
    </aside>
  );
};

export default Sidebar;
