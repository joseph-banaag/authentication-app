import connectToDB, { client } from "@/app/lib/mongodb";
import bcrypt from "bcrypt";
import { NextResponse, type NextRequest } from "next/server";

// INSERT OPERATOR FOR SIGN UP
export async function POST(request: NextRequest) {
  const { username, email, password, created_on } = await request.json();

  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");

    bcrypt.hash(password, 10, async function (err, hash) {
      await connectToDB();

      if (!hash) {
        return NextResponse.json({
          message: `${err}`,
          status: 401,
        });
      } else {
        const newDoc = {
          email: `${email}`,
          username: `${username}`,
          password: `${hash}`,
          created_on: `${created_on}`,
        };

        const AddedAcc = await collection.insertOne(newDoc);
        // if successfully created = AddedAcc.acknowledge = true

        return NextResponse.json(AddedAcc, {
          status: 201,
        });
      }
    });

    return NextResponse.json({
      message: "Successfully added a new user",
      status: 200,
    });
  } catch (error) {
    throw new Error("Failed to create a new user");
  } finally {
    await client.close();
    console.log("Client connection is closed.");
  }
}
