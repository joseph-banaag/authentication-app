import { NextResponse } from "next/server";
import connectToDB, { client } from "@/app/lib/mongodb";
import { toggle } from "@nextui-org/react";

export async function POST(request: Request) {
  await connectToDB();

  const { email, username, password, created_on } = await request.json();

  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");

    const result = await collection.insertOne({
      email,
      username,
      password,
      created_on,
    });
    console.log("Successfully added a new user.");
  } catch (error) {
    throw new Error(
      `There was a problem creating a new document. Error: ${error}`
    );
  } finally {
    await client.close();
    console.log("The process is now completed. Database connection is closed.");
  }
  return NextResponse.json(
    { message: "Successfully added a new user" },
    { status: 201 }
  );
}

export async function GET(request: Request) {
  await connectToDB();

  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");

    const toFind = {
      username: "username201",
    };

    // const toGet = await collection.find(toFind).toArray();

    const cursor = collection.find(toFind);
    const toGet = await cursor.toArray();

    console.log(toGet);

    const jsonRes = {
      user_information: toGet,
    };
    console.log(jsonRes);

    return new NextResponse(JSON.stringify(jsonRes), {
      headers: {
        "Content-type": "application/json",
      },
    });
  } catch (error) {
    throw new Error(
      `There was a problem getting the information from the database. Error: ${error}`
    );
  } finally {
    await client.close();
    console.log("The process is now completed. Database connection is closed.");
  }
}
