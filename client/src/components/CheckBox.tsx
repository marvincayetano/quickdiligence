import { QuestionIcon } from "@chakra-ui/icons";
import { Stack, Tooltip } from "@chakra-ui/react";
import React from "react";

interface CheckBoxProps {
  description: string;
  tip: string;
}

export const CheckBox: React.FC<CheckBoxProps> = ({ description, tip }) => {
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
          fontSize: "2.3rem",
          color: "#55575A",
          marginLeft: "1rem",
          marginRight: "5px",
        }}
      >
        {description}
      </span>
      <Tooltip label={tip} fontSize="xl">
        <QuestionIcon color="gray.300" width="6" height="6" />
      </Tooltip>
    </Stack>
  );
};
