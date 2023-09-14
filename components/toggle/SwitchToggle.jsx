"use client";
import React, { useState } from "react";
import { MoonIcon } from "../utils/icons/MoonIcon";
import { SunIcon } from "../utils/icons/SunIcon";
import { MySwitch } from "../utils/tailwindvariants/tv";
import { Tooltip } from "@nextui-org/react";

export default function SwitchToggle({ onChange, themes }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    const newClick = !clicked;
    setClicked(newClick);
    onChange(newClick);
  };

  return (
    <>
      <MySwitch
        size="sm"
        color="secondary"
        startContent={<SunIcon />}
        endContent={<MoonIcon />}
        onChange={handleClick}
        className="group"
      >
        <span class="group-hover:opacity-100 transition-opacity bg-[#C9A9E9] py-1 px-2 text-xs text-black/80 rounded-md absolute left-0 top-0 opacity-0 translate-x-1 -translate-y-3 mx-auto">
          <span className="font-semibold">Theme:</span> {themes}
        </span>
      </MySwitch>
    </>
  );
}
