import { Image } from "@nextui-org/react";
import React from "react";
import { Company } from "@/components/constants";

const BrandLogoSignIn = (): React.JSX.Element | null => {
  return (
    <>
      <div className="formBrandContainer">
        <Image
          src={Company.imgSrc}
          alt={Company.name}
          width={100}
          height={100}
          style={{
            objectFit: "cover",
          }}
          className="drop-shadow-md"
        />
      </div>

      <div className="py-3 px-2">
        <h1 className="formSignHeader">Sign in</h1>
        <p className="formSignText">to access {Company.name} </p>
      </div>
    </>
  );
};

export default BrandLogoSignIn;
