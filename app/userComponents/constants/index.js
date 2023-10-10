import {
  DashboardIconLight,
  SettingsIconLight,
  ProfileIconLight,
  SecurityIconLight,
  LogOutIconLight,
} from "@/components/utils/icons/SidebarIcons";

export const userNavigation = [
  {
    route: "/dashboard",
    label: "Dashboard",
    iconLight: <DashboardIconLight />,
  },
  {
    route: "/settings",
    label: "Settings",
    iconLight: <SettingsIconLight />,
  },
  {
    route: "/profile",
    label: "Profile",
    iconLight: <ProfileIconLight />,
  },
  {
    route: "/security",
    label: "Security",
    iconLight: <SecurityIconLight />,
  },
];

export const logOut = {
  route: "/",
  label: "Log out",
  iconLight: <LogOutIconLight />,
};
