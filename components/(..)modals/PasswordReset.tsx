import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { MailIcon } from "@/components/utils/icons/MailIcon";
import { useForm } from "react-hook-form";
import FNYW from "../utils/warnings/functionNotWorking";
import ProgressStatus from "../utils/warnings/ProgressStatus";

export default function PasswordReset() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    criteriaMode: "all",
    mode: "all",
  });

  console.log(watch("email"));

  const onSubmit = (data: any) => {
    const email = data.email;
    console.log(email);

    alert(
      `We've sent the password reset request to: ${email}. Please check your Inbox, Junk, or Spam folder.`
    );
    return
    <>
    </>;
  };

  return (
    <>
      <Button
        onPress={onOpen}
        size="sm"
        variant="light"
        className="cursor-pointer max-w-fit !hover:bg-none -ms-3"
      >
        <h1 className="text-xs sm:font-normal text-violet-600 font-small flex justify-center items-center">
          Forgot password?
        </h1>
      </Button>

      <Modal
        placement="center"
        size="2xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">
                  <h1 className="sm:text-4xl text-xl sm:font-medium font-normal mb-1">
                    Recover your account
                  </h1>
                  <FNYW />
                </ModalHeader>
                <ModalBody>
                  <p className="sm:text-medium text-xs sm:font-normal font-small">
                    Please enter your email address to reset your password
                  </p>

                  <Input
                    id="email"
                    {...register("email", {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gi,
                    })}
                    isClearable
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    startContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none sm:flex flex-shrink-0 hidden" />
                    }
                  />
                  <p className="animate-pulse text-xs text-red-400">
                    {errors.email?.types?.required && (
                      <span>A valid email is required</span>
                    )}
                    {errors.email?.types?.pattern && (
                      <span>e.g. example@email.com</span>
                    )}
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="default"
                    variant="light"
                    size="sm"
                    onPress={onClose}
                  >
                    <p className="text-red-500 font-semibold">Cancel</p>
                  </Button>
                  <Button
                    color="secondary"
                    variant="solid"
                    size="sm"
                    type="submit"
                    onPress={onClose}
                    className="hover:scale-105"
                  >
                    <p className="text-white font-semibold">Reset</p>
                    {/* 
                    // todo: create a function that will change the word Reset to <ProgressStatus /> when requesting for password reset
                    */}
                  </Button>
                  {/* 
                  //todo: create a function that will redirect tha page to the home page once the password reset request has been made.
                  */}
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
