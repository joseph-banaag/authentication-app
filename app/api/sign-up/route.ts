import connectToDB, { client } from "@/app/lib/mongodb";
import bcrypt from "bcrypt";

// INSERT OPERATOR FOR SIGN UP
export async function POST(request: Request) {
  const { password, usernameLower, emailLower, created_on } =
    await request.json();

  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");

    bcrypt.hash(password, 10, async function (err, hash) {
      await connectToDB();

      if (!hash) {
        return err;
      } else {
        const newDoc = {
          email: `${emailLower}`,
          username: `${usernameLower}`,
          password: `${hash}`,
          created_on: `${created_on}`,
        };

        const AddedAcc = await collection.insertOne(newDoc);
        return Response.json(AddedAcc);
      }
    });

    return Response.json({
      message: "Successfully added a new user",
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
