import { Avatar } from "@nextui-org/react";
import React from "react";

const ProfileAvatar = (): React.ReactNode => {
  const image =
    "https://i.pinimg.com/280x280_RS/8e/dd/1e/8edd1e070a3382921de5829e58923704.jpg";

  return (
    <>
      <Avatar
        showFallback
        radius="full"
        isFocusable
        src={image}
        className="cursor-pointer sm:w-9 w-7 sm:h-9 h-7"
      />
    </>
  );
};

export default ProfileAvatar;
