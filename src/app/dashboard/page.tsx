"use client";

import { useAuth } from "@/contexts/authContext";
import React from "react";

const dashboard = () => {
  const { user } = useAuth();

  console.log(user?.user_metadata);

  return (
    <div className="flex flex-col gap-y-2">
      <h1 className="text-2xl font-bold text-gray-800">
        Hi {user?.user_metadata.full_name.split(" ")[0]}, Welcome back👋{" "}
      </h1>
    </div>
  );
};

export default dashboard;
