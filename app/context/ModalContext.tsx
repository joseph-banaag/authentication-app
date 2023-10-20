"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface ModalContextType {
  displayOn: boolean;
  setDisplayOn: (displayOn: boolean) => void;
  resetReq: boolean;
  setResetReq: (resetReq: boolean) => void;
  updateUserInfo: boolean;
  setUpdateUserInfo: (updateUserInfo: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const ModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element | null => {
  const [displayOn, setDisplayOn] = useState<boolean>(false);
  const [resetReq, setResetReq] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [updateUserInfo, setUpdateUserInfo] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <>
      <ModalContext.Provider
        value={{
          displayOn,
          setDisplayOn,
          resetReq,
          setResetReq,
          updateUserInfo,
          setUpdateUserInfo,
        }}
      >
        {children}
      </ModalContext.Provider>
    </>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "useModalContext should be use within the ModalContextProvider. Add the Provided to your Route Layout.",
    );
  }
  return context;
};

export default ModalContextProvider;
