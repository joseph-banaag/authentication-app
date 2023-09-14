"use server"
import connectToDB, { client } from "@/app/lib/mongodb"
import React from 'react'



export const user_information = async () => {



    await connectToDB();

    const db = client.db("active_users");
    const collection = db.collection("user_information");

    const toFind = {
        username: "user400",
    };

    const toGet = await collection.find(toFind).toArray();
    console.log(toGet);

    const get_username = toGet.map((user) => user.name)

    const getUsername = `${get_username}`; // this converts the value of the variable to string
    return (
        <>
        </>
    )
}
