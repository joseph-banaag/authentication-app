"use server";
import { getCookie } from "cookies-next";

export const authenticate = () => {
  const token = getCookie("token");

  console.log(token);
  return token;
};
