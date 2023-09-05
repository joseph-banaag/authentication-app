import React from "react";
import { CircularProgress } from "@nextui-org/react";

export default function ProgressStatus() {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <CircularProgress
      aria-label="Loading..."
      size="md"
      value={value}
      color="secondary"
      showValueLabel={true}
    />
  );
}
