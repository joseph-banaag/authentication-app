import { Card } from "@nextui-org/react";
import React from "react";

const AlertUserModal = () => {
  return (
    <div className="passwordResetModalContainer">
      <Card className="warningMessageWrapper">
        <h1>You will login again after updating your username. Okay?</h1>
      </Card>
    </div>
  );
};

export default AlertUserModal;
