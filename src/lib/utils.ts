"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SidebarLink } from "./definitions";
import { Home, Speech } from "lucide-react";
import { toast as Toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const routes: SidebarLink[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },

  {
    title: "Sessions",
    href: "/dashboard/sessions",
    icon: Speech,
  },
];

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const toast = (status: "success" | "error", message: string) => {
  switch (status) {
    case "error":
      Toast.error(message);
      break;

    default:
      Toast.success(message);
  }
};
