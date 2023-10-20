"use client";
import React from "react";
import { Card, CardBody, Button, CardFooter } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AlertSpinner from "@/components/lib/AlertSpinner";

export default function NoAccountFound(): React.JSX.Element | null {
  const [clicked, setClicked] = React.useState(false);
  const router = useRouter();

  const handleClick = () => {
    setClicked(!clicked);
    router.push("/");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 100 }}
        transition={{ delay: 1, ease: "easeOut", duration: 0.7 }}
      >
        <div className="warningMessageContainer">
          <Card className="warningMessageWrapper" shadow="sm">
            <CardBody>
              <p className="warningMessageCardBody">
                An error occurred. No account found. Please create an account...
              </p>
            </CardBody>
            <CardFooter className="warningMessageCardFooter">
              <Button
                onClick={handleClick}
                color="secondary"
                size="sm"
                variant="bordered"
                className="warningMessageSubmitBtn"
              >
                <div className="warningMessageSubmitContent">
                  {clicked ? <AlertSpinner /> : "OK"}
                </div>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </motion.div>
    </>
  );
}
