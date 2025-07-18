"use client";

import { usePathname } from "next/navigation";
import { FileChartColumn, HomeIcon, LogOutIcon, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();

  const menus: { link: string; title: string; Icon: React.ElementType }[] = [
    {
      link: "/",
      title: "หน้าหลัก",
      Icon: HomeIcon,
    },
    {
      link: "/dashboard",
      title: "ยื่นขอวิจัย",
      Icon: FileChartColumn,
    },
    {
      link: "/user",
      title: "person",
      Icon: UserRound,
    },
  ];
  return (
    <header className="w-fit h-screen bg-red-600 p-4 flex flex-col justify-between">
      <ul className="flex flex-col space-y-2 justify-center items-center">
        {menus.map(({ title, link, Icon }) => (
          <li
            key={title}
            className={cn("rounded-md cursor-pointer hover:bg-red-400 p-1", {
              "bg-red-400": pathname === link,
            })}
          >
            <Link href={link}>
              <Icon className="text-white w-8 h-8" />
            </Link>
          </li>
        ))}
      </ul>
      <div
        className={cn("rounded-md cursor-pointer hover:bg-red-400 p-1")}
      >
        <Link href={'/logout'}>
          <LogOutIcon className="text-white w-8 h-8" />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
