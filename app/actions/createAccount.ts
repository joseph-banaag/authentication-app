"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { secret } from "@/app/actions/secret";
import { signUpRoute } from "@/app/api/apis";

type CredentialType = {
  username: string;
  email: string;
  password: string;
  created_on: string;
};
export const CreateAccount = async (credentials: CredentialType) => {
  const secretAccess = secret;
  const { username } = credentials;

  const response = await fetch(signUpRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      credentials,
    }),
  });

  //  if successfully created a new user response.ok = true
  try {
    if (response.ok) {
      const secret = `${secretAccess}`;
      const token = jwt.sign({ username }, secret, { expiresIn: "1h" });

      cookies().set({
        name: "token",
        value: `${token}`,
        httpOnly: true,
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
      });
    }
  } catch (error) {
    throw new Error("System failed. Refresh the browser and try again.");
  }
};
