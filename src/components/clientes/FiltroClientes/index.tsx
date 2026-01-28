import { useEffect, useMemo, useState } from 'react';
import { Button, Flex, Input, Stack, Text } from '@chakra-ui/react';
import { findCity, findUF } from '@/services/clients.http';
import SelectPicker from 'rsuite/SelectPicker';
import 'rsuite/SelectPicker/styles/index.css';
import { estados } from '@/mocks/estados';

type tProps = {
  isLoadingPage: boolean;
  onSearch: ({
    cidade,
    search,
    uf,
    cpf_cnpj,
  }: {
    cpf_cnpj?: string;
    search?: string;
    uf?: string;
    cidade?: string;
  }) => Promise<void>;
  onOpenModal: (value: number | null) => void;
};
const FiltroClientes = ({ isLoadingPage, onSearch, onOpenModal }: tProps) => {
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);

  const [searchTxt, setSearchTxt] = useState('');
  const [searchCpfCnpj, setSearchCpfCnpj] = useState('');
  const [citys, setCitys] = useState<null | Array<{ cidade: string }>>([]);
  const [citySelect, setCitySelect] = useState('');
  const [ufs, setUfs] = useState<null | Array<{ estado: string }>>([]);
  const [ufSelect, setUfSelect] = useState('');

  const onSubmit = async () => {
    setIsDisabledSubmit(true);
    await onSearch({ cidade: citySelect, search: searchTxt, uf: ufSelect, cpf_cnpj: searchCpfCnpj });
    setIsDisabledSubmit(false);
  };

  const ufFormat = useMemo(() => {
    if (!ufs) return [];
    return ufs.map((uf) => ({ label: estados.find((e) => e.estcod === uf.estado)?.estnome, value: uf.estado }));
  }, [ufs]);

  const cityFormat = useMemo(() => {
    if (!citys) return [];
    return citys.map((city) => ({ label: city.cidade, value: city.cidade }));
  }, [citys]);

  const onSearchCity = async () => {
    setIsDisabledSubmit(true);
    const [requestCity] = await Promise.all([findCity(ufSelect)]);
    if (requestCity.success) setCitys(requestCity.data);
    setIsDisabledSubmit(false);
  };

  useEffect(() => {
    if (ufSelect) {
      void onSearchCity();
    }
  }, [ufSelect]);
  const onInit = async () => {
    setIsDisabledSubmit(true);
    const [requestUf] = await Promise.all([findUF()]);

    if (requestUf.success) setUfs(requestUf.data);

    setIsDisabledSubmit(false);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      void onSubmit();
    }
  };

  useEffect(() => {
    void onInit();
  }, []);
  return (
    <Stack w={'100%'} bg={'white'} borderRadius={'5px'} p={'10px'} gap={'10px'} boxShadow={'lg'}>
      <Flex gap={2} w={'100%'}>
        <Flex w={'100%'} p={1} gap={1} flexDir={'column'}>
          <Flex>
            <Text>Pesquisar</Text>
          </Flex>
          <Input
            w={'100%'}
            placeholder="Nome/Endereço/E-mail"
            isDisabled={isLoadingPage || isDisabledSubmit}
            value={searchTxt}
            onChange={(e) => setSearchTxt(e.target.value)}
            type="text"
            onKeyUp={onKeyPress}
          />
        </Flex>
        <Flex w={'50%'} p={1} gap={1} flexDir={'column'}>
          <Flex>
            <Text>CPF/CNPJ</Text>
          </Flex>
          <Input
            isDisabled={isLoadingPage || isDisabledSubmit}
            value={searchCpfCnpj}
            onChange={(e) => setSearchCpfCnpj(e.target.value)}
            type="text"
            onKeyUp={onKeyPress}
          />
        </Flex>
        <Flex w={'50%'} p={1} gap={1} flexDirection={'column'}>
          <Flex>
            <Text>Estados</Text>
          </Flex>
          <SelectPicker
            disabled={isLoadingPage || isDisabledSubmit}
            data={ufFormat}
            onChange={(e) => setUfSelect(e as string)}
            size="md"
            style={{ width: '100%' }}
            cleanable
            virtualized
          />
        </Flex>
        <Flex w={'50%'} p={1} gap={1} flexDirection={'column'}>
          <Flex>
            <Text>Cidades</Text>
          </Flex>
          <SelectPicker
            disabled={isLoadingPage || isDisabledSubmit}
            data={cityFormat}
            value={citySelect}
            onChange={(e) => setCitySelect(e as string)}
            size="md"
            style={{ width: '100%' }}
            cleanable
            virtualized
          />
        </Flex>
      </Flex>
      <Flex w={'100%'} justify={'flex-end'} gap={2}>
        <Button onClick={() => onOpenModal(null)} isLoading={isLoadingPage || isDisabledSubmit} colorScheme="green">
          Novo
        </Button>
        <Button onClick={onSubmit} isLoading={isLoadingPage || isDisabledSubmit} colorScheme="blue">
          Buscar
        </Button>
      </Flex>
    </Stack>
  );
};

export default FiltroClientes;
