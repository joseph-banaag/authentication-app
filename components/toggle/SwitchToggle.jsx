"use client";
import React, { useState } from "react";
import { MoonIcon } from "../utils/icons/MoonIcon";
import { SunIcon } from "../utils/icons/SunIcon";
import { MySwitch } from "../utils/tailwindvariants/switchtoggle";

export default function SwitchToggle({ theme, onChange }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    const newClick = !clicked;
    setClicked(newClick);
    onChange(newClick);
  };
  return (
    <MySwitch
      defaultSelected
      size="sm"
      color="cyan"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
      onChange={handleClick}
    >
      {theme}
    </MySwitch>
  );
}
