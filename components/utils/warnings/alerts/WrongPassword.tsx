"use client"
import React from "react";
import { Card, CardBody, Button, CardFooter } from "@nextui-org/react";
import AlertSpinner from "@/components/lib/AlertSpinner";


export default function WrongPassword() {
  const [ clicked, setClicked ] = React.useState(false)

  const handleClick = () => {
    const newClick = !clicked;
    setClicked(newClick)

    setTimeout(() => {
      location.reload()
    }, 1000);
  }

  return (
    <>
      <div className="warningMessageContainer">
        <Card
          className="warningMessageWrapper"
        >
          <CardBody>
            <p className="warningMessageCardBody">
              Username and password do not match. Please try again...
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
                {clicked
                  ? <AlertSpinner />
                  : "OK"}
              </div>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}


