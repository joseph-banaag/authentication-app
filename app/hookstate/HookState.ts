import { hookstate, useHookstate, State } from "@hookstate/core";

const storedDataSU = {
  data: typeof window !== "undefined" ? sessionStorage.getItem("username") : "",
};
const usernameSignupValue = storedDataSU.data;

const storedDataSI = {
  data: typeof window !== "undefined" ? sessionStorage.getItem("username") : "",
};
const usernameSignInValue = storedDataSI.data;

// console.log(usernameSignupValue);
// console.log(usernameSignInValue);

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
