import connectToDB, { client } from "@/app/lib/mongodb";
import { NextResponse, type NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { secret } from "@/app/actions/secret";

// * NOTE: this component will provide the necessary user information to other components in the app aside from the dashboard which acts as a secondary security if the verification failed.
// GET OPERATION

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  try {
    await connectToDB();
    const db = client.db("active_users");
    const collection = db.collection("user_information");
    const jwt_token = request.cookies.get("token")?.value;
    const token = `${jwt_token}`;
    const jwt_secret = `${secret}`;
    const username = searchParams.get("q");

    const decoded = jwt.verify(token, jwt_secret) as JwtPayload;

    if (decoded) {
      const result = await collection
        .find({
          username: username,
        })
        .next();
      return Response.json(result);
    }
  } catch (error) {
    return Response.json({
      message: "Forbidden. Unauthorized access attempt",
      status: 403,
    });
  } finally {
    await client.close();
    console.log("Client connection is now closed!");
  }
};

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
