"use client";
import React from "react";
import { Card, CardBody, Button, CardFooter } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import AlertSpinner from "@/components/lib/AlertSpinner";

export default function AccountExist(): React.JSX.Element | null {
  const [clicked, setClicked] = React.useState(false);
  const router = useRouter();

  const handleClick = () => {
    const newClick = !clicked;
    setClicked(newClick);
    document.cookie = `isAuth=`;
    router.push("/sign-in", { scroll: false });
  };

  return (
    <>
      <div className="warningMessageContainer">
        <Card className="warningMessageWrapper">
          <CardBody>
            <p className="warningMessageCardBody">
              You already have an account. Please sign in...
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
    </>
  );
}
