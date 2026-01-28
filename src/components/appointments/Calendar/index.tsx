import type { tAgendamentos } from '@/types/types';
import {
  Badge as ChakraBadge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { Badge } from 'rsuite';
import Calendar from 'rsuite/Calendar';
import 'rsuite/Calendar/styles/index.css';

type tInput = {
  dataRequest: tAgendamentos[];
  onOpenModal: (value: number | null) => void;
};

const Styles = () => {
  return <style>{`.bg-gray { background-color: rgba(242, 242, 242, 0.3);}`}</style>;
};

function getTodoList(date: Date) {
  const day = date.getDate();

  switch (day) {
    case 10:
      return [
        { time: '10:30 am', title: 'Meeting' },
        { time: '12:00 pm', title: 'Lunch' },
        { time: '12:01 pm', title: 'Lunch' },
        { time: '12:02 pm', title: 'Lunch' },
        { time: '12:03 pm', title: 'Lunch' },
        { time: '12:04 pm', title: 'Lunch' },
      ];
    case 15:
      return [
        { time: '09:30 pm', title: 'Products Introduction Meeting' },
        { time: '12:30 pm', title: 'Client entertaining' },
        { time: '02:00 pm', title: 'Product design discussion' },
        { time: '05:00 pm', title: 'Product test and acceptance' },
        { time: '06:30 pm', title: 'Reporting' },
        { time: '10:00 pm', title: 'Going home to walk the dog' },
      ];
    default:
      return [];
  }
}
function renderCell(date: Date) {
  const list = getTodoList(date);
  const displayList = list.slice(0, 2);

  if (!list.length) return null;

  return (
    <ul className="calendar-todo-list">
      {displayList.map((item, index) => (
        <li key={index}>
          <Badge /> <b>{item.time}</b> - {item.title}
        </li>
      ))}

      {list.length > 2 && (
        <li>
          <small>+{list.length - 2} mais</small>
        </li>
      )}
    </ul>
  );
}
const CalendarComponent = (props: tInput) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const events = useMemo(() => {
    if (!selectedDate) return [];
    return getTodoList(selectedDate);
  }, [selectedDate]);

  function handleSelect(date: Date) {
    const list = getTodoList(date);

    if (!list.length) return;

    setSelectedDate(date);
    onOpen();
  }
  return (
    <Stack w="100%" bg="white" borderRadius="5px" p="10px" gap="10px" boxShadow="lg">
      <Flex justifyContent="flex-end">
        <Button colorScheme="blue" onClick={() => props.onOpenModal(null)}>
          Novo agendamento
        </Button>
      </Flex>

      <Styles />
      <Calendar
        bordered
        renderCell={renderCell}
        defaultDate={new Date()}
        onSelect={handleSelect}
        cellClassName={(date: Date) => (date.getDay() % 2 ? 'bg-gray' : undefined)}
      />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader>Eventos — {selectedDate?.toLocaleDateString('pt-BR')}</DrawerHeader>

          <DrawerBody>
            {events.length === 0 && <Text>Nenhum evento para este dia.</Text>}

            <Stack spacing="3">
              {events.map((event, index) => (
                <Box key={index} p="3" border="1px solid" borderColor="gray.200" borderRadius="md">
                  <Flex align="center" gap="2">
                    <ChakraBadge colorScheme="blue">{event.time}</ChakraBadge>

                    <Text fontWeight="medium">{event.title}</Text>
                  </Flex>
                </Box>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
};

export default CalendarComponent;
