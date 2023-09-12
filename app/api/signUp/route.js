import { NextResponse } from "next/server";
import connectToDB from "../../lib/mongodb";

export async function POST(req) {
  const { password, confirmed, user_name, email_acc, created_on } =
    await req.json();

  console.log("password: ", password);
  console.log("confirmed password: ", confirmed);
  console.log("username: ", user_name);
  console.log("user email address: ", email_acc);
  console.log("created date: ", created_on);

  await connectToDB();

  return NextResponse.json({
    message: ["This message is from the api routes"],
  });
}
