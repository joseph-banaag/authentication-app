"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, Avatar } from "@nextui-org/react";
import { ProfileIconLight } from "@/components/utils/icons/SettingsIcon";
import { UserProfilePlaceholder } from "@/components/utils/icons/UserProfilePlaceholder";
import { EditIcon } from "@/components/utils/icons/UpdateBtns";
import Image from "next/image";
import UserInfoCard from "@/app/(userInfo)/(dashboard)/profile/components/UserInfoCard";
import UserInfoUpdateModal from "@/app/(userInfo)/(dashboard)/profile/components/UserInfoUpdateModal";
import { useModalContext } from "@/app/context/ModalContext";
import { deleteToken } from "@/app/actions/deleteToken";

export default function Profile(): React.JSX.Element | null {
  const [mounted, setMounted] = useState(false);
  const { updateUserInfo, setUpdateUserInfo } = useModalContext();
  const StoredUsername = {
    data:
      typeof window !== "undefined"
        ? sessionStorage.getItem("session_name")
        : null,
  };

  const username = StoredUsername.data;

  useEffect(() => {
    setMounted(true);
    const getUser = async () => {
      const response = await fetch(
        `http://localhost:3000/api/authed-user?q=${username}`,
        {
          cache: "force-cache",
        },
      );
      const data = await response.json();
      const verified = data?.user;
      const verified_user = verified?.username;

      if (!response.ok) {
        if (username !== verified_user) {
          deleteToken();
          setTimeout(() => {
            location.reload();
          }, 1000);
        }
      }
    };
    getUser();
  }, [username, setMounted]);

  if (!mounted) {
    return null;
  }

  const image =
    "https://i.pinimg.com/280x280_RS/8e/dd/1e/8edd1e070a3382921de5829e58923704.jpg";

  const handledUpdateProfile = () => {
    console.log("Profile photo updated successfully!");
  };

  return (
    <>
      <div
        onClick={() => setUpdateUserInfo(false)}
        className={`profileModalOverlay  ${
          updateUserInfo ? "block" : "hidden"
        }`}
      />
      <div className={`z-[100]  ${updateUserInfo ? "block" : "hidden"}`}>
        <UserInfoUpdateModal />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "backIn", duration: 0.5 }}
        className="pageContainer"
      >
        <div className="flex flex-col gap-2">
          <Card className="cardContainer" shadow="sm">
            <div className="cardHeadingContainer">
              <ProfileIconLight className="cardIconStyle" />
              <h1 className="textHeadingResponsive">Profile</h1>
            </div>
          </Card>
          <div className="cardContentWrapper py-10 ">
            <div className="items-center ">
              <div className="flex flex-col justify-center items-center">
                <Avatar
                  showFallback
                  radius="full"
                  isFocusable
                  src={image}
                  className="cursor-pointer w-[120px] h-[120px]"
                />

                <h1 className="textHeadingResponsive py-10 flex justify-center items-center text-center flex-wrap flex-1">
                  Welcome, {username}
                </h1>
              </div>

              <div className="profileUpdateInfoWrapper">
                <div className="profileUpdateInfoContentWrapper sm:flex-row">
                  <div className="profileUpdateImageContainer">
                    <UserProfilePlaceholder className="profileUpdateImagePlaceholder" />
                    <div
                      onClick={handledUpdateProfile}
                      className="profileUpdateImageUploadBtn"
                    >
                      <EditIcon className="profileUpdateEditIcon" />
                    </div>
                  </div>

                  <div className="profileUpdateContentDesignContainer">
                    <div className="lg:flex hidden justify-center items-center">
                      <Image
                        alt="Update profile image"
                        src="/assets/settingsIcon/customization.png"
                        width={90}
                        height={90}
                        style={{
                          objectFit: "contain",
                          width: "auto",
                          height: "auto",
                        }}
                      />
                    </div>
                    <div className="lg:hidden flex justify-center items-center">
                      <Image
                        priority
                        alt="Update profile image"
                        src="/assets/settingsIcon/accPersonalization.png"
                        width={200}
                        height={200}
                        style={{
                          objectFit: "contain",
                          width: "auto",
                          height: "auto",
                        }}
                      />
                    </div>
                    <h1 className="textHeading2Responsive text-center">
                      Update your profile photo
                    </h1>
                  </div>
                </div>

                <UserInfoCard />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
