import React from 'react'

export default function NavbarUserProfile() {

    const username = "username", email = "josephrbanaag51@gmail.com"

    return (
        <>
            <div className="px-1.5 ms-2">
                <p className="text-sm font-bold">{username}</p>
                <div className="max-w-[100px] overflow-hidden">
                    <p className="text-xs font-thin dark:text-foreground/60 animate-scrolling-text">{email}</p>
                </div>
            </div>
        </>
    )
}
