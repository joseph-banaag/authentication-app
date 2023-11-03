import connectToDB, { client } from "@/app/lib/mongodb";
import { type NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { usernameLower, emailLower } = await request.json();
  await connectToDB();

  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");

    const checkUsername = {
      username: `${usernameLower}`,
    };

    const checkEmail = {
      email: `${emailLower}`,
    };

    const findUsername = await collection.find(checkUsername).next();

    if (!findUsername) {
      const findEmail = await collection.find(checkEmail).next();
      if (!findEmail) {
        return NextResponse.json({
          message: "User not found!",
          status: 401,
        });
      } else {
        return NextResponse.json(findEmail);
      }
    }
    return NextResponse.json(findUsername);
  } catch (error) {
    throw new Error("Getting user failed");
  } finally {
    await client.close();
    console.log("Client connection is closed.");
  }
};
