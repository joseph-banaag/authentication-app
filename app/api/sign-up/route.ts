import connectToDB, { client } from "@/app/lib/mongodb";
import bcrypt from "bcrypt";
import { NextResponse, type NextRequest } from "next/server";

// INSERT OPERATOR FOR SIGN UP
export async function POST(request: NextRequest, response: NextResponse) {
  const { password, usernameLower, emailLower, created_on } =
    await request.json();

  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");

    bcrypt.hash(password, 10, async function (err, hash) {
      await connectToDB();

      if (!hash) {
        return err;
      } else {
        const newDoc = {
          email: `${emailLower}`,
          username: `${usernameLower}`,
          password: `${hash}`,
          created_on: `${created_on}`,
        };

        const AddedAcc = await collection.insertOne(newDoc);
        return NextResponse.json(AddedAcc);
      }
    });

    return NextResponse.json({
      message: "Successfully added a new user",
      status: 201,
    });
  } catch (error) {
    throw new Error(
      `There was a problem creating a new document. Error: ${error}`,
    );
  } finally {
    await client.close();
    console.log("The process is now completed. Database connection is closed.");
  }
}

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  await connectToDB();

  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");
    const queryUsername = searchParams.get("username");
    const queryEmail = searchParams.get("email");

    const findUsername = {
      username: queryUsername,
    };

    const result = await collection.find(findUsername).next();

    if (!result) {
      // if result is undefined check for email
      const toFind = {
        email: queryEmail,
      };
      const findEmail = await collection.find(toFind).next();

      if (!findEmail) {
        return NextResponse.json({
          message: "User not found",
          status: 401,
        });
      } else {
        return NextResponse.json(findEmail);
      }
    } else {
      return NextResponse.json(result);
    }
  } catch (error) {
    throw new Error(`Failed to fetch data. Error: ${error}`);
  } finally {
    await client.close();
    console.log("Client connection is already closed");
  }
};
