import { cookies } from "next/headers";

export const userAuth = (): string | undefined => {
  const cookie_jar = cookies();
  const token = cookie_jar.get("token")?.value;

  return token;
};
