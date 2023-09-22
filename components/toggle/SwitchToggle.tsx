"use client";
import React, { ChangeEvent, useState } from "react";
import { MoonIcon } from "../utils/icons/MoonIcon";
import { SunIcon } from "../utils/icons/SunIcon";
import { MySwitch } from "../utils/tailwindvariants/tv";

interface Props {
  onChange: React.ChangeEvent<HTMLInputElement>
}

export default function SwitchToggle({ onChange }: { onChange: (clicked: boolean) => void }) {
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
      ></MySwitch>
    </>
  );
}
