import { Checkbox, Stack } from "@chakra-ui/react";
import React from "react";

interface CheckBoxProps {
  name: string;
  description: string;
  currentOptions: [string];
  setCurrentOptions: any;
}

export const CheckBox: React.FC<CheckBoxProps> = ({
  name,
  description,
  currentOptions,
  setCurrentOptions,
}) => {
  return (
    <Stack spacing={10} m="2rem" direction="row">
      <Checkbox
        size="lg"
        colorScheme="green"
        defaultChecked
        onChange={(e) => {
          // If true then add to the array
          if (e.target.checked) {
            setCurrentOptions(...currentOptions, name);
          } else {
            // If false then remove from the array
            setCurrentOptions(
              currentOptions.filter((option) => option !== name)
            );
          }
        }}
      >
        <span
          style={{ fontSize: "2rem", color: "#55575A", marginLeft: "1rem" }}
        >
          {description}
        </span>
      </Checkbox>
    </Stack>
  );
};
