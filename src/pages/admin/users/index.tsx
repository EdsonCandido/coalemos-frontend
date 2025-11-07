import { useEffect, useMemo, useState } from "react";
import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import ListUser from "../../../components/admin/Usuario/ListUsers";

import { useNavigate } from "react-router";
import type { tUsuarios } from "@/types/types";
import { findUserAll } from "@/services/users.http";
import ModalUsuario from "@/components/admin/Usuario/ModalUsuario";

const UsersAdminPage = () => {
  const router = useNavigate();

  const [userId, setUserId] = useState<null | number>(null);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [dataRequest, setDataRequest] = useState<null | tUsuarios[]>(null);

  const onPressModal = (value: number | null = null) => {
    setIsOpenModal(true);
    setUserId(value);
  };

  const onInit = async () => {
    setIsLoadingPage(true);

    const result = await findUserAll();

    if (result.success) {
      setDataRequest(result?.data);
    }

    setTimeout(() => {
      setIsLoadingPage(false);
    }, 1500);
  };

  const dataFormat = useMemo(() => {
    if (!dataRequest) return [];

    return dataRequest;
  }, [dataRequest]);

  useEffect(() => {
    void onInit();
  }, []);
  return (
    <>
      <Flex
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"flex-start"}
        gap={"10px"}
      >
        <Flex>
          <Text
            cursor={"pointer"}
            onClick={() => router(-1)}
            _hover={{
              textDecoration: "underline",
              color: "blue",
            }}
          >
            {" "}
            Configurações / Admin / Usuários
          </Text>
        </Flex>
        <Stack
          w={"100%"}
          bg={"white"}
          borderRadius={"5px"}
          p={"10px"}
          gap={"10px"}
          boxShadow={"lg"}
        >
          <Flex w={"100%"} justify={"space-between"}>
            <Flex w={"100%"}></Flex>
            <Flex w={"100%"} justify={"flex-end"}>
              <Button
                onClick={() => onPressModal()}
                isDisabled={isLoadingPage}
                isLoading={isLoadingPage}
                colorScheme="green"
                size={"sm"}
                leftIcon={<FaPlus />}
              >
                {" "}
                Novo{" "}
              </Button>
            </Flex>
          </Flex>
        </Stack>

        <ListUser
          dataFormat={dataFormat}
          isLoadingPage={isLoadingPage}
          onPressModal={onPressModal}
          onSuccess={onInit}
        />
        {isOpenModal && (
          <ModalUsuario
            onSuccess={onInit}
            isOpen={isOpenModal}
            setIsOpenModal={setIsOpenModal}
            setUserId={setUserId}
            userId={userId}
          />
        )}
      </Flex>
    </>
  );
};

export default UsersAdminPage;
