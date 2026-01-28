import { useEffect, useMemo, useState, type ReactNode } from 'react';
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
  Textarea,
} from '@chakra-ui/react';
import Loading from '@/components/ui/Loading';

import DatePicker from 'rsuite/DatePicker';
import 'rsuite/DatePicker/styles/index.css';

import SelectPicker from 'rsuite/SelectPicker';
import 'rsuite/SelectPicker/styles/index.css';

import SpinnerIcon from '@rsuite/icons/legacy/Spinner';

import { z } from 'zod';
import { tAppointmentStatus } from '@/types/types';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
const schema = z.object({
  cod_usuario_responsavel: z.number(),
  data_agendamento: z.string(),
  titulo: z.string({ required_error: 'O titulo do agendamento é obrigatorio' }).trim().min(1, 'Campo obrigatório'),
  descricao: z.string(),
  status_agendamento: z.nativeEnum(tAppointmentStatus, {
    errorMap: () => ({ message: 'Status obrigatório' }),
  }),

  cod_cliente: z.number().optional(),
});

type tForm = z.infer<typeof schema>;
type tProps = {
  isOpen: boolean;
  onClose: () => void;
  codPrimary: number | null;
  onSuccess: () => void;
};

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map((item) => ({
  label: item,
  value: item,
}));
const ModalAppointments = (props: tProps) => {
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const [items, setItems] = useState(data);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<tForm>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      data_agendamento: new Date().toISOString(),
      status_agendamento: tAppointmentStatus.AGENDADO,
    },
  });

  const updateData = () => {
    if (items.length === 0) {
      setItems(data);
    }
  };

  const renderMenu = (menu: ReactNode) => {
    if (items.length === 0) {
      return (
        <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
          <SpinnerIcon spin /> Loading...
        </p>
      );
    }
    return menu;
  };

  const dataSelectPicker = useMemo(() => {
    return ['agendado', 'confirmado', 'cancelado', 'concluido'].map((e) => {
      return {
        label: e,
        value: e,
      };
    });
  }, []);
  const onCloseModal = () => {
    props.onClose();
  };

  const onPressSubmit = async (e: tForm) => {
    console.log(e);
  };

  const onInit = async () => {
    setIsLoadingPage(true);
    if (props.codPrimary) {
      /**
       * TODO pesquisa cliente por id
       */
    }

    setTimeout(() => {
      setIsLoadingPage(false);
    }, 500);
  };

  useEffect(() => {
    if (props.isOpen) {
      void onInit();
    }
  }, [props.isOpen]);
  return (
    <Drawer onClose={onCloseModal} closeOnOverlayClick={false} closeOnEsc={false} isOpen={props.isOpen} size={'sm'}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader as="p">{props.codPrimary ? 'Editar Agendamento' : 'Novo Agendamento'}</DrawerHeader>
        <DrawerBody>
          <Flex w={'100%'}>
            {isLoadingPage ? (
              <Flex w={'100%'} justifyContent={'center'} alignItems={'center'}>
                <Loading />
              </Flex>
            ) : (
              <Flex w={'100%'} justifyContent={'center'} alignItems={'center'} gap={2} flexDirection={'column'}>
                <FormControl id="data_agendamento">
                  <FormLabel>Para o dia</FormLabel>
                  <Controller
                    control={control}
                    name="data_agendamento"
                    render={({ field }) => (
                      <DatePicker
                        size={'md'}
                        style={{ width: '100%', justifyContent: 'center' }}
                        value={field.value ? new Date(field.value) : null}
                        onChange={(date) => field.onChange(date?.toISOString())}
                        container={() => document.body}
                        oneTap
                        cleanable={false}
                      />
                    )}
                  />
                  {errors.titulo && <span style={{ color: 'red', fontSize: '12px' }}>{errors.data_agendamento?.message}</span>}
                </FormControl>
                <FormControl id="cod_usuario_responsavel">
                  <FormLabel>Para o dia</FormLabel>
                  <Controller
                    control={control}
                    name="cod_usuario_responsavel"
                    render={({ field }) => (
                      <SelectPicker
                        size="md"
                        data={items}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Selecione um item"
                        style={{ width: '100%' }}
                        onOpen={updateData}
                        onSearch={updateData}
                        renderMenu={renderMenu}
                      />
                    )}
                  />
                  {errors.titulo && <span style={{ color: 'red', fontSize: '12px' }}>{errors.data_agendamento?.message}</span>}
                </FormControl>
                <FormControl id="titulo" isRequired>
                  <FormLabel>Titulo</FormLabel>
                  <Input {...register('titulo')} isDisabled={isSubmitting} type="text" />
                  {errors.titulo && <span style={{ color: 'red', fontSize: '12px' }}>{errors.titulo?.message}</span>}
                </FormControl>
                <FormControl id="descricao">
                  <FormLabel>Descrição</FormLabel>
                  <Textarea {...register('descricao')} isDisabled={isSubmitting} rows={2} />
                  {errors.titulo && <span style={{ color: 'red', fontSize: '12px' }}>{errors.descricao?.message}</span>}
                </FormControl>

                <FormControl id="status_agendamento">
                  <FormLabel>Status</FormLabel>
                  <Controller
                    control={control}
                    name="status_agendamento"
                    render={({ field }) => (
                      <SelectPicker
                        size={'md'}
                        value={field.value ? field.value : null}
                        data={dataSelectPicker}
                        onChange={(value) => field.onChange(value)}
                        style={{ width: '100%' }}
                      />
                    )}
                  />
                  {errors.titulo && <span style={{ color: 'red', fontSize: '12px' }}>{errors.status_agendamento?.message}</span>}
                </FormControl>
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
              <Button colorScheme="blue" onClick={handleSubmit(onPressSubmit)} isDisabled={isSubmitting}>
                Salvar
              </Button>
            </>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ModalAppointments;
