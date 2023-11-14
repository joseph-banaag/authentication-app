"use client";
import { userAuth } from "@/app/actions/userAuth";
import { usersRoute } from "@/app/api/apis";
import { motion } from "framer-motion";
import { get } from "http";
import React, { useEffect, useState } from "react";

const getUser = async () => {
  const response = await fetch(usersRoute);
  const data = await response.json();
  console.log(data);
  return data;
};

export default (function Dashboard() {
  const [user, setUser] = useState<string | undefined>(undefined);
  const user_data = getUser();
  console.log(user_data);

  useEffect(() => {
    const isAuth = userAuth();
    console.log(isAuth);
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
          <h1 className="textHeadingResponsive text-center">Welcome, {user}</h1>
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
