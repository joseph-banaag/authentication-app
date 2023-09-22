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
  // todo: create a logic that will get the username value from the form and use it to find existing account from the database
  
  await connectToDB();
  console.log("You can now perform GET operation");
  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");

    const toFind = {
      username: "testNewUser100",
    };

    const toGet = await collection.find(toFind).toArray();
    console.log("Here\'s the list of what I found from the database:");

    const user_DB_info = toGet.map((users) => users)
    const get_username_DB = user_DB_info
    return new NextResponse(JSON.stringify(get_username_DB));

  } catch (error) {
    throw new Error(
      `There was a problem getting database information. Error: ${error}`
    );
  } finally {
    console.log("Closing client connection...");
    await client.close();
    console.log("Client connection is closed");
  }
  return NextResponse.json(
    { message: "Successfully established database connection" },
    { status: 200 }
  );
}
