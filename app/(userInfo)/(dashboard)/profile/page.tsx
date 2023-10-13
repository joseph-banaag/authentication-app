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
          <div className="cardContentWrapper py-10">
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

              <div className="lg:grid lg:grid-cols-2 flex flex-col gap-1">

                <div className="border border-foreground/80 rounded-lg px-3 py-8 flex sm:flex-row flex-col mobileL:gap-4 justify-center items-center gap-6 relative">
                  <div className="border-2 border-foreground/80 rounded-full flex justify-center items-center relative">
                    <UserProfilePlaceholder className="lg:w-[150px] lg:h-[150px] md:w-[130px] md:h-[130px] w-[100px] h-[100px] text-foreground/80" />
                    <div
                      onClick={handledUpdateProfile}
                      className="absolute right-[50%] translate-x-[50%] bottom-1 bg-default rounded-full p-1 transform hover:scale-105 hover:bg-default/50 transition-all duration-300 cursor-pointer">
                      <EditIcon className="w-[24px] h-[24px]" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-3">
                    <div className="lg:flex hidden justify-center items-center">
                      <Image
                        alt="Update profile image"
                        src="/assets/settingsIcon/customization.png"
                        width={90}
                        height={90}
                        objectFit="contain"
                      />
                    </div>
                    <div className="lg:hidden flex">
                      <Image
                        alt="Update profile image"
                        src="/assets/settingsIcon/accPersonalization.png"
                        width={200}
                        height={200}
                        objectFit="contain"
                      />
                    </div>
                    <h1 className="textHeading2Responsive text-center">
                      Update your profile photo
                    </h1>
                  </div>

                </div>

                <div className="border border-foreground/80 rounded-lg px-3 py-8 flex lg:flex-row flex-col justify-center items-center gap-3 relative">
                  <div className="w-1/2 border">
                    <ul className="flex flex-col gap-2">
                      <li>
                        Username:
                      </li>
                      <li>
                        Email:
                      </li>
                      <li>
                        Password:
                      </li>
                      <li>
                        Created on:
                      </li>
                    </ul>
                  </div>

                  <div className="w-1/2 border">
                    <div>image1</div>
                    <div>image2</div>
                    <h2 className="tracking-wide text-foreground/90 font-medium text-lg drop-shadow-md text-center">
                      Update your account information
                    </h2>
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
