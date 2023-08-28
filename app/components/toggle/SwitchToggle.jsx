"use client";
import React, { useState } from "react";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";


export default function SwitchToggle({ theme, onChange }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    const newClick = !clicked
    setClicked(newClick)
    onChange(newClick)
  }
  return (
    <Switch
      defaultSelected
      size="sm"
      color="secondary"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
      onChange={handleClick}
    >
      {theme}
    </Switch>
  );
}
