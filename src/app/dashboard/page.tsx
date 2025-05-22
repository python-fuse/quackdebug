"use client";

import { useUser } from "@/contexts/authContext";
import React from "react";

const dashboard = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-y-2">
      <h1 className="text-2xl font-bold text-gray-800">
        Hi {user?.user_metadata.full_name.split(" ")[0] ?? "___ "}, Welcome
        back👋{" "}
      </h1>
    </div>
  );
};

export default dashboard;
