"use client"

import React from 'react'
import { useTheme } from "next-themes";
import GithubDark from "./iconOptions/githubDark";
import GithubLight from "./iconOptions/githubLight";


export default function IconChanger() {
  const theme = useTheme().theme
  console.log(theme)
  
  // if React.ReactNode is not present the code will be unreachable
  const determineIcon = (): React.ReactNode => {
    if (theme === "dark") {
      return (
        <GithubDark />
      );
    } else if (theme === "light") {
      return <GithubLight />;
    } else {
      return <GithubDark />;
    }
  };

  return (
    <>
      {determineIcon()}
    </>
  )
}
