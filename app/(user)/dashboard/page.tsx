"use client";
import { usersRoute } from "@/app/api/apis";
import { motion } from "framer-motion";
import React, { Suspense, useEffect, useState } from "react";

const getUser = async () => {
  const response = await fetch(usersRoute, {
    cache: "force-cache",
  });
  const data = await response.json();
  console.log(data);
  return data;
};

type UserType = {
  _id: string | null;
  username: string | null;
  email: string | null;
  password: string | null;
  created_on: string | null;
};

export default (function Dashboard() {
  const [user, setUser] = useState<UserType | null>(null);

  const username = user?.username;

  console.log(user);
  console.log(username);

  useEffect(() => {
    const currentUser = async () => {
      const data = await getUser();
      console.log(data);
      setUser(data);
    };
    currentUser();
  }, []);

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
            <h1 className="textHeadingResponsive text-center">
              Welcome, {username}
            </h1>
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
});
