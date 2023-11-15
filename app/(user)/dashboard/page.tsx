"use client";
import { deleteToken } from "@/app/actions/deleteToken";
import { motion } from "framer-motion";
import React, { Suspense, useEffect, useState } from "react";

type UserType = {
  _id: string | null;
  username: string | null;
  email: string | null;
  password: string | null;
  created_on: string | null;
};

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  useEffect(() => {
    const StoredUsername = {
      data:
        typeof window !== "undefined"
          ? sessionStorage.getItem("session_name")
          : null,
    };

    const username = StoredUsername.data;

    const getUser = async () => {
      const response = await fetch(
        `http://localhost:3000/api/authed-user?q=${username}`,
      );

      const data = await response.json();
      const verified = data?.user;
      const verified_user = verified?.username;
      const currentUser = data?.current_user;

      console.log(username);
      console.log(verified_user);
      console.log(currentUser);

      if (username === verified_user) {
        console.log("true");
      }

      // todo: create a logic that will check user value and params value if matched, continue. if not. delete the cookie by calling a server component to delete the cookie to route the use back to log in.

      setCurrentUser(data);
    };
    getUser();
  }, []);

  console.log(currentUser);

  return (
    <main>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "backIn", duration: 1 }}
        className="pageContainer"
      >
        <div className="p-5 gap-3 flex flex-1 flex-col justify-start items-center">
          <Suspense fallback={<p>Loading current user</p>}>
            <h1 className="textHeadingResponsive text-center">Welcome, {}</h1>
          </Suspense>
          <p className="textBaseColor">
            This page will contain everything about the dashboard. If the
            application is an e-commerce store, all items like cart items will
            be shown here.
          </p>
        </div>
      </motion.div>
    </main>
  );
}
