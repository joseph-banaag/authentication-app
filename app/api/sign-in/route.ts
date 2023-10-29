import connectToDB, { client } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

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

    const username = result?.username;
    const password = result?.password;

    bcrypt.compare(userInputPassword, password, async function (err, result) {
      if (!err && result) {
        console.log("matched!");
      } else {
        console.log("Oh no!");
      }
    });

    return NextResponse.json(result);
  } catch (error) {
    throw new Error(`Failed to fetch data. Error: ${error}`);
  } finally {
    await client.close();
  }
};
