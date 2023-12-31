"use client";
import { useModalContext } from "@/app/context/ModalContext";
import { Avatar, Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import {
  CloseBtn,
  SaveIcon,
  EditIcon,
  ArrowBack,
} from "@/components/utils/icons/UpdateBtns";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { session_name } from "@/app/actions/verified";
import AlertUserModal from "./AlertUserModal";

interface Inputs {
  username: string;
}
const ProfileModalForm = (): React.ReactNode => {
  const { displayOn, setDisplayOn } = useModalContext();
  const [client, setClient] = useState<boolean>(false);
  const [editUser, setEditUser] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [userAlert, setUserAlert] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(
        `http://localhost:3000/api/users?q=${session_name}`,
        {
          cache: "force-cache",
          method: "GET",
        },
      );
      const data = await response.json();
      const username = data?.username;
      if (username === undefined) {
        location.reload();
      }

      setUsername(username);
      return data;
    };
    getUser();
  }, []);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      username: `${username}`,
    },
    criteriaMode: "all",
    mode: "all",
  });

  useEffect(() => {
    setClient(true);
    setFocus("username");
  }, [setFocus]);

  const image =
    "https://i.pinimg.com/280x280_RS/8e/dd/1e/8edd1e070a3382921de5829e58923704.jpg";

  const handleEditProfileImg = () => {
    router.push("/profile");
  };

  const OnSubmit: SubmitHandler<Inputs> = async (data, e) => {
    e?.preventDefault();
    const newUsername = data.username;
    const currentUsername = username;

    const newUsernameLower = newUsername.toLowerCase();

    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newUsernameLower,
          currentUsername,
        }),
      });

      if (!res.ok) {
        throw new Error("Error when updating the username. Please try again.");
      }

      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (error) {
      throw new Error(
        `There was a problem sending the requested data to be updated. Error: ${error}`,
      );
    }
  };

  const UpdateUsername = () => {
    return (
      <>
        <button
          type="button"
          onClick={() => setEditUser(false)}
          className="profileModalFormArrowBack"
        >
          <ArrowBack className="w-4 h-4" />
        </button>
        <form onSubmit={handleSubmit(OnSubmit)} className="flex flex-col px-1">
          <Input
            autoComplete="off"
            aria-autocomplete="none"
            aria-labelledby="username"
            id="username"
            isClearable
            type="text"
            variant="underlined"
            className="!max-w-[200px] flex-1 text-default-100"
            {...register("username", {
              required: true,
              pattern: /[\w!@#$%^&*()-+=<>?/\\,.;:'"[\]{}|]{3,}/gi,
            })}
            name="username"
          />
          <p className="formErrorMessage absolute top-[60px]">
            {errors.username?.types?.pattern && (
              <span>Space is not allowed and at least 3 characters</span>
            )}
          </p>
          <button
            type="submit"
            name="submit"
            className="absolute top-2 right-2"
          >
            <SaveIcon className="profileModalFormSaveIcon" />
          </button>
        </form>
      </>
    );
  };

  const handleEditUsername = () => {
    setEditUser(!editUser);
    setUserAlert(!userAlert);

    // todo: create a function here to enable the modal for alerting client to log in again with the new username after updating the username
  };
  return (
    <>
      <div
        className={`
      warningMessage
      ${userAlert ? "block" : "hidden"}
      `}
      >
        <AlertUserModal />
      </div>
      <div className="profileModalFormContainer">
        <div
          className={`profileModalFormWrapper
          ${editUser ? "items-center" : "items-end"}
          `}
        >
          {editUser ? (
            ""
          ) : (
            <button
              type="button"
              onClick={() => setDisplayOn(false)}
              className="profileModalFormCloseBtn"
            >
              <CloseBtn className="w-5 h-5 drop-shadow-2xl" />
            </button>
          )}
          <div className="px-3 overflow-hidden">
            {editUser ? (
              <UpdateUsername />
            ) : (
              <h1 className="profileModalFormUsername ">
                {client ? username : ""}
              </h1>
            )}
          </div>
        </div>

        <div className="w-full h-[60px] relative">
          <div className="w-24 h-24 relative mx-auto">
            <Avatar
              showFallback
              radius="full"
              isFocusable
              src={image}
              className="cursor-pointer w-24 h-24"
            />
            <div>
              <button
                type="button"
                onClick={handleEditProfileImg}
                className="profileModalFormEditIconImg"
              >
                <EditIcon className="profileModalFormEditIconStyleImg" />
              </button>
            </div>
          </div>

          {/* 
              // TODO: add the state of this button to context for the form to receive the state value
             */}
          {editUser ? (
            ""
          ) : (
            <button
              type="button"
              onClick={() => handleEditUsername()}
              className="profileModalFormEditIcon"
            >
              <EditIcon className="profileModalFormEditIconStyle" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileModalForm;
