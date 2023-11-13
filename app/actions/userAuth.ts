"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { secret } from "./secret";

export const userAuth = () => {
  const jar = cookies();
  const token = jar.get("token")?.value;

  console.log(token);

  try {
    const decoded = jwt.verify(`${token}`, `${secret}`);
    if (decoded) {
      return decoded;
    } else {
      throw new Error("Attempt not allowed! Forbidden access.");
    }
  } catch (err) {
    console.log(err);
    const error = `${err}`;
    return error;
  }
};
