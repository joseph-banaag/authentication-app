import { extendVariants, Switch, Button } from "@nextui-org/react";

export const MySwitch = extendVariants(Switch, {
  variants: {
    color: {
      cyan: {
        wrapper: [
          "group-data-[selected=true]:bg-[#095028]",
          "group-data-[selected=true]:text-default-foreground",
        ],
      },
    },
    size: {
      sm: {
        wrapper: "w-10 h-6 mr-2",
        thumb: [
          "w-4 h-4 text-tiny",
          //selected
          "group-data-[selected=true]:ml-4",
        ],
        endContent: "text-tiny",
        startContent: "text-tiny",
        label: "text-small",
      },
    },
  },
});

export const MyButton = extendVariants(Button, {
  variants: {
    size: {
      md: "px-unit-4 sm:min-w-unit-24 min-w-unit-4 h-unit-10 text-small gap-unit-2 rounded-medium ",
    },
  },
});
