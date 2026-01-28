import { Flex, Stack, Text, Button } from '@chakra-ui/react';
import { DataGrid } from 'devextreme-react';
import { Column, Pager, Paging, SearchPanel, Selection } from 'devextreme-react/data-grid';
import { FaCheckCircle, FaSearch, FaTimesCircle } from 'react-icons/fa';
import type { tClientes } from '@/types/types';
import Loading from '@/components/ui/Loading';
import { dateFormat, formatCpfCnpj } from '@/utils/mask';
import { toast } from 'react-toastify';
import { changeActiveClient } from '@/services/clients.http';
type tInput = {
  isLoadingPage: boolean;
  onPressModal: (value: number | null) => void;
  dataFormat: tClientes[];
  onSuccess: () => Promise<void>;
};
const TabelaClientes = ({ dataFormat, isLoadingPage, onPressModal, onSuccess }: tInput) => {
  const openModalEdit = (value: number) => {
    onPressModal(value);
  };

  const handleAtivo = async (cod: number, is_ativo: boolean) => {
    const result = await changeActiveClient(cod);
    if (result.success) {
      toast.success(`Usuário ${is_ativo ? 'desativado' : 'ativado'} com sucesso`);
      await onSuccess();
    } else {
      toast.error(result.message);
    }
  };
  const handlerOptions = (key: number, isActive: boolean) => {
    return (
      <Flex gap={3} justifyContent={'center'} align={'center'}>
        <Button size={'sm'} onClick={() => openModalEdit(key)} variant={'outline'}>
          <FaSearch />
        </Button>

        {isActive ? (
          <Button size={'sm'} onClick={() => handleAtivo(key, isActive)} variant={'outline'}>
            <FaTimesCircle color="#e53e3e" />
          </Button>
        ) : (
          <Button size={'sm'} onClick={() => handleAtivo(key, isActive)} variant={'outline'}>
            <FaCheckCircle color="#38a169" />
          </Button>
        )}
      </Flex>
    );
  };
  const handerSimNao = (value: boolean) => {
    return (
      <>
        <p
          style={{
            backgroundColor: value ? '#38a169' : '#e53e3e',
            borderRadius: '5px',
            color: 'white',
            textAlign: 'center',
            height: '20px',
            paddingRight: '5px',
            paddingLeft: '5px',
          }}
        >
          {value ? 'Sim' : 'Não'}
        </p>
      </>
    );
  };
  return (
    <>
      {isLoadingPage ? (
        <Stack w={'100%'} bg={'white'} borderRadius={'5px'} p={'10px'} gap={'10px'} boxShadow={'lg'}>
          <Loading />
        </Stack>
      ) : (
        <Stack w={'100%'} bg={'white'} borderRadius={'5px'} p={'10px'} gap={'10px'} boxShadow={'lg'}>
          <DataGrid
            dataSource={dataFormat}
            keyExpr={'cod'}
            width="100%"
            height={'35hw'}
            hoverStateEnabled={true}
            showRowLines={true}
            allowColumnResizing={true}
            columnAutoWidth={true}
            showBorders={true}
          >
            <Pager
              showPageSizeSelector={true}
              showNavigationButtons={true}
              showInfo={true}
              infoText="Total de itens: {2} "
              visible={true}
            />
            <SearchPanel visible={true} />
            <Paging defaultPageSize={25} enabled={true} />
            <Selection mode="single" />
            <Column
              caption="#"
              dataField="#"
              minWidth={50}
              alignment={'center'}
              cellRender={(e) => handlerOptions(e.data.cod, e.data.is_ativo)}
            />
            <Column
              caption="Criado em."
              dataField="created_at"
              minWidth={100}
              cellRender={(e) => <Text> {dateFormat(e.value, 'dd/MM/yyyy')}</Text>}
            />
            <Column caption="Cliente" dataField="nome" minWidth={110} cellRender={(e) => <Text>{e.value}</Text>} />
            <Column
              caption="CPF/CNPJ"
              alignment={'center'}
              dataField="cpf_cnpj"
              cellRender={(e) => <Text>{formatCpfCnpj(e.value)}</Text>}
            />
            <Column caption="UF" alignment={'center'} dataField="estado" />
            <Column caption="Cidade" dataField="cidade" />
            <Column caption="Bairro" dataField="bairro" />
            <Column caption="Rua" dataField="logradouro" />
            <Column caption="Ativo" alignment={'center'} dataField="is_ativo" cellRender={(e) => handerSimNao(e.value)} />
          </DataGrid>
        </Stack>
      )}
    </>
  );
};

export default TabelaClientes;
