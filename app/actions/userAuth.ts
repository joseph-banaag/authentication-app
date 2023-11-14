"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { secret } from "./secret";

export const userAuth = () => {
  const jar = cookies();
  const token = jar.get("token")?.value;
  const jwt_token = `${token}`;
  const jwt_secret = `${secret}`;

  // console.log(token);

  // todo: Fix this. it is not keeping the value of the token once the user api was called using postman. will try to call the api route from dashboard!

  try {
    const decoded = jwt.verify(jwt_token, jwt_secret);
    if (decoded) {
      // console.log(decoded);
      return decoded;
    }
  } catch (error) {
    console.log(error);
    throw new Error(`${error}`);
  }
};
