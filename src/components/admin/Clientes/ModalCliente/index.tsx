import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Loading from '../../../ui/Loading';
import { toast } from 'react-toastify';
import { findCEP, findClientById, storeClient } from '@/services/clients.http';
import type { tClientes } from '@/types/types';
import { formatCpfCnpj, formatPhone, maskCep } from '@/utils/mask';
import { manterApenasNumeros } from '@/utils/format';

type input = {
  clientId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};
const ModalCliente = ({ clientId, isOpen, onClose, onSuccess }: input) => {
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const [objectClient, setObjectClient] = useState<tClientes>({
    cpf_cnpj: '',
    logradouro: '',
    nome: '',
    bairro: '',
    cep: '',
    cidade: '',
    complemento: '',
    estado: '',
    email: '',
    numero: '',
    telefone: '',
  });
  const onCloseModal = () => {
    void onClose();
    setObjectClient({
      cpf_cnpj: '',
      logradouro: '',
      nome: '',
      bairro: '',
      cep: '',
      cidade: '',
      complemento: '',
      estado: '',
      email: '',
      numero: '',
      telefone: '',
    });
  };

  const onHandlerCnpj = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const valueFormat = formatCpfCnpj(value);
    setObjectClient((prev) => ({
      ...prev,
      cpf_cnpj: valueFormat,
    }));
  };

  const onChangeTelefone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const valueFormat = formatPhone(value);
    setObjectClient((prev) => ({
      ...prev,
      telefone: valueFormat,
    }));
  };

  const onChangeCep = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setObjectClient((prev) => ({
      ...prev,
      cep: maskCep(value),
    }));
  };

  const onSubmit = async () => {
    setIsLoadingSubmit(true);

    const payload = {
      ...objectClient,
      cod: clientId ? clientId : undefined,
      cpf_cnpj: manterApenasNumeros(objectClient.cpf_cnpj),
      cep: objectClient.cep ? manterApenasNumeros(objectClient.cep) : '',
      telefone: manterApenasNumeros(`${objectClient.telefone}`),
    };

    const request = await storeClient(payload);

    if (request.success) {
      void onCloseModal();
      void onSuccess();
    } else {
      toast.warn(request.message, { position: 'top-left' });
    }
  };

  const onInit = async () => {
    setIsLoadingPage(true);
    if (clientId) {
      const userExist = await findClientById(clientId);

      if (userExist.success) {
        setObjectClient({
          ...(userExist.data as tClientes),
          cep: maskCep(userExist.data?.cep || ''),
          cpf_cnpj: formatCpfCnpj(userExist.data?.cpf_cnpj || ''),
          telefone: formatPhone(userExist.data?.telefone || ''),
        });
      }
    }

    setIsLoadingPage(false);
  };

  const onSearchCEP = async () => {
    setIsLoadingSubmit(true);
    const find = await findCEP(String(objectClient.cep));

    if (find.success) {
      setObjectClient((prev) => ({
        ...prev,
        logradouro: find.data?.logradouro || '',
        cidade: find.data?.localidade || '',
        bairro: find.data?.bairro || '',
        estado: find.data?.uf || '',
      }));
    }
    setIsLoadingSubmit(false);
  };

  useEffect(() => {
    if (objectClient.cep?.length === 10) {
      void onSearchCEP();
    }
  }, [objectClient.cep]);

  useEffect(() => {
    if (isOpen) {
      void onInit();
    }
  }, [isOpen]);
  return (
    <Drawer onClose={onCloseModal} closeOnOverlayClick={false} closeOnEsc={false} isOpen={isOpen} size={'md'}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader as="p">{clientId ? 'Editar Cliente' : 'Novo Cliente'}</DrawerHeader>
        <DrawerBody>
          <Flex w={'100%'}>
            {isLoadingPage ? (
              <Loading />
            ) : (
              <Flex w={'100%'} flexDir={'column'} gap={2}>
                <FormControl isRequired>
                  <FormLabel>Nome</FormLabel>
                  <Input
                    value={objectClient.nome}
                    onChange={(e) => setObjectClient({ ...objectClient, nome: e.target.value })}
                    isDisabled={isLoadingSubmit}
                    type="text"
                  />
                </FormControl>
                <Flex w={'100%'} flexDir={'row'} gap={2}>
                  <FormControl isRequired>
                    <FormLabel>CPF / CNPJ</FormLabel>
                    <Input
                      maxLength={18}
                      value={objectClient.cpf_cnpj}
                      onChange={onHandlerCnpj}
                      isDisabled={isLoadingSubmit}
                      type="text"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Telefone</FormLabel>
                    <Input value={objectClient.telefone} onChange={onChangeTelefone} isDisabled={isLoadingSubmit} type="text" />
                  </FormControl>
                </Flex>
                <FormControl>
                  <FormLabel>E-mail</FormLabel>
                  <Input
                    value={objectClient.email}
                    onChange={(e) => setObjectClient({ ...objectClient, email: e.target.value })}
                    isDisabled={isLoadingSubmit}
                    type="text"
                  />
                </FormControl>
                <Flex w={'100%'} flexDir={'row'} gap={2}>
                  <FormControl>
                    <FormLabel>CEP</FormLabel>
                    <Input
                      placeholder="00000-000"
                      value={objectClient.cep}
                      maxLength={10}
                      onChange={onChangeCep}
                      isDisabled={isLoadingSubmit}
                      type="text"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Número</FormLabel>
                    <Input
                      value={objectClient.numero}
                      onChange={(e) => setObjectClient({ ...objectClient, numero: e.target.value })}
                      isDisabled={isLoadingSubmit}
                      type="text"
                    />
                  </FormControl>
                </Flex>
                <FormControl>
                  <FormLabel>Logradouro</FormLabel>
                  <Input
                    value={objectClient.logradouro}
                    onChange={(e) => setObjectClient({ ...objectClient, logradouro: e.target.value })}
                    isDisabled={isLoadingSubmit}
                    type="text"
                  />
                </FormControl>

                <Flex w={'100%'} flexDir={'row'} gap={2}>
                  <FormControl>
                    <FormLabel>Bairro</FormLabel>
                    <Input
                      value={objectClient.bairro}
                      onChange={(e) => setObjectClient({ ...objectClient, bairro: e.target.value })}
                      isDisabled={isLoadingSubmit}
                      type="text"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Estado</FormLabel>
                    <Input
                      value={objectClient.estado}
                      onChange={(e) => setObjectClient({ ...objectClient, estado: e.target.value })}
                      isDisabled={isLoadingSubmit}
                      type="text"
                    />
                  </FormControl>
                </Flex>
              </Flex>
            )}
          </Flex>
        </DrawerBody>
        <DrawerFooter>
          {!isLoadingPage && (
            <>
              <Button variant="outline" mr={3} onClick={onCloseModal}>
                Cancelar
              </Button>
              <Button colorScheme="blue" onClick={onSubmit} isDisabled={isLoadingSubmit}>
                Salvar
              </Button>
            </>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ModalCliente;
