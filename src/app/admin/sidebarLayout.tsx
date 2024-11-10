"use client";
import { useSideBarStore } from "@/utils/store";

export default function SideBarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { showingSideBar } = useSideBarStore();

  return (
    <div
      className={`container flex flex-col justify-center p-16 gap-16 ${showingSideBar ? "lg:ml-[240px]" : ""
        }`}
    >
      {children}
    </div>
  );
}
