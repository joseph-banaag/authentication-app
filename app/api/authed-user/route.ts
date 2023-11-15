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

    const current_user = JSON.stringify(decoded?.user);
    console.log(current_user);

    return Response.json({
      message: "authenticated",
      user: decoded,
      params: username,
      status: 200,
    });
  } catch (error) {
    throw new Error("Authentication failed");
  } finally {
    await client.close();
    console.log("Client connection is now closed!");
  }
};
