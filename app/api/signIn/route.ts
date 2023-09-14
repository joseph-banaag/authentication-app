import { NextResponse } from "next/server";
import connectToDB, { client } from "@/app/lib/mongodb";

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

    return new NextResponse(JSON.stringify(result), {
      headers: {
        "Content-type": "application/json",
      },
    });
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

export async function GET() {
  await connectToDB();
  console.log("You can now perform GET operation");
  return NextResponse.json(
    { message: "Successfully established database connection" },
    { status: 200 }
  );
}
