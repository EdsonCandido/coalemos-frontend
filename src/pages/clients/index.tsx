import FiltroClientes from '@/components/clientes/FiltroClientes';
import TabelaClientes from '@/components/clientes/TabelaClientes';
import Loading from '@/components/ui/Loading';
import { Flex, Stack } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

const ClientPage = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const [dataRequest, setDataRequest] = useState<[]>([]);

  const dataFormat = useMemo(() => {
    if (!dataRequest) return [];
    return dataRequest;
  }, [dataRequest]);

  const onInit = async () => {
    setIsLoadingPage(true);
  };

  useEffect(() => {
    void onInit();
  }, []);
  return (
    <Flex flexDir={'column'} justifyContent={'center'} alignItems={'flex-start'} gap={'10px'}>
      <FiltroClientes isLoadingPage={isLoadingPage} />

      <Stack w={'100%'} bg={'white'} borderRadius={'5px'} p={'10px'} gap={'10px'} boxShadow={'lg'}>
        {isLoadingPage ? <Loading /> : <TabelaClientes dataRequest={[]} />}
      </Stack>
    </Flex>
  );
};

export default ClientPage;
