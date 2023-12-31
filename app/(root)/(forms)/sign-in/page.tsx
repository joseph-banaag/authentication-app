"use client";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Input, Card } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/utils/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/utils/icons/EyeSlashFilledIcon";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import SubmitSpinner from "@/components/lib/SubmitSpinner";
import toast, { Toaster } from "react-hot-toast";
import BrandLogoSignIn from "@/app/(root)/components/BrandLogoSignIn";
import IllustrationSignIn from "@/app/(root)/components/IllustrationSignIn";
import { usePathname } from "next/navigation";
import SocialAuth from "@/components/SocialAuth";
import PasswordReset from "@/components/utils/warnings/alerts/PasswordReset";
import PasswordResetModal from "@/components/PasswordResetModal";
import { useModalContext } from "@/app/context/ModalContext";
import { signInRoute } from "@/app/api/apis";

interface Inputs {
  username: string;
  password: string;
}

//  main function here...
export default function SignIn(): React.JSX.Element | null {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [clicked, setClicked] = React.useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const { resetReq } = useModalContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
      password: "",
    },
    criteriaMode: "all",
    mode: "all",
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const OnSubmit: SubmitHandler<Inputs> = (data, e) => {
    const userInputPassword = data.password;
    const userInputUsername = data.username;
    e?.preventDefault();

    const usernameLower = userInputUsername.toLowerCase();

    sessionStorage.setItem("session_name", `${usernameLower}`);

    const credentials = {
      usernameLower,
      userInputPassword,
    };

    const getUser = async () => {
      const response = await fetch(signInRoute, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credentials,
        }),
      });
      const data = await response.json();

      const username = data?.username;
      const password = data?.password;

      if (!username && !password) {
        toast.error("No current account. Please sign up");
        setTimeout(() => {
          router.push("/sign-up");
        }, 3000);
      }

      if (username && password === false) {
        toast.error("Failed. Username and password");
        setTimeout(() => {
          location.reload();
        }, 2000);
      }

      if (username && password) {
        toast.success(`Welcome, ${username}!`);
        router.push("/dashboard");
      }
    };
    getUser();
    setClicked(!clicked);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className={`warningMessage ${resetReq ? "block" : "hidden"} 
        `}
      >
        <PasswordResetModal />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "backIn", duration: 0.5 }}
        className="formContainer"
      >
        <div className="formWrapper">
          <Card className="formContent">
            <BrandLogoSignIn />
            <SocialAuth />

            {/* form */}
            <form
              onSubmit={handleSubmit(OnSubmit)}
              className="flex flex-col gap-3"
            >
              <div className="flex flex-col">
                <Input
                  autoComplete="off"
                  aria-autocomplete="none"
                  aria-labelledby="username"
                  id="username"
                  type="text"
                  isClearable
                  variant="bordered"
                  label="Username"
                  classNames={{
                    inputWrapper: "formInputWrapper",
                    label: "formLabel",
                    input: "formInput",
                  }}
                  {...register("username", {
                    required: true,
                  })}
                />
                <p className="formErrorMessage">
                  {errors.username?.types?.required && (
                    <span>Username is required</span>
                  )}
                </p>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-end">
                  <PasswordReset />
                </div>
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
                    required: true,
                  })}
                  name="password"
                />

                <p className="formErrorMessage">
                  {errors.password?.types?.required && (
                    <span>Password is required</span>
                  )}
                </p>
              </div>
              <div className="flex flex-col gap-1 my-3">
                <Button type="submit" name="submit" className="submitBtn">
                  <div className="submitBtnContent">
                    {clicked ? (
                      <SubmitSpinner />
                    ) : (
                      <p className="text-white">Continue</p>
                    )}
                  </div>
                </Button>
              </div>
            </form>
          </Card>
        </div>
        <IllustrationSignIn />
      </motion.div>
    </>
  );
}
