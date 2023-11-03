"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { secret } from "@/app/actions/secret";

export const decodedToken = () => {
  const cookieJar = cookies();
  const tokenValue = cookieJar.get("token")?.value;
  const token = `${tokenValue}`;
  const secretKey = `${secret}`;

  const decoded = jwt.verify(token, secretKey, function (err, decode) {
    if (!err && decode) {
      return decode;
    } else {
      return err;
    }
  });
  console.log(decoded);
  return decoded;
};
