"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Card, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/utils/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/utils/icons/EyeSlashFilledIcon";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { creationDate } from "@/components/lib/createdDate";
import SubmitSpinner from "@/components/lib/SubmitSpinner";
import toast, { Toaster } from "react-hot-toast";
import IllustrationSigUp from "@/app/(root)/components/IllustrationSigUp";
import BrandLogoSignUp from "@/app/(root)/components/BrandLogoSignUp";
import SocialAuth from "@/components/SocialAuth";
import DisabledButton from "@/components/toggle/DisabledButton";
import { CreateAccount } from "@/app/actions/createAccount";
import { checkUserRoute } from "@/app/api/apis";

// this object is for type declaration of useForm() function specifically for register method.
interface Inputs {
  username: string;
  password: string;
  email: string;
  confirmPw: string;
}

// * main function here...
export default function SignUp(): React.JSX.Element | null {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPw: "",
    },
    criteriaMode: "all",
    mode: "all",
  });

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleIsConfirmed = () => setIsConfirmed(!isConfirmed);

  // this function is for the error message regarding password
  const validatePassword = (): React.ReactNode => {
    const password = watch("password");
    const confirmed = watch("confirmPw");

    const determineMatched = () => {
      if (password === "" && confirmed === "") {
        return (
          <>
            <p className="formErrorMessage">Password is required!</p>
          </>
        );
      } else if (password === undefined && confirmed === undefined) {
        return (
          <>
            <p className="formErrorMessage">Password is required!</p>
          </>
        );
      } else if (password === confirmed) {
        return (
          <>
            <p className="hidden">Password matched!</p>
          </>
        );
      } else {
        return (
          <>
            <p className="formErrorMessage">Passwords do not matched!</p>
          </>
        );
      }
    };
    return <>{determineMatched()}</>;
  };

  // this is for the form submission
  const OnSubmit: SubmitHandler<Inputs> = async (data, e) => {
    e?.preventDefault();
    const password = data.password;
    const confirmed = data.confirmPw;
    const user_name = data.username;
    const email_acc = data.email;
    const created_on = `${creationDate}`;

    const usernameLower = user_name.toLowerCase();
    const emailLower = email_acc.toLowerCase();

    sessionStorage.setItem("session_name", `${usernameLower}`);

    const credentials = {
      username: usernameLower,
      email: emailLower,
      password,
      created_on,
    };

    const checkExistingUser = async () => {
      const response = await fetch(checkUserRoute, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usernameLower,
          emailLower,
        }),
      });

      const data = await response.json();

      const db_username = data?.username;
      const db_email = data?.email;

      if (!db_email && !db_username) {
        CreateAccount(credentials);
        toast.success(`Welcome, ${usernameLower}!`);
        router.push("/dashboard");
      }

      if (usernameLower === db_username || emailLower === db_email) {
        toast.error("Account exist. Please sign in.");
        router.push("/sign-in");
      }
    };
    checkExistingUser();
    setClicked(!clicked);
  };

  // this function will handed disabling submit button
  const enableSubmitButton = (): React.ReactNode => {
    const password = watch("password");
    const confirmed = watch("confirmPw");

    const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    const changeSubmitButton = () => {
      if (password === "" || confirmed === "") {
        return <DisabledButton />;
      } else if (password === confirmed) {
        const checkPattern = pattern.test(password);

        const checkPassReq = () => {
          if (checkPattern === true) {
            return (
              <>
                <Button type="submit" name="submit" className="submitBtn">
                  <div className="submitBtnContent">
                    {clicked ? <SubmitSpinner /> : <p>Continue</p>}
                  </div>
                </Button>
              </>
            );
          } else {
            toast.error(
              "Passwords does not meet the requirements. Check for errors.",
            );
            return <DisabledButton />;
          }
        };
        return <>{checkPassReq()}</>;
      } else {
        return <DisabledButton />;
      }
    };
    return <>{changeSubmitButton()}</>;
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "backIn", duration: 0.5 }}
        className="formContainer"
      >
        <div className="formWrapper">
          <Card className="formContent">
            <BrandLogoSignUp />
            <SocialAuth />

            {/* form */}
            <form
              onSubmit={handleSubmit(OnSubmit)}
              className="flex flex-col gap-7"
            >
              <div className="flex flex-col">
                <Input
                  autoComplete="off"
                  aria-autocomplete="none"
                  aria-labelledby="username"
                  id="username"
                  isClearable
                  type="text"
                  variant="bordered"
                  label="Username"
                  className="w-full flex-1"
                  classNames={{
                    inputWrapper: "formInputWrapper",
                    label: "formLabel",
                    input: "formInput",
                  }}
                  {...register("username", {
                    required: true,
                    pattern: /[\w!@#$%^&*()-+=<>?/\\,.;:'"[\]{}|]{3,}/gi,
                  })}
                  name="username"
                />
                <p className="formErrorMessage">
                  {errors.username?.types?.required && (
                    <span>Username is required</span>
                  )}
                  {errors.username?.types?.pattern && (
                    <span>Space is not allowed and at least 3 characters</span>
                  )}
                </p>
              </div>
              <div className="flex flex-col">
                <Input
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
                    input: "formInput",
                  }}
                  {...register("email", {
                    required: true,
                    pattern:
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gi,
                  })}
                  name="email"
                />
                <p className="formErrorMessage">
                  {errors.email?.types?.required && (
                    <span>A valid email is required</span>
                  )}
                  {errors.email?.types?.pattern && (
                    <span>e.g. example@email.com</span>
                  )}
                </p>
              </div>

              <div className="flex flex-col">
                <Input
                  autoComplete="off"
                  aria-autocomplete="none"
                  aria-labelledby="password"
                  id="password"
                  variant="bordered"
                  label="Password"
                  classNames={{
                    inputWrapper: "formInputWrapper",
                    label: "formLabel",
                    input: "formInput",
                  }}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="contentIcon" />
                      ) : (
                        <EyeFilledIcon className="contentIcon" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  className="w-full flex-1"
                  {...register("password", {
                    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                    required: true,
                  })}
                  name="password"
                />
                <p className="formErrorMessage">
                  {errors.password?.types?.required && (
                    <span>Password is required</span>
                  )}
                  {errors.password?.types?.pattern && (
                    <span className="max-w-[30em] flex flex-wrap flex-shrink">
                      Minimum password of 8 and must have an uppercase,
                      lowercase, number, and special character.
                    </span>
                  )}
                </p>
              </div>

              <div className="flex flex-col">
                <Input
                  autoComplete="off"
                  aria-autocomplete="none"
                  aria-labelledby="confirmPw"
                  id="confirmPw"
                  variant="bordered"
                  label="Confirm Password"
                  classNames={{
                    inputWrapper: "formInputWrapper",
                    label: "formLabel",
                    input: "formInput",
                  }}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleIsConfirmed}
                    >
                      {isConfirmed ? (
                        <EyeSlashFilledIcon className="contentIcon" />
                      ) : (
                        <EyeFilledIcon className="contentIcon" />
                      )}
                    </button>
                  }
                  type={isConfirmed ? "text" : "password"}
                  className="w-full flex-1"
                  {...register("confirmPw", {
                    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                    required: true,
                  })}
                  name="confirmPw"
                />
                {validatePassword()}
              </div>
              <div className="flex flex-col gap-1 my-2">
                {enableSubmitButton()}
              </div>
            </form>
          </Card>
        </div>
        <div className="xl:flex">
          <IllustrationSigUp />
        </div>
      </motion.div>
    </>
  );
}
