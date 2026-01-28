import ModalCliente from '@/components/admin/Clientes/ModalCliente';
import FiltroClientes from '@/components/clientes/FiltroClientes';
import TabelaClientes from '@/components/clientes/TabelaClientes';
import Loading from '@/components/ui/Loading';
import { findClient } from '@/services/clients.http';
import type { tClientes } from '@/types/types';
import { Flex, Stack } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

const ClientPage = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [dataRequest, setDataRequest] = useState<tClientes[] | null>([]);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [codPrimary, setCodPrimary] = useState<null | number>(null);

  const onOpenModal = (value: number | null = null) => {
    setIsOpenModal(true);
    setCodPrimary(value);
  };

  const onCloseModal = () => {
    setIsOpenModal(false);
    setCodPrimary(null);
  };

  const dataFormat: tClientes[] = useMemo(() => {
    if (!dataRequest) return [];
    return dataRequest;
  }, [dataRequest]);

  const onSearchClient = async ({
    search,
    uf,
    cidade,
    cpf_cnpj,
  }: {
    cpf_cnpj?: string;
    search?: string;
    uf?: string;
    cidade?: string;
  }) => {
    setIsLoadingPage(true);
    const result = await findClient({ search, uf, cidade, cpf_cnpj });
    if (result.success) {
      setDataRequest(result?.data);
    }
    setIsLoadingPage(false);
  };

  const onInit = async () => {
    setIsLoadingPage(true);
    void onSearchClient({});
    setIsLoadingPage(false);
  };

  useEffect(() => {
    void onInit();
  }, []);
  return (
    <Flex flexDir={'column'} justifyContent={'center'} alignItems={'flex-start'} gap={'10px'}>
      <FiltroClientes isLoadingPage={isLoadingPage} onSearch={onSearchClient} onOpenModal={onOpenModal} />

      <Stack w={'100%'} bg={'white'} borderRadius={'5px'} p={'10px'} gap={'10px'} boxShadow={'lg'}>
        {isLoadingPage ? (
          <Loading />
        ) : (
          <TabelaClientes dataFormat={dataFormat} isLoadingPage={isLoadingPage} onPressModal={onOpenModal} onSuccess={onInit} />
        )}
      </Stack>

      {isOpenModal && <ModalCliente clientId={codPrimary} isOpen={isOpenModal} onClose={onCloseModal} onSuccess={onInit} />}
    </Flex>
  );
};

export default ClientPage;
