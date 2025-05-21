"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SidebarLink } from "./definitions";
import { Home, Speech } from "lucide-react";

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
