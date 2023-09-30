import React from "react";
import { hookstate, useHookstate, State } from "@hookstate/core";

const storedDataSU = {
  data:
    typeof window !== "undefined"
      ? sessionStorage.getItem("usernameSignUp")
      : "",
};
const usernameSignupValue = storedDataSU.data;

const storedDataSI = {
  data:
    typeof window !== "undefined"
      ? sessionStorage.getItem("usernameSignIn")
      : "",
};
const usernameSignInValue = storedDataSI.data;

console.log(usernameSignInValue);
// value will be a string of null or 'null'
console.log(usernameSignupValue);
// if the entry point is sign up and vise versa


// this will set the username from sign in entry point as global value
const globalState = hookstate<string | null>(null);
const wrapState = (s: State<string | null>) => ({
  get: () => s.value,
  display: () =>
    s.set(
      usernameSignInValue === null ? usernameSignupValue : usernameSignInValue
    ),
});
export const accessGlobalState = () => wrapState(globalState);
export const useGlobalState = () => wrapState(useHookstate(globalState));

setInterval(() => accessGlobalState().display(), 100);
