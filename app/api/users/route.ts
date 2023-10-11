import { NextResponse } from "next/server";
import connectToDB, { client } from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

// INSERT OPERATION
export async function POST(request: Request) {
  const { password, confirmed, user_name, email_acc, created_on } =
    await request.json();

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
    console.log("Successfully added a new user");
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

// GET OPERATION
export async function GET(request: Request) {
  await connectToDB();
  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");

    const toFind = {};

    const toGet = await collection.find(toFind).toArray();
    console.log("List of the documents will be found through PostMan");

    return new NextResponse(JSON.stringify(toGet));
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

// UPDATE OPERATION
export async function PUT(request: Request) {
  const { newUsername, currentUsername } = await request.json();
  console.log(newUsername);
  console.log(currentUsername);

  await connectToDB();
  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");

    const newData = { username: newUsername };
    const toUpdate = { username: currentUsername };

    const updateResult = await collection.updateOne(toUpdate, {
      $set: newData,
    });

    console.log(updateResult)
    return new NextResponse(JSON.stringify(updateResult));
  } catch (error) {
    throw new Error(
      `There was a problem updating the document. Error: ${error}`
    );
  } finally {
    await client.close();
    console.log("The process is now completed. Database connection is closed.");
  }
}

// DELETE OPERATION
export async function DELETE(request: Request) {
  await connectToDB();
  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");

    const toDelete = {
      username: "undefined",
    };

    const deleteResult = await collection.deleteMany(toDelete);

    return new NextResponse(JSON.stringify(deleteResult));
  } catch (error) {
    throw new Error(
      `There was a problem deleting the document. Error: ${error}`
    );
  } finally {
    await client.close();
    console.log("The process is now completed. Database connection is closed.");
  }
}
