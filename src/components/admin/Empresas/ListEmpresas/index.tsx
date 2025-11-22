import { memo } from 'react';
import { Flex, Stack, Text } from '@chakra-ui/react';

import { DataGrid } from 'devextreme-react';
import { Column, Pager, Paging, SearchPanel, Selection } from 'devextreme-react/data-grid';
import { dateFormat, formatCpfCnpj } from '@/utils/mask';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaSearch, FaTimesCircle } from 'react-icons/fa';
import { IconButton } from 'rsuite';

import { changeActiveBannerByCod } from '@/services/banners.http';
import Loading from '@/components/ui/Loading';
import type { tEmpresas } from '@/types/types';

type tInput = {
  isLoadingPage: boolean;
  onPressModal: (value: number | null) => void;
  dataFormat: tEmpresas[];
  onSuccess: () => Promise<void>;
};

const ListEmpresa = ({ dataFormat, isLoadingPage, onPressModal, onSuccess }: tInput) => {
  const openModalEdit = (value: number) => {
    onPressModal(value);
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

  const handleAtivo = async (cod: number, is_ativo: boolean) => {
    const result = await changeActiveBannerByCod(cod);

    if (result.success) {
      toast.success(`${is_ativo ? 'Desativado' : 'Ativado'} com sucesso`);
      await onSuccess();
    } else {
      toast.error(result.message);
    }
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
              caption={' - '}
              dataField="cod"
              alignment={'center'}
              fixedPosition={'right'}
              type="buttons"
              width={'120px'}
              allowResizing={false}
              cellRender={(e) => (
                <Flex gap={3} justifyContent={'center'} align={'center'}>
                  <IconButton icon={<FaSearch color="gray" size={20} />} onClick={() => openModalEdit(e.row.data.cod)} />

                  {e.row.data.is_ativo ? (
                    <IconButton
                      icon={<FaTimesCircle color="#e53e3e" size={20} />}
                      onClick={() => {
                        handleAtivo(e.row.data.cod, e.row.data.is_ativo);
                      }}
                    />
                  ) : (
                    <IconButton
                      icon={<FaCheckCircle color="#38a169" size={20} />}
                      onClick={() => handleAtivo(e.row.data.cod, e.row.data.is_ativo)}
                    />
                  )}
                </Flex>
              )}
            />
            <Column caption="Ativo" alignment={'center'} dataField="is_ativo" cellRender={(e) => handerSimNao(e.value)} />

            <Column
              caption="CNPJ"
              alignment={'center'}
              dataField="cnpj"
              cellRender={(e) => <Text>{formatCpfCnpj(e.value)}</Text>}
            />
            <Column caption="Nome Fant." dataField="nome_fantasia" cellRender={(e) => <Text>{e.value}</Text>} />
            <Column caption="Razão Soc." dataField="razao_social" cellRender={(e) => <Text>{e.value}</Text>} />
            <Column caption="UF" dataField="uf" alignment={'center'} cellRender={(e) => <Text>{e.value}</Text>} />
            <Column
              caption="Criado em."
              dataField="created_at"
              minWidth={100}
              cellRender={(e) => <Text> {dateFormat(e.value, 'dd/MM/yyyy')}</Text>}
            />
          </DataGrid>
        </Stack>
      )}
    </>
  );
};

export default memo(ListEmpresa);
