import React from 'react'

interface User {
    user_name: string
}

export default function UserDetails(user_name: User) {
    console.log(user_name)
    return (
        <div>UserDetails</div>
    )
}
