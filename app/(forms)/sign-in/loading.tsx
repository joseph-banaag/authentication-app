import React from 'react'

export default function Loading() {
    return (
        <div className="w-full min-h-screen flex flex-1 justify-center items-center">
            <div>Your sign in page is loading</div>
            <p>Please wait...</p>

        </div>
    )
}
// TODO: create loading animation for the pages
// https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming