import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const secretAccess = process.env.ACCESS_TOKEN_SECRET;
const privateKey = `${secretAccess}`;
const Authenticate = () => {
  const cookieJar = cookies();
  const token = cookieJar.get("token")?.value;
  const jwtToken = `${token}`;

  console.log("JWT-TOKEN", jwtToken);

  jwt.verify(jwtToken, privateKey, function (err, decoded) {
    if (!err && decoded) {
      cookies().set({
        name: "decoded",
        value: `${decoded}`,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
      });
    }
  });
};

export default Authenticate;
