"use client"
import React from 'react'

// DATA FROM THE SERVER
async function getData() {
  const res = await fetch("api/users", {
    method: "GET"
  })
  if (!res.ok) {
    throw new Error("There was a problem getting information form the API")
  }
  return res.json()
}

// SIGN UP ENTRY POINT
export const Db_userInformation_from_SU = (user_name: any) => {
  console.log(user_name)
}

// SIGN IN ENTRY POINT
export const Db_userInformation_from_SI = (user_name: any) => {
  console.log(user_name)
}

const getUserDetails_fromDB = async () => {
  const dataDB = await getData()

  console.log(dataDB)
}


export default function UserInfo_DB() {

  return (
    <>

      {/* 
      // todo: below is what I need to display
      <p className="text-sm font-semibold flex justify-start items-center dark:text-foreground/80">{userInfo.username}</p>

      <p className="text-xs font-thin dark:text-foreground/60">{userInfo.email}</p>
      
      */}

      <h1 className="text-xs font-thin dark:text-green-700">Hello from userInfo_DB</h1>
    </>
  )
}

