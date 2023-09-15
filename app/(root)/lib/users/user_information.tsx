"use server"
import connectToDB, { client } from "@/app/lib/mongodb"
import React from 'react'
import User_DB_info from "./user_DB_info";



export default async function User_get_information(user_name: any) {
    //  this should return the value given by the user from the form
    const userName_fromForm = `${user_name}`
    console.log(userName_fromForm)
    // the result is correct. 
    // todo: needs to convert the value of userName_fromForm to string

    await connectToDB();

    const db = client.db("active_users");
    const collection = db.collection("user_information");

    const toFind = {
        username: `${userName_fromForm}`,
    };

    // const toFind = {
    //     username: "user400a",
    // };

    const toGet = await collection.find(toFind).toArray();
    console.log(toGet);

    const get_username = toGet.map((user) => user.username)
    const get_email = toGet.map((email) => email.email)

    const getEmail = `${get_email}`
    const getUsername = `${get_username}`; // this converts the value of the variable to string
    console.log(getUsername)
    console.log(getEmail)

    console.log("Closing client connection...")
    await client.close()
    console.log("Clint connection closed")
    return (
        <>
            <User_DB_info username={getUsername} email={getEmail} />
        </>
    )
}
