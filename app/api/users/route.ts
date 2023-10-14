import connectToDB, { client } from "@/app/lib/mongodb";

// INSERT OPERATION
export async function POST(request: Request) {
  const { password, usernameLower, emailLower, created_on } =
    await request.json();

  await connectToDB();

  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");

    const newDoc = {
      email: `${emailLower}`,
      username: `${usernameLower}`,
      password: `${password}`,
      created_on: `${created_on}`,
    };

    const AddAcc = await collection.insertOne(newDoc);

    console.log("Successfully added a new user");

    return Response.json(AddAcc);
  } catch (error) {
    throw new Error(
      `There was a problem creating a new document. Error: ${error}`
    );
  } finally {
    await client.close();
    console.log("The process is now completed. Database connection is closed.");
  }
}

// GET OPERATION
export async function GET(request: Request) {
  await connectToDB();
  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");

    const toFind = {};

    const createdUsers = await collection.find(toFind).toArray();

    console.log("List of the documents will be found through PostMan");
    return Response.json(createdUsers);
  } catch (error) {
    throw new Error(
      `There was a problem getting the information from the database. Error: ${error}`
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
    return Response.json(updateResult);
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
    console.log("Successfully removed an account");
    return Response.json(deleteResult);
    
  } catch (error) {
    throw new Error(
      `There was a problem deleting the document. Error: ${error}`
    );
  } finally {
    await client.close();
    console.log("The process is now completed. Database connection is closed.");
  }
}
