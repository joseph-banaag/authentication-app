import { extendVariants, Switch, Button, Input } from "@nextui-org/react";

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
  },
});

export const MyButton = extendVariants(Button, {
  variants: {
    color: {
      teal: "bg-[#042f2e]",
    },
    size: {
      md: "px-unit-4 sm:min-w-unit-24 min-w-unit-4 h-unit-10 text-small gap-unit-2 rounded-medium bg-primary/20",
    },
  },
});


