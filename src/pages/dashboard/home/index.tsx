import { memo, useEffect } from "react";
import { Flex, Stack, Text } from "@chakra-ui/react";

const DashboardHomePage = () => {
  const onInit = () => {};

  useEffect(() => {
    void onInit();
  }, []);
  return (
    <Flex
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      gap={"10px"}
    >
      <Flex>
        <Text
          cursor={"pointer"}
          _hover={{
            textDecoration: "underline",
            color: "blue",
          }}
        >
          {" "}
          Dashboard
        </Text>
      </Flex>
      <Stack
        w={"100%"}
        bg={"white"}
        borderRadius={"5px"}
        p={"10px"}
        gap={"10px"}
        boxShadow={"lg"}
      ></Stack>
    </Flex>
  );
};

export default memo(DashboardHomePage);
