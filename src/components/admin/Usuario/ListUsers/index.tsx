import { Flex, Stack, Text } from '@chakra-ui/react';
import { DataGrid } from 'devextreme-react';
import { Column, Pager, Paging, SearchPanel, Selection } from 'devextreme-react/data-grid';
import { FaCheckCircle, FaSearch, FaTimesCircle } from 'react-icons/fa';
import { IconButton } from 'rsuite';
import type { tUsuarios } from '@/types/types';
import Loading from '@/components/ui/Loading';
import { dateFormat } from '@/utils/mask';
import { changeActiveUser } from '@/services/users.http';
import { toast } from 'react-toastify';

type Input = {
  isLoadingPage: boolean;
  onPressModal: (value: number | null) => void;
  dataFormat: tUsuarios[];
  onSuccess: () => Promise<void>;
};

const ListUser = ({ isLoadingPage, dataFormat, onPressModal, onSuccess }: Input) => {
  const openModalEdit = (value: number) => {
    onPressModal(value);
  };

  const handleAtivo = async (cod: number, is_ativo: boolean) => {
    const result = await changeActiveUser(cod);
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
        <IconButton icon={<FaSearch color="gray" size={20} />} onClick={() => openModalEdit(key)} />

        {isActive ? (
          <IconButton icon={<FaTimesCircle color="#e53e3e" size={20} />} onClick={() => handleAtivo(key, isActive)} />
        ) : (
          <IconButton icon={<FaCheckCircle color="#38a169" size={20} />} onClick={() => handleAtivo(key, isActive)} />
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
            {/*<Column
              caption={" - "}
              dataField={"cod"}
              alignment={"center"}
              fixedPosition={"right"}
              type="buttons"
              width={"50px"}
              allowResizing={false}
            >
              <ButtonGrid
                icon="search"
                onClick={(e: { row: { data: { cod: number } } }) => {
                  openModalEdit(e.row.data.cod);
                }}
              />
            </Column>*/}
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
            <Column
              caption="Usuário"
              dataField="nome"
              minWidth={110}
              alignment={'center'}
              cellRender={(e) => <Text>{e.value}</Text>}
            />
            <Column caption="Login" alignment={'center'} dataField="login" />
            {/*<Column
              caption="CPF"
              alignment={"center"}
              dataField="cpf"
              cellRender={(e) => <Text>{formatCpfCnpj(e.value)}</Text>}
            />*/}
            <Column caption="Perfil" alignment={'center'} dataField="perfil" cellRender={(e) => e.value.toUpperCase()} />
            <Column caption="Ativo" alignment={'center'} dataField="is_ativo" cellRender={(e) => handerSimNao(e.value)} />
            <Column
              caption="Primeiro Acesso"
              alignment={'center'}
              dataField="is_primeiro_acesso"
              cellRender={(e) => handerSimNao(e.value)}
            />
          </DataGrid>
        </Stack>
      )}
    </>
  );
};

export default ListUser;
