"use client";
import { getUser } from "@/app/actions/verified";
import { motion } from "framer-motion";
import React, { Suspense, useEffect, useState } from "react";
import { session_name } from "@/app/actions/verified";

export default function Dashboard() {
  const [username, setUsername] = useState<string | undefined>(undefined);

  useEffect(() => {
    getUser();
    const getCurrentUser = async () => {
      const response = await fetch(
        `http://localhost:3000/api/users?q=${session_name}`,
        {
          cache: "force-cache",
          method: "GET",
        },
      );
      const data = await response.json();
      const username = data?.username;

      setUsername(username);

      return data;
    };
    getCurrentUser();
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
}
