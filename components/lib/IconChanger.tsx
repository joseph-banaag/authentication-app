"use client"

import React from 'react'
import { useTheme } from "next-themes";
import GithubDark from "./iconOptions/githubDark";
import GithubLight from "./iconOptions/githubLight";

export default function IconChanger() {
  const currentTheme = localStorage.getItem("theme")
  console.log(currentTheme)

  // if React.ReactNode is not present the code will be unreachable
  const determineIcon = (): React.ReactNode => {
    if (currentTheme === "dark") {
      return (
        <GithubDark />
      );
    } else if (currentTheme === "light") {
      return <GithubLight />;
    } else {
      return <GithubDark />;
    }
  };

  console.log(useTheme().theme)
  console.log(localStorage.getItem("theme"))

  return (
    <>
      {determineIcon()}
    </>
  )
}
