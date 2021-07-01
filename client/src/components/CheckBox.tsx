import { Stack } from "@chakra-ui/react";
import React from "react";

interface CheckBoxProps {
  description: string;
}

export const CheckBox: React.FC<CheckBoxProps> = ({ description }) => {
  return (
    <Stack
      spacing={10}
      m="2rem"
      direction="row"
      display="flex"
      justifyContent="center"
    >
      <span
        style={{
          textAlign: "center",
          fontSize: "2rem",
          color: "#55575A",
          marginLeft: "1rem",
        }}
      >
        {description}
      </span>
    </Stack>
  );
};
