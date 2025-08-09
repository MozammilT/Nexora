"use client";
import React, { useState } from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "../components/ui/sidebar.jsx";
import {
  House,
  SquarePen,
  Hash,
  Image,
  Eraser,
  Scissors,
  FileText,
  Users,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useUser, useClerk, SignIn, Protect } from "@clerk/clerk-react";

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const [creations, setCreations] = useState([]);
  const [blogCount, setBlogCount] = useState(0);

  const links = [
    {
      label: "Dashboard",
      path: "/ai",
      icon: (
        <House className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Write Articles",
      path: "/ai/write-article",
      icon: (
        <SquarePen className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Blog Titles",
      path: "/ai/blog-title",
      icon: (
        <Hash className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Generate Images",
      path: "/ai/generate-images",
      icon: (
        <Image className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Remove Background",
      path: "/ai/remove-background",
      icon: (
        <Eraser className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Remove Object",
      path: "/ai/remove-object",
      icon: (
        <Scissors className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Review Resume",
      path: "/ai/review-resume",
      icon: (
        <FileText className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Community",
      path: "/ai/community",
      icon: (
        <Users className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return user ? (
    <div
      className={cn(
        "mx-auto flex w-full max-w-screen flex-1 flex-col overflow-hidden border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <img
              src={user?.imageUrl}
              alt="User"
              className="w-13 rounded-full mx-auto mt-5"
            />
            <p className="text-white text-xl tracking-tighter text-balance mx-auto mt-5">
              {user?.fullName}
            </p>
            <div className="mt-8 flex flex-col gap-2 cursor-pointer">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  onClick={() => setOpen(!open)}
                  isActive={location.pathname === link.path}
                />
              ))}
            </div>
          </div>
          <div className="w-full border-t border-gray-400 p-4 px-4 flex items-center justify-between">
            <div onClick={openUserProfile} className="cursor-pointer">
              <div>
                <p className="text-sm text-gray-300">{user?.fullName}</p>
                <div className="text-xs text-neutral-400 flex gap-0.5">
                  <Protect plan="premium" fallback="Free">
                    Premium
                  </Protect>
                  <p>Plan</p>
                </div>
              </div>
            </div>
            <House
              className="h-5 w-5 shrink-0 text-neutral-200 hover:text-neutral-500 cursor-pointer"
              onClick={() => navigate("/")}
            />
            <LogOut
              className="h-5 w-5 shrink-0 text-neutral-200 hover:text-neutral-500 cursor-pointer"
              onClick={signOut}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div
        className={`flex flex-1 flex-col bg-black border-l min-h-screen overflow-y-auto`}
      >
        <Outlet
          context={{ creations, setCreations, blogCount, setBlogCount }}
        />
      </div>
    </div>
  ) : (
    <div className="relative flex h-screen w-full items-center justify-center bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black"></div>
      <SignIn fallbackRedirectUrl="http://localhost:5173/ai" />
    </div>
  );
}