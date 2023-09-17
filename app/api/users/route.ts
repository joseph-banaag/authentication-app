import { NextResponse } from "next/server";
import connectToDB, { client } from "@/app/lib/mongodb";

export async function POST(req: Request) {
  const { password, confirmed, user_name, email_acc, created_on } =
    await req.json();
  // inside the {} are the destructured value given by req/request from fetch function

  await connectToDB();

  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");

    const newDoc = {
      email: `${email_acc}`,
      username: `${user_name}`,
      password: `${password}`,
      created_on: `${created_on}`,
    };
    const result = await collection.insertOne(newDoc);
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

export async function GET() {
  await connectToDB();

  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");

    const toFind = {
      username: "user502",
    };

    const toGet = await collection.find(toFind).toArray();
    console.log("Here is the list of what I found from your database:");
    console.log(toGet);

    if (toGet.length > 0) {
      const user_details_from_DB = toGet.map((user) => user);

      return new NextResponse(JSON.stringify(user_details_from_DB));
    }
  } catch (error) {
    throw new Error(
      `There was a problem getting the information from the database. Error: ${error}`
    );
  } finally {
    await client.close();
    console.log("The process is now completed. Database connection is closed.");
  }

  return NextResponse.json(
    { message: "Successfully get database information" },
    { status: 200 }
  );
}
