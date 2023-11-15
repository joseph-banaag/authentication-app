import connectToDB, { client } from "@/app/lib/mongodb";
import { NextResponse, type NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { secret } from "@/app/actions/secret";

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

    console.log(token);

    const decoded = jwt.verify(token, jwt_secret) as JwtPayload;

    if (decoded) {
      const result = await collection
        .find({
          username: username,
        })
        .toArray();
      return Response.json({
        message: "authenticated",
        user: decoded,
        current_user: result,
        status: 200,
      });
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
