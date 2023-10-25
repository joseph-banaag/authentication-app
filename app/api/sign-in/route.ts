import connectToDB, { client } from "@/app/lib/mongodb";
import bcrypt from "bcrypt";
import { type NextRequest } from "next/server";
// INSERT OPERATOR FOR SIGN UP
export async function POST(request: NextRequest, response: Response) {
  const { userInputPassword, usernameLower } = await request.json();
  await connectToDB();

  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");
    const toFind = {
      username: `${usernameLower}`,
    };

    const currentUser = await collection.find(toFind).toArray();
    const hashed = currentUser[0]?.password;

    bcrypt.compare(userInputPassword, hashed, async function (err, result) {
      if (!result) {
        return err;
        // TODO: create a logic here to set the access to default to prevent user to access the protected routes
      } else {
        console.log("compare result is:", result);

        // TODO: create a function here that will send information to the middleware and allow the user to access protected routes

        // implement jwt here
      }
    });

    return Response.json({
      message: "Success",
      status: 200,
    });
  } catch (error) {
    throw new Error(
      `There was a problem creating a new document. Error: ${error}`,
    );
  } finally {
    await client.close();
    console.log("The process is now completed. Database connection is closed.");
  }
}
