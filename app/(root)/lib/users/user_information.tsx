"use server"
import connectToDB, { client } from "@/app/lib/mongodb"
import React from 'react'
import User_DB_info from "./user_DB_info";



export const user_get_information = async () => {

    await connectToDB();

    const db = client.db("active_users");
    const collection = db.collection("user_information");

    const toFind = {
        username: "user400",
    };

    const toGet = await collection.find(toFind).toArray();
    console.log(toGet);

    const get_username = toGet.map((user) => user.username)
    const get_email = toGet.map((email) => email.email)

    const getEmail = `${get_email}`
    const getUsername = `${get_username}`; // this converts the value of the variable to string
    console.log(getUsername)
    console.log(getEmail)
    return (
        <>
            <User_DB_info username={getUsername} email={getEmail} />
        </>
    )
}
