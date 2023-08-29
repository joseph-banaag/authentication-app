import { extendVariants, Switch } from "@nextui-org/react";


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
