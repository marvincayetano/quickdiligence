import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { OptionButton } from "./OptionButton";

// TODO: Create options typescript interface
interface OptionsContainerProps {
  options: Object[];
  setOptions: Function;
}

// TODO: Cannot unselect all. Single type must have atleast one

export const OptionsContainer: React.FC<OptionsContainerProps> = ({
  options,
  setOptions,
}) => {
  const setCurrentOption = (option: Object) => {
    console.log(option);
    setOptions([...options, option]);
    // TODO: Add async here to add time before doing the reload
    window.location.reload();
  };

  const removeOption = (title: string) => {
    console.log(options);
    setOptions(options.filter((option: Object) => option.title !== title));
    window.location.reload();
  };

  return (
    <Box
      display="flex"
      maxW="1000px"
      p={5}
      shadow="md"
      mb={5}
      borderWidth="1px"
    >
      <Flex flexDir="column">
        <Text fontWeight={600} fontSize="lg" mt={4} pb={5}>
          Currently Selected
        </Text>
        <Flex pb={5} flexWrap="wrap">
          {options.map((option) => (
            <OptionButton
              key={option.title}
              category={option.category}
              title={option.title}
              borderColor="tomato"
              isAdd={false}
              options={options}
              selected={true}
              removeOption={removeOption}
            />
          ))}
        </Flex>

        <Text fontWeight={600} fontSize="lg" mt={4} pb={5}>
          Type
        </Text>
        <Flex pb={5}>
          <OptionButton
            category="Type"
            title="cat"
            options={options}
            setOption={setCurrentOption}
          />
          <OptionButton
            category="Type"
            title="dog"
            options={options}
            setOption={setCurrentOption}
          />
        </Flex>
        <Text fontWeight={600} fontSize="lg" mt={4} pb={5}>
          Location
        </Text>
        <Flex pb={5}>
          <OptionButton
            category="Location"
            title="Ottawa Humane Society"
            locationId={1}
            options={options}
            setOption={setCurrentOption}
          />
          <OptionButton
            category="Location"
            title="Toronto Humane Society"
            locationId={2}
            options={options}
            setOption={setCurrentOption}
          />
          <OptionButton
            category="Location"
            title="Ontario SPCA"
            locationId={3}
            options={options}
            setOption={setCurrentOption}
          />
        </Flex>
        <Text fontWeight={600} fontSize="lg" mt={4} pb={5}>
          Posted by
        </Text>
        <Flex pb={5}>
          <OptionButton
            category="User"
            title="Admin"
            options={options}
            setOption={setCurrentOption}
          />
          <OptionButton
            category="User"
            title="Users"
            options={options}
            setOption={setCurrentOption}
          />
        </Flex>
      </Flex>
    </Box>
  );
};
