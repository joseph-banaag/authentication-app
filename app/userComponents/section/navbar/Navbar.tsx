"use client";
import * as React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Button,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { userNavigation } from "@/app/userComponents/constants/index";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon } from "@/components/utils/icons/SunIcon";
import { MoonIcon } from "@/components/utils/icons/MoonIcon";
import BrandLogo from "@/app/userComponents/section/components/BrandLogo";
import { useModalContext } from "@/app/context/ModalContext";
import ProfileModal from "@/app/userComponents/section/navbar/components/ProfileModal";
import ProfileAvatar from "@/app/userComponents/section/navbar/components/ProfileAvatar";
import { deleteToken } from "@/app/actions/deleteToken";
import { session_name } from "@/app/actions/verified";

export default function Topbar(): React.ReactNode {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [userName, setUserName] = useState<string>("");
  const [eMail, setEMail] = useState<string>("");
  const [client, setClient] = useState<boolean>(false);
  const { displayOn, setDisplayOn } = useModalContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setClient(true);
    const getUser = async () => {
      const response = await fetch(
        `http://localhost:3000/api/users?q=${session_name}`,
        {
          cache: "force-cache",
          method: "GET",
        },
      );

      const data = await response.json();
      const username = data?.username;
      const email = data?.email;

      setUserName(username);
      setEMail(email);
      return data;
    };
    getUser();
  }, []);

  const changeThemeDark = () => {
    setTheme("dark");
    setIsOpen(false);
  };

  const changeThemeLight = () => {
    setTheme("light");
    setIsOpen(false);
  };

  const handledLogout = () => {
    deleteToken();
    setTimeout(() => {
      location.reload();
    }, 1000);
  };
  return (
    <>
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed w-full h-screen z-[48] ${isOpen ? "block" : "hidden"}
        `}
      />
      <div
        onClick={() => setDisplayOn(false)}
        className={`profileModalOverlay 
      ${displayOn ? "block" : "hidden"}`}
      />
      <div className={`${displayOn ? "block z-50" : "fadeOut hidden"}`}>
        <ProfileModal />
      </div>
      <Navbar shouldHideOnScroll className="navbarContainer">
        <NavbarContent justify="start" className="flex justify-start">
          <NavbarBrand className="navbarBrand">
            <BrandLogo />
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="end" className="flex justify-end">
          <NavbarItem className="flex justify-start items-center gap-2">
            <div onClick={() => setDisplayOn(!displayOn)}>
              <ProfileAvatar />
            </div>
            <Dropdown
              showArrow
              classNames={{
                base: "navDropdownBase",
                arrow: "bg-background",
              }}
              className="navDropdownContainer"
            >
              <DropdownTrigger>
                <div
                  onClick={() => setIsOpen(true)}
                  className={`navDropdownTriggerContainer ${
                    isOpen ? "open" : ""
                  }`}
                >
                  <div className="menuBar" />
                  <div className="menuBar" />
                  <div className="menuBar" />
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Dropdown section for signed in user">
                <DropdownSection
                  title="Signed in as:"
                  className="textBaseColor border-small border-foreground/20 p-1 rounded-md"
                >
                  <DropdownItem
                    key="profile"
                    textValue="Currently logged in user"
                    className="border-none bg-default dark:bg-default/50"
                    isReadOnly
                  >
                    <div className="flex justify-center items-center p-1 fadeIn">
                      <ProfileAvatar />
                      <div className="ms-2 max-w-[120px]">
                        <p className="text-sm font-bold truncate">{userName}</p>
                        <div className="overflow-hidden">
                          <p className="text-xs font-thin dark:text-foreground/80 animate-scrolling-text">
                            {eMail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection showDivider aria-label="Dropdown menu list">
                  {userNavigation.map((items) => {
                    const isActive = pathname === items.route;
                    return (
                      <DropdownItem
                        key={items.label}
                        textValue="Dropdown menu items"
                        className="my-1"
                      >
                        <Button
                          as={Link}
                          size="sm"
                          variant="light"
                          href={items.route}
                          className={`${isActive && "isActiveStyle"} linkItems`}
                        >
                          <p
                            className={
                              isActive
                                ? "text-foreground/90"
                                : "text-foreground/60"
                            }
                          >
                            {items.iconLight}
                          </p>
                          {items.label}
                        </Button>
                      </DropdownItem>
                    );
                  })}
                </DropdownSection>
                <DropdownSection
                  showDivider
                  aria-label="Dropdown section for current theme indicator and themes option"
                >
                  <DropdownItem
                    textValue="Dropdown current theme"
                    isReadOnly
                    variant="bordered"
                    endContent={
                      <p className="themeIndicator">{client ? theme : ""}</p>
                    }
                    className="themeIndicatorContainer"
                  >
                    <p
                      className="text-sm font-semibold drop-shadow-md"
                      color="foreground"
                    >
                      Theme
                    </p>
                  </DropdownItem>
                  <DropdownItem
                    textValue="Dropdown dark theme option"
                    variant="bordered"
                    className="hover:bg-transparent border-none cursor-default"
                  >
                    <Chip
                      onClick={() => changeThemeDark()}
                      endContent={<MoonIcon className="!text-white" />}
                      variant="solid"
                      size="sm"
                      classNames={{
                        base: "bg-orange-700 hover:bg-orange-700/70 transition-all duration-300",
                      }}
                      className="cursor-pointer flex flex-1 justify-center items-center w-full"
                    >
                      <p className="text-white font-semibold text-xs mb-[2px]">
                        Dark
                      </p>
                    </Chip>
                  </DropdownItem>
                  <DropdownItem
                    textValue="Dropdown light theme option"
                    variant="bordered"
                    className="hover:bg-transparent border-none cursor-default"
                  >
                    <Chip
                      onClick={() => changeThemeLight()}
                      endContent={<SunIcon className="!text-white" />}
                      variant="solid"
                      size="sm"
                      classNames={{
                        base: "bg-orange-700 hover:bg-orange-500 transition-all duration-300",
                      }}
                      className="cursor-pointer flex flex-1 justify-center items-center"
                    >
                      <p className="text-white font-semibold text-xs mb-[2px]">
                        Light
                      </p>
                    </Chip>
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection title="Danger zone" className="textBaseColor">
                  <DropdownItem
                    textValue="Dropdown logout button"
                    variant="bordered"
                    className="hover:bg-transparent border-none cursor-default"
                  >
                    <button onClick={() => handledLogout()}>
                      <Chip
                        variant="solid"
                        size="sm"
                        classNames={{
                          base: "bg-red-900",
                        }}
                        className="cursor-pointer flex flex-1 justify-center items-center"
                      >
                        <p className="text-white/90 font-semibold text-xs drop-shadow-md flex justify-center items-center text-center mb-[2px]">
                          Logout
                        </p>
                      </Chip>
                    </button>
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}
