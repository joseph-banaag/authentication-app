import React from 'react'

export default function Loading() {
  return (
    <div className="w-full min-h-screen flex flex-1 justify-center items-center">
      <div>Loading from home page</div>
      <p>NOTE: this loading page will be shown if a homepage, sign-in and sign-up page will encounter problem</p>

    </div>
  )
}
// TODO: create loading animation for the pages
// https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming