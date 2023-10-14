"use client"
import React from "react";
import { motion } from "framer-motion"
import {
  Card,
  Button,
  Avatar
} from "@nextui-org/react";
import { ProfileIconLight } from "@/components/utils/icons/SettingsIcon"
import ProfileAvatar from "@/components/utils/profileModal/ProfileAvatar";
import { UserProfilePlaceholder } from "@/components/utils/icons/UserProfilePlaceholder"
import { EditIcon } from "@/components/utils/icons/UpdateBtns";
import Image from "next/image";


export default function Profile() {

  const image = "https://i.pinimg.com/280x280_RS/8e/dd/1e/8edd1e070a3382921de5829e58923704.jpg"

  const username = "joshua_Miguel_23"

  const handledUpdateProfile = () => {
    console.log("Profile photo updated successfully!")
  }

  const handledUpdateUserInfo = () => {
    console.log("UserInfo updated successfully!")
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "backIn", duration: .5 }}
        className="pageContainer"
      >
        <div className="flex flex-col gap-2">
          <Card
            className="cardContainer"
            shadow="md"
          >
            <div className="cardHeadingContainer">
              <ProfileIconLight className="cardIconStyle" />
              <h1 className="textHeadingResponsive">
                Profile
              </h1>
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

                <h1 className="textHeadingResponsive py-10 flex justify-center items-center text-center flex-wrap flex-1">Welcome, {username}</h1>
              </div>

              <div className="profileUpdateInfoWrapper">

                <div className="profileUpdateInfoContentWrapper sm:flex-row">
                  <div className="profileUpdateImageContainer">
                    <UserProfilePlaceholder className="profileUpdateImagePlaceholder" />
                    <div
                      onClick={handledUpdateProfile}
                      className="profileUpdateImageUploadBtn">
                      <EditIcon className="w-[24px] h-[24px] shadow-md" />
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
                          height: "auto"
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
                          height: "auto"
                        }}
                      />
                    </div>
                    <h1 className="textHeading2Responsive text-center">
                      Update your profile photo
                    </h1>
                  </div>
                </div>

                <div className="profileUpdateInfoContentWrapper laptopL:flex-row">
                  <div className="w-full flex flex-row">
                    <ul className="w-full border border-foreground/30 rounded-md p-0 ">

                      <li className="px-2 py-3 grid grid-cols-2">
                        <div className="text-xs font-medium tracking-wide textColor flex justify-start items-center">
                          Username:
                        </div>
                        <div className="text-sm text-foreground/90">
                          Username:
                        </div>
                      </li>
                      <div className="w-full flex justify-end">
                        <hr className="w-[95%] border-foreground/30" />
                      </div>

                      <li className="px-2 py-3 grid grid-cols-2">
                        <div className="text-xs font-medium tracking-wide textColor flex justify-start items-center">
                          Email:
                        </div>
                        <div className="text-sm text-foreground/90">
                          Email:
                        </div>
                      </li>
                      <div className="w-full flex justify-end">
                        <hr className="w-[95%] border-foreground/30" />
                      </div>

                      <li className="px-2 py-3 grid grid-cols-2">
                        <div className="text-xs font-medium tracking-wide textColor flex justify-start items-center">
                          Password:
                        </div>
                        <div className="text-sm text-foreground/90">
                          **************
                          {/* 
                        //TODO: get the length of the password and convert it to asterisk ****
                        */}
                        </div>
                      </li>
                      <div className="w-full flex justify-end">
                        <hr className="w-[95%] border-foreground/30" />
                      </div>

                      <li className="px-2 py-3 grid grid-cols-2">
                        <div className="text-xs font-medium tracking-wide textColor flex justify-start items-center">
                          Created on:
                        </div>
                        <div className="text-sm text-foreground/90">
                          Created on:
                        </div>
                      </li>
                    </ul>
                    <div className="flex justify-center items-center px-1">
                      <div
                        onClick={handledUpdateUserInfo}
                        className="profileUpdateInfoBtn">
                        <EditIcon className="w-[24px] h-[24px] shadow-md" />
                      </div>
                    </div>
                  </div>
                  <div className="profileUpdateContentDesignContainer">
                    <div className="laptopL:flex hidden justify-center items-center ">
                      <Image
                        alt="Update profile image"
                        src="/assets/settingsIcon/profileUpdate.png"
                        width={120}
                        height={120}
                        style={{
                          objectFit: "contain",
                          width: "auto",
                          height: "auto"
                        }}
                      />
                    </div>
                    <div className="laptopL:hidden flex justify-center items-center">
                      <Image
                        priority
                        alt="Update profile image"
                        src="/assets/settingsIcon/profileUpdateL.png"
                        width={200}
                        height={200}
                        style={{
                          objectFit: "contain",
                          width: "auto",
                          height: "auto"
                        }}
                      />
                    </div>
                    <h1 className="textHeading2Responsive text-center">
                      Update your info
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </motion.div>
    </>
  )
}
