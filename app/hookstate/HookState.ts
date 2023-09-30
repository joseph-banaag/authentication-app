import React from "react";
import { hookstate, useHookstate, State } from "@hookstate/core";


const storedDataSU = {
  data:
    typeof window !== "undefined"
      ? sessionStorage.getItem("usernameSignUp")
      : "",
};
const usernameSignupValue = `${storedDataSU.data}`;

console.log(usernameSignupValue);


const storedDataSI = {
  data:
    typeof window !== "undefined"
      ? sessionStorage.getItem("usernameSignIn")
      : "",
};
const usernameSignInValue = `${storedDataSI.data}`;

console.log(usernameSignInValue);

// this will set the username from sign in entry point as global value
const globalState = hookstate<string | null>("");
const wrapState = (s: State<string | null>) => ({
  get: () => s.value,
  display: () => s.set(usernameSignupValue),
});
export const accessGlobalState = () => wrapState(globalState);
export const useGlobalState = () => wrapState(useHookstate(globalState));

setInterval(() => accessGlobalState().display(), 100);