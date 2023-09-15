import React from 'react'

interface details {
    username: string,
    email: string
}

export default async function User_DB_info({ username, email }: details) {

    // these are from the database
    console.log(username)
    console.log(email)

    // todo: need username, and email from the From



    return (
        <>
        </>
    )
}
// todo: this will get the username and email address to check the existing account from DB