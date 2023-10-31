import connectToDB, { client } from "@/app/lib/mongodb";
import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createHash } from "crypto";

export const GET = async (request: NextRequest, response: Response) => {
  const { searchParams } = new URL(request.url);
  const secretAccess = process.env.ACCESS_TOKEN_SECRET;
  const hash = createHash("sha256");

  hash.update("one");
  // console.log(hash.copy().digest("hex"))

  await connectToDB();
  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");
    const queryUsername = searchParams.get("username");
    const queryPassword = searchParams.get("password");

    const userInputPassword = `${queryPassword}`;

    const toFind = {
      username: queryUsername,
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

    const isMatched = await bcrypt.compare(userInputPassword, password);

    if (isMatched) {
      const secret = `${secretAccess}`;
      const token = jwt.sign({ username }, secret, { expiresIn: "1h" });

      console.log("TOKEN: ", token);
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
