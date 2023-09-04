"use client";
import React, { useState } from "react";
import { MoonIcon } from "../utils/icons/MoonIcon";
import { SunIcon } from "../utils/icons/SunIcon";
import { MySwitch } from "../utils/tailwindvariants/tv";

export default function SwitchToggle({ onChange }) {
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
      color="secondary"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
      onChange={handleClick}
    >
    </MySwitch>
  );
}
