import { useEffect, useState } from 'react';
import { Button, Flex, Input, Stack, Text } from '@chakra-ui/react';
import CheckPicker from 'rsuite/CheckPicker';

import 'rsuite/CheckPicker/styles/index.css';
import { findCity, findUF } from '@/services/clients.http';

type tProps = {
  isLoadingPage: boolean;
  onSearch: () => Promise<void>;
};
const FiltroClientes = ({ isLoadingPage, onSearch }: tProps) => {
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);

  const [nomeCliente, setNomeCliente] = useState('');
  const [citys, setCitys] = useState<null | string[]>([]);
  const [ufs, setUfs] = useState<null | string[]>([]);

  const onSubmit = async () => {
    setIsDisabledSubmit(true);
    onSearch();
    setIsDisabledSubmit(false);
  };
  const onInit = async () => {
    setIsDisabledSubmit(true);
    const [requestCity, requestUf] = await Promise.all([findCity(), findUF()]);

    if (requestCity.success) setCitys(requestCity.data);

    if (requestUf.success) setUfs(requestUf.data);

    setIsDisabledSubmit(false);
  };

  useEffect(() => {
    void onInit();
  }, []);
  return (
    <Stack w={'100%'} bg={'white'} borderRadius={'5px'} p={'10px'} gap={'10px'} boxShadow={'lg'}>
      <Flex gap={2} w={'100%'}>
        <Flex w={'100%'} p={1} gap={1} flexDir={'column'}>
          <Flex>
            <Text>Nome</Text>
          </Flex>
          <Input
            placeholder="Nome"
            isDisabled={isLoadingPage || isDisabledSubmit}
            value={nomeCliente}
            onChange={(e) => setNomeCliente(e.target.value)}
            type="text"
          />
        </Flex>
        <Flex w={'100%'} p={1} gap={1} flexDirection={'column'}>
          <Flex>
            <Text>Estados</Text>
          </Flex>
          <CheckPicker
            disabled={isLoadingPage || isDisabledSubmit}
            data={[]}
            size="md"
            style={{ width: '100%' }}
            cleanable
            virtualized
          />
        </Flex>
        <Flex w={'100%'} p={1} gap={1} flexDirection={'column'}>
          <Flex>
            <Text>Cidades</Text>
          </Flex>
          <CheckPicker
            disabled={isLoadingPage || isDisabledSubmit}
            data={[]}
            size="md"
            style={{ width: '100%' }}
            cleanable
            virtualized
          />
        </Flex>
      </Flex>
      <Flex w={'100%'} justify={'flex-end'}>
        <Button onClick={onSubmit} isLoading={isLoadingPage || isDisabledSubmit} colorScheme="blue">
          Buscar
        </Button>
      </Flex>
    </Stack>
  );
};

export default FiltroClientes;
