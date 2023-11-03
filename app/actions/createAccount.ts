"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

type CredentialType = {
  username: string;
  email: string;
  password: string;
  created_on: string;
};
export const CreateAccount = async (credentials: CredentialType) => {
  const secretAccess = process.env.ACCESS_TOKEN_SECRET;
  const { username } = credentials;
  const response = await fetch("http://localhost:3000/api/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      credentials,
    }),
  });

  if (response.ok) {
    const secret = `${secretAccess}`;
    const token = jwt.sign({ username }, secret, { expiresIn: "1h" });

    cookies().set({
      name: "token",
      value: `${token}`,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    });
  }
};
