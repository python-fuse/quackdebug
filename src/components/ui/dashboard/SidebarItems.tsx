import { SidebarLink } from "@/lib/definitions";
import { routes } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarItems = () => {
  const items = routes.map((item) => {
    return <SidebarItem key={item.title} item={item} />;
  });

  return <div className="flex flex-col space-y-2">{items}</div>;
};

// SidebarItem component to render the sidebar links

const SidebarItem = ({ item }: { item: SidebarLink }) => {
  const activePath = usePathname();

  const isActive = activePath === item.href;
  console.log(activePath);

  console.log(isActive);

  return (
    <Link
      key={item.title}
      href={item.href}
      className={`flex items-center py-2 px-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group duration-300 ${
        isActive ? "bg-gray-100 dark:bg-gray-700" : ""
      }`}
    >
      <item.icon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
      <span className="ml-3">{item.title}</span>
    </Link>
  );
};

export default SidebarItems;
