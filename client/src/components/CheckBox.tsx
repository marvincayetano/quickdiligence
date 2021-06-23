import { Checkbox, Stack } from "@chakra-ui/react";
import React from "react";

interface CheckBoxProps {
  name: string;
  description: string;
}

export const CheckBox: React.FC<CheckBoxProps> = ({ name, description }) => {
  return (
    <Stack spacing={10} ml="2rem" mt="2rem" direction="row">
      <Checkbox size="lg" colorScheme="green" defaultChecked>
        <span style={{ fontSize: "2rem", color: "#55575A" }}>
          {description}
        </span>
      </Checkbox>
    </Stack>
  );
};