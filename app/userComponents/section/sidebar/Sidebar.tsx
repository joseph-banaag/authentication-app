"use client";
import React, { useEffect, useState } from "react";
import { userNavigation, logOut } from "@/app/userComponents/constants";
import { usePathname } from "next/navigation";
import { Link, Button, Card } from "@nextui-org/react";
import Topbar from "@/app/userComponents/section/navbar/Navbar";
import ProfileAvatar from "../navbar/components/ProfileAvatar";
import { deleteToken } from "@/app/actions/deleteToken";

export default function Sidebar(): React.ReactNode {
  const pathname = usePathname();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const logo = {
    src: "/assets/logo/user_logo.svg",
    name: "Logo",
  };

  const handledLogout = () => {
    deleteToken();
    setTimeout(() => {
      location.reload();
    }, 1000);
  };
  return (
    <>
      <Card className="sidebarContainer">
        <div className="sidebarWrapper">
          <ProfileAvatar />
          <div className="ms-2 max-w-[120px]">
            <p className="text-sm font-bold truncate">{username}</p>
            <div className="overflow-hidden">
              <p className="text-xs font-thin dark: animate-scrolling-text">
                {email}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 w-full">
          <div className="flex flex-1 flex-col gap-4 w-full">
            {userNavigation.map((item) => {
              const isActive = pathname === item.route;
              return (
                <Button
                  as={Link}
                  key={item.label}
                  size="sm"
                  variant="light"
                  href={item.route}
                  className="text-medium w-full flex justify-center items-center  px-3 py-6"
                >
                  <p
                    className={
                      isActive ? "text-foreground/90" : "text-foreground/60"
                    }
                  >
                    {item.iconLight}
                  </p>
                  <p className={`${isActive && "isActiveStyle"} linkItems`}>
                    {item.label}
                  </p>
                </Button>
              );
            })}
          </div>
          <div className="mb-10">
            <Button
              onClick={() => handledLogout()}
              size="sm"
              variant="light"
              className="text-medium w-full flex justify-center items-center px-3 py-6"
            >
              <p className="text-foreground/60">{logOut.iconLight}</p>
              <p className="linkItems">{logOut.label}</p>
            </Button>
          </div>
        </div>
      </Card>

      <div className="sidebarNavContainer !z-[1000]">
        <Topbar />
      </div>
    </>
  );
}
