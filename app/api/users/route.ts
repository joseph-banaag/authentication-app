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

    // const newDoc = {
    //   email: `${email_acc}`,
    //   username: `${user_name}`,
    //   password: `${password}`,
    //   created_on: `${created_on}`,
    // };

     const newDoc = {
       email: "testUser100@email.com",
       username: "testUser102",
       password: "testUser102!",
       created_on: "Oct 11, 2023",
     };
    const AddAcc = await collection.insertOne(newDoc);

    console.log("Successfully added a new user");
    return Response.json(AddAcc);
  } catch (error) {
    throw new Error(
      `There was a problem creating a new document. Error: ${error}`
    );
  }
}

// GET OPERATION
export async function GET(request: Request) {
  await connectToDB();
  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");

    const toFind = {};

    const createdUsers = await collection.find(toFind).toArray()

    console.log("List of the documents will be found through PostMan");
    return Response.json(createdUsers);
    // return new NextResponse(JSON.stringify(toGet));
  } catch (error) {
    throw new Error(
      `There was a problem getting the information from the database. Error: ${error}`
    );
  }
}

// UPDATE OPERATION
export async function PUT(request: Request) {
  const { newUsername, currentUsername } = await request.json();

  await connectToDB();
  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");

    // const newData = { username: newUsername };
    // const toUpdate = { username: currentUsername };

    const newData = { username: "testUser100" };
    const toUpdate = { username: "testUser100a" };

    const updateResult = await collection.updateOne(toUpdate, {
      $set: newData,
    });

    console.log("Successfully updated an account")
    return Response.json(updateResult);
    // return new NextResponse(JSON.stringify(updateResult));
  } catch (error) {
    throw new Error(
      `There was a problem updating the document. Error: ${error}`
    );
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
    return Response.json(deleteResult);

    // return new NextResponse(JSON.stringify(deleteResult));
  } catch (error) {
    throw new Error(
      `There was a problem deleting the document. Error: ${error}`
    );
  }
}

// finally {
//     await client.close();
//     console.log("The process is now completed. Database connection is closed.");
//   }
