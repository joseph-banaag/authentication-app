import {
  DashboardIconLight,
  SettingsIconLight,
  ProfileIconLight,
  SecurityIconLight,
  LogOutIconLight,
  DashboardIconDark,
  SettingsIconDark,
  ProfileIconDark,
  SecurityIconDark,
  LogOutIconDark,
} from "@/components/utils/icons/SidebarIcons";

export const userNavigation = [
  {
    route: "/dashboard",
    label: "Dashboard",
    // icon: "/assets/sidebarIcons/dashboard.svg",
    iconLight: <DashboardIconLight />,
    iconDark: <DashboardIconDark />,
  },
  {
    route: "/settings",
    label: "Settings",
    // icon: "/assets/sidebarIcons/settings.svg",
    iconLight: <SettingsIconLight />,
    iconDark: <SettingsIconDark />,
  },
  {
    route: "/profile",
    label: "Profile",
    // icon: "/assets/sidebarIcons/profile.svg",
    iconLight: <ProfileIconLight />,
    iconDark: <ProfileIconDark />,
  },
  {
    route: "/security",
    label: "Security",
    // icon: "/assets/sidebarIcons/security.svg",
    iconLight: <SecurityIconLight />,
    iconDark: <SecurityIconDark />,
  },
];

export const logOut = {
  route: "/",
  label: "Log out",
  iconLight: <LogOutIconLight />,
  iconDark: <LogOutIconDark />,
};
