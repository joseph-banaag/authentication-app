"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { AppearanceIcon } from "@/components/utils/icons/SettingsIcon";
import { MoonIcon } from "@/components/utils/icons/MoonIcon";
import { SunIcon } from "@/components/utils/icons/SunIcon";

export default function Settings(): React.JSX.Element | null {
  const { theme, setTheme } = useTheme();
  const [client, setClient] = useState<boolean>(false);

  useEffect(() => {
    setClient(true);
  }, []);

  const changeThemeToLight = () => {
    setTheme("light");
  };

  const changeThemeToDark = () => {
    setTheme("dark");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "backIn", duration: 0.5 }}
        className="pageContainer"
      >
        <div className="flex flex-col gap-2">
          <Card className="cardContainer" shadow="md">
            <div className="cardHeadingContainer">
              <AppearanceIcon className="cardIconStyle" />
              <h1 className="textHeadingResponsive">Appearance</h1>
            </div>
          </Card>

          <div className="cardContentWrapper">
            <h1 className="textHeading2Responsive ">Change Theme</h1>

            <div className="flex flex-col gap-2">
              <Button
                onClick={changeThemeToDark}
                size="sm"
                variant="light"
                className="border border-default/80 bg-default text-sm font-medium  shadow-xl tracking-normal text-foreground/80 transform hover:scale-105 transition-all duration-300 w-[90px] cursor-pointer flex justify-center items-center"
              >
                Dark
                <MoonIcon className="!w-[16px] !h-[16px] flex justify-center items-center textColor" />
              </Button>

              <Button
                onClick={changeThemeToLight}
                size="sm"
                variant="light"
                className="border border-default/80 bg-default text-sm font-medium shadow-xl tracking-normal text-foreground/80 transform hover:scale-105 transition-all duration-300 w-[90px] cursor-pointer flex justify-center items-center"
              >
                Light
                <SunIcon className="!w-[16px] !h-[16px] flex justify-center items-center textColor" />
              </Button>

              <div className="flex gap-3">
                <h2 className="capitalize smallTextColor">Current theme:</h2>
                <div className="capitalize smallTextColor flex justify-center items-center underline underline-offset-4">
                  {client ? theme : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
