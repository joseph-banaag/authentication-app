import React, { useEffect, useState } from 'react'
import { MailIcon } from "@/components/utils/icons/MailIcon";
import { useForm } from "react-hook-form";
import { useTheme } from "next-themes";
import {
  Card,
  CardBody,
  Button,
  CardFooter,
  CardHeader,
  Input
} from "@nextui-org/react";
import FuncNotWorking from "@/components/utils/warnings/functionNotWorking";
import { useModalContext } from "@/app/context/ModalContext";


const PasswordResetModal = (): React.ReactNode => {
  const { resetReq, setResetReq } = useModalContext()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    criteriaMode: "all",
    mode: "all",
  });


  interface Props {
    email: string
  }

  const onSubmit = (data: Props) => {
    const email = data.email;

    alert(
      `We've sent the password reset request to: ${email}. Please check your Inbox, Junk, or Spam folder.`
    );

  };


  return (
    <>
      <div className="passwordResetModalContainer">
        <Card
          className="warningMessageWrapper"
        >
          <CardHeader
            className="block">
            <div
              onClick={() => setResetReq(false)}
              className="passwordResetModalHeader"
            >x</div>
            <h1 className="passwordResetModalHeader1">
              Recover your account
            </h1>
            <FuncNotWorking />
          </CardHeader>

          <CardBody
            className="flex flex-col gap-1">
            <p className="sm:text-medium text-xs sm:font-normal">
              Enter your email address to reset your password
            </p>
            <div className='flex flex-col'>
              <Input
                startContent={
                  <MailIcon className="contentIcon" />
                }
                autoComplete="off"
                aria-autocomplete="none"
                aria-labelledby="email"
                id="email"
                isClearable
                type="email"
                variant="bordered"
                label="Email"
                className="w-full flex-1"
                classNames={{
                  inputWrapper: "formInputWrapper",
                  label: "formLabel",
                  input: "formInput"
                }}
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gi
                })}
                name="email"
              />
              <p className="formErrorMessage">
                {errors.email?.types?.required && <span>A valid email is required</span>}
                {errors.email?.types?.pattern && <span>e.g. example@email.com</span>}

              </p>
            </div>

          </CardBody>

          <CardFooter
            className="flex justify-end gap-3">
            <Button
              onClick={() => setResetReq(false)}
              color="default"
              variant="light"
              size="sm"
            >
              <p className="text-red-500 font-semibold">Cancel</p>
            </Button>
            <Button
              color="secondary"
              variant="solid"
              size="sm"
              type="submit"
              className="hover:scale-105"
            >
              <p className="text-white font-semibold">Reset</p>
            </Button>

          </CardFooter>

        </Card>
      </div>
    </>
  )
}

export default PasswordResetModal