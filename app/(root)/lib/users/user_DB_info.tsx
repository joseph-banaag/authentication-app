import React from 'react'

interface details {
    username: string,
    email: string
}

export default async function User_DB_info({ username, email }: details) {

    // these are from the find() operation
    console.log(username)
    console.log(email)

    return (
        <></>
    )
}
// todo: this will get the username and email address to check the 