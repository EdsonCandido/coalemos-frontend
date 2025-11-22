import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { useEffect, useMemo, useState } from 'react';

import { useNavigate } from 'react-router';
import type { tEmpresas } from '@/types/types';
import { findBanners } from '@/services/banners.http';
import ListEmpresas from '@/components/admin/Empresas/ListEmpresas';
import { findCompanies } from '@/services/companis.http';

const EmpresasAdmin = () => {
  const router = useNavigate();

  const [codPrimary, setCodPrimary] = useState<null | number>(null);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [dataRequest, setDataRequest] = useState<null | tEmpresas[]>(null);

  const onPressModal = (value: number | null = null) => {
    setIsOpenModal(true);
    setCodPrimary(value);
  };

  const onInit = async () => {
    setIsLoadingPage(true);

    const result = await findCompanies();

    if (result.success) {
      setDataRequest(result?.data);
    }

    setTimeout(() => {
      setIsLoadingPage(false);
    }, 1500);
  };

  const dataFormat = useMemo(() => {
    if (!dataRequest) return [];

    return dataRequest?.map((i, index) => {
      return {
        index,
        ...i,
      };
    });
  }, [dataRequest]);

  useEffect(() => {
    void onInit();
  }, []);
  return (
    <>
      <Flex flexDir={'column'} justifyContent={'center'} alignItems={'flex-start'} gap={'10px'}>
        <Flex>
          <Text
            cursor={'pointer'}
            onClick={() => router(-1)}
            _hover={{
              textDecoration: 'underline',
              color: 'blue',
            }}
          >
            {' '}
            Configurações / Admin / Empresas
          </Text>
        </Flex>
        <Stack w={'100%'} bg={'white'} borderRadius={'5px'} p={'10px'} gap={'10px'} boxShadow={'lg'}>
          <Flex w={'100%'} justify={'space-between'}>
            <Flex w={'100%'}></Flex>
            <Flex w={'100%'} justify={'flex-end'}>
              <Button
                onClick={() => onPressModal()}
                isDisabled={isLoadingPage}
                isLoading={isLoadingPage}
                colorScheme="green"
                size={'sm'}
                leftIcon={<FaPlus />}
              >
                {' '}
                Novo{' '}
              </Button>
            </Flex>
          </Flex>
        </Stack>

        <ListEmpresas dataFormat={dataFormat} isLoadingPage={isLoadingPage} onPressModal={onPressModal} onSuccess={onInit} />
        {/*{isOpenModal && (
          <ModalEmpresas
            onSuccess={onInit}
            isOpen={isOpenModal}
            setIsOpenModal={setIsOpenModal}
            setCodPrimary={setCodPrimary}
            codPrimary={codPrimary}
          />
        )}*/}
      </Flex>
    </>
  );
};

export default EmpresasAdmin;
