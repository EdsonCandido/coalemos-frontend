import CalendarComponent from '@/components/appointments/Calendar';
import ModalAppointments from '@/components/appointments/ModalAppointments';
import Loading from '@/components/ui/Loading';
import { findMyAppointments } from '@/services/appointments.http';
import type { tAgendamentos } from '@/types/types';
import { Flex, Stack } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

const AppointmentsPage = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [codPrimary, setCodPrimary] = useState<null | number>(null);
  const [dataRequest, setDataRequest] = useState<null | Array<tAgendamentos>>([]);

  const onCloseModal = () => {
    setIsOpenModal(false);
    setCodPrimary(null);
  };

  const onOpenModal = (value: number | null = null) => {
    setIsOpenModal(true);
    setCodPrimary(value);
  };

  const dataFormat = useMemo(() => {
    if (!dataRequest) return [];
    return dataRequest;
  }, [dataRequest]);
  const onInit = async () => {
    setIsLoadingPage(true);

    const result = await findMyAppointments();

    if (result.success) {
      setDataRequest(result.data);
    }

    setTimeout(() => {
      setIsLoadingPage(false);
    }, 300);
  };

  useEffect(() => {
    void onInit();
  }, []);
  return (
    <>
      <Flex flexDir={'column'} justifyContent={'center'} alignItems={'flex-start'} gap={'10px'}>
        <Stack w={'100%'} bg={'white'} borderRadius={'5px'} p={'10px'} gap={'10px'} boxShadow={'lg'}>
          {isLoadingPage ? <Loading /> : <CalendarComponent dataRequest={dataFormat} onOpenModal={onOpenModal} />}
        </Stack>
      </Flex>
      <ModalAppointments isOpen={isOpenModal} onClose={onCloseModal} codPrimary={codPrimary} onSuccess={onInit} />
    </>
  );
};

export default AppointmentsPage;
