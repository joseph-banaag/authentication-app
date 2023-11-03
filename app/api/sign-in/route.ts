import connectToDB, { client } from "@/app/lib/mongodb";
import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const POST = async (request: NextRequest, response: Response) => {
  const { credentials } = await request.json();
  const { usernameLower, userInputPassword } = credentials;
  const secretAccess = process.env.ACCESS_TOKEN_SECRET;
  await connectToDB();

  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");
    const userPassword = `${userInputPassword}`;

    const toFind = {
      username: usernameLower,
    };

    const result = await collection.find(toFind).next();

    if (!result) {
      return NextResponse.json({
        message: "User not found",
        status: 401,
      });
    }

    const username = result?.username;
    const password = result?.password;

    const isMatched = await bcrypt.compare(userPassword, password);

    if (isMatched) {
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

    const currentUser = {
      username: username,
      password: isMatched,
    };

    return NextResponse.json(currentUser);
  } catch (error) {
    throw new Error(`Failed to fetch data. Error: ${error}`);
  } finally {
    await client.close();
    console.log("Client connection is already closed");
  }
};
