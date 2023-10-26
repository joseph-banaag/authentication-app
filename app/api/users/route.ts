import connectToDB, { client } from "@/app/lib/mongodb";
import { NextResponse, type NextRequest } from "next/server";

// INSERT OPERATIONS. See sign-up and sign-in handlers

// GET OPERATION
export async function GET(request: NextRequest, response: NextResponse) {
  await connectToDB();
  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");

    const createdUsers = await collection.find({}).toArray();

    console.log("List of the documents will be found through PostMan");
    const test = "testValue";
    return NextResponse.json(createdUsers, {
      status: 200,
      headers: {
        getSetCookie: `testCookie=${test}`,
      },
    });
  } catch (error) {
    throw new Error(
      `There was a problem getting the information from the database. Error: ${error}`,
    );
  } finally {
    await client.close();
    console.log("The process is now completed. Database connection is closed.");
  }
}

// UPDATE OPERATION
export async function PUT(request: Request) {
  const { newUsernameLower, currentUsername } = await request.json();

  await connectToDB();
  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");

    const newData = { username: newUsernameLower };
    const toUpdate = { username: currentUsername };

    const updateResult = await collection.updateOne(toUpdate, {
      $set: newData,
    });

    console.log("Successfully updated an account");
    return NextResponse.json(updateResult, {
      status: 201,
    });
  } catch (error) {
    throw new Error(
      `There was a problem updating the document. Error: ${error}`,
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
    console.log("Successfully removed an account");
    return NextResponse.json(deleteResult, {
      status: 200,
    });
  } catch (error) {
    throw new Error(
      `There was a problem deleting the document. Error: ${error}`,
    );
  } finally {
    await client.close();
    console.log("The process is now completed. Database connection is closed.");
  }
}
