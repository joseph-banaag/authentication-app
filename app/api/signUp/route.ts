import { NextResponse } from "next/server";
import connectToDB, { client } from "@/app/lib/mongodb";

export async function POST(req: Request) {
  const { password, confirmed, user_name, email_acc, created_on } =
    await req.json();

  await connectToDB();
  /*
    console.log("password: ", password);
    console.log("confirmed password: ", confirmed);
    console.log("username: ", user_name);
    console.log("user email address: ", email_acc);
    console.log("created date: ", created_on);
  */

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
    // console.log(`Successfully added a new user. ID: ${result.insertedId}`);
  } catch (error) {
    throw new Error(
      `There was a problem creating a new document. Error: ${error}`
    );
  } finally {
    await client.close();
    console.log("The process is now completed. Database connection is closed.");
  }
  return NextResponse.json(
    { error: "Internal Error from NextResponse" },
    { status: 500 }
  );
}
