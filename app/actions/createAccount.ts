"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { secret } from "@/app/actions/secret";
import { signUpRoute, usersRoute } from "@/app/api/apis";

type CredentialType = {
  username: string;
  email: string;
  password: string;
  created_on: string;
};
export const CreateAccount = async (credentials: CredentialType) => {
  const { username, email, password, created_on } = credentials;

  const response = await fetch(signUpRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
      created_on,
    }),
  });

  //  if successfully created a new user response.ok = true
  try {
    if (response.ok) {
      const token = jwt.sign({ username }, `${secret}`, { expiresIn: "1h" });
      const oneDay = 24 * 60 * 60 * 1000;

      cookies().set({
        name: "token",
        value: `${token}`,
        httpOnly: true,
        path: "/",
        maxAge: 86400,
        expires: Date.now() + oneDay,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      const response = await fetch(usersRoute, {
        headers: {
          Authorization: `Bearer ${token}`,
          Content_type: "application/json",
        },
      });

      if (response.ok) {
        console.log("send authorization");
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Error:", response.statusText);
      }
    }
  } catch (error) {
    throw new Error("System failed. Refresh the browser and try again.");
  }
};
