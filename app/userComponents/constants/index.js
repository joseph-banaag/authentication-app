import {
  DashboardIcon,
  SettingsIcon,
  ProfileIcon,
  SecurityIcon,
  LogOutIcon,
} from "@/components/utils/icons/SidebarIcons";

export const userNavigation = [
  {
    route: "/dashboard",
    label: "Dashboard",
    // icon: "/assets/sidebarIcons/dashboard.svg",
    icon: <DashboardIcon />,
  },
  {
    route: "/settings",
    label: "Settings",
    // icon: "/assets/sidebarIcons/settings.svg",
    icon: <SettingsIcon />,
  },
  {
    route: "/profile",
    label: "Profile",
    // icon: "/assets/sidebarIcons/profile.svg",
    icon: <ProfileIcon />,
  },
  {
    route: "/security",
    label: "Security",
    // icon: "/assets/sidebarIcons/security.svg",
    icon: <SecurityIcon />,
  },
];

export const logOut = {
  route: "/",
  label: "Log out",
  icon: <LogOutIcon />,
};
