import { QuestionIcon } from "@chakra-ui/icons";
import { Stack, Tooltip } from "@chakra-ui/react";
import React from "react";
import { Index__desc } from "../styles/Index";

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
      <Index__desc className="checkbox__desc">{description}</Index__desc>
      <Tooltip label={tip} fontSize="xl">
        <QuestionIcon color="gray.300" width="6" height="6" />
      </Tooltip>
    </Stack>
  );
};
