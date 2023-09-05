import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function ConfirmPasswordReset() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        size="sm"
        variant="light"
        classNames="!hover:bg-none"
        className="cursor-pointer max-w-fit !hover:bg-none -ms-3"
      >
        <h1 className="text-xs sm:font-normal text-violet-600 font-small flex justify-center items-center">
          Forgot password?
        </h1>
      </Button>

      <Modal
        placement="center"
        size="2xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
                <ModalHeader className="flex flex-col gap-1">
                  <h1 className="sm:text-4xl text-xl sm:font-medium font-normal mb-1">
                    Recover your account
                  </h1>
                </ModalHeader>
                <ModalBody>
                  <p className="sm:text-medium text-xs sm:font-normal font-small">
                    Please enter your email address to reset your password
                  </p>

                </ModalBody>
                <ModalFooter>
                  <Button
                    color="default"
                    variant="light"
                    size="sm"
                    onPress={onClose}
                  >
                    <p className="text-red-500 font-semibold">Cancel</p>
                  </Button>
                  <Button
                    color="secondary"
                    variant="ghost"
                    size="sm"
                    type="submit"
                    onPress={onClose}
                  >
                    <p className="text-white font-semibold">Reset</p>
                  </Button>
                </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
