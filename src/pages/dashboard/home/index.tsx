import { memo, useEffect } from 'react';
import { Card, CardBody, CardHeader, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { TbZoomMoney } from 'react-icons/tb';
import { FaArrowTrendUp } from 'react-icons/fa6';

import { numberFormater, numberForMoney } from '@/utils/mask';
import GraficoResumoUltimosTresMeses from '@/components/dashboard/home/GraficoResumoUltimosTresMeses';
import GraficoResumoAnual from '@/components/dashboard/home/GraficoResumoAnual';
import GraficoReceitasDia from '@/components/dashboard/home/GraficoReceitasDia';

const DashboardHomePage = () => {
  const onInit = () => {};

  useEffect(() => {
    void onInit();
  }, []);
  return (
    <Flex flexDir={'column'} justifyContent={'center'} alignItems={'flex-start'} gap={'10px'}>
      <Flex>
        <Text
          cursor={'pointer'}
          _hover={{
            textDecoration: 'underline',
            color: 'blue',
          }}
        >
          {' '}
          Dashboard
        </Text>
      </Flex>
      <Stack
        w={'100%'}
        // bg={'white'}
        borderRadius={'5px'}
        // p={'10px'}
        gap={'10px'}
        // boxShadow={'lg'}
      >
        <Flex gap={5} p={1} w={'100%'} justify={'space-between'} align={'flex-start'}>
          <Flex flexDir={'column'} gap={5} w={'100%'}>
            <Flex justify={'space-between'} align={'center'} w={'100%'} gap={5}>
              <Card size="md" boxShadow={'lg'} w={'100%'} backgroundColor={'green.300'}>
                <CardHeader display={'flex'} gap={1} style={{ alignItems: 'center' }}>
                  <FaArrowDown color={'#fff'} />
                  <Heading size="xl" fontSize={'xl'} fontWeight="800" color="#fff" textTransform={'uppercase'}>
                    {' '}
                    Entradas
                  </Heading>
                </CardHeader>
                <CardBody color="#fff" fontSize={'xl'}>
                  {numberForMoney(0)}
                </CardBody>
              </Card>

              <Card size="md" boxShadow={'lg'} w={'100%'} backgroundColor={'red.300'}>
                <CardHeader display={'flex'} gap={1} style={{ alignItems: 'center' }}>
                  <FaArrowUp color={'#fff'} />
                  <Heading size="xl" fontSize={'xl'} fontWeight="800" color="#fff" textTransform={'uppercase'}>
                    {' '}
                    Saídas
                  </Heading>
                </CardHeader>
                <CardBody color="#fff" fontSize={'xl'}>
                  {numberForMoney(0)}
                </CardBody>
              </Card>
            </Flex>
            <Flex justify={'space-between'} align={'center'} w={'100%'} gap={5}>
              <Card size="md" boxShadow={'lg'} w={'100%'} backgroundColor={'blue.300'}>
                <CardHeader display={'flex'} gap={1} style={{ alignItems: 'center' }}>
                  <FaArrowTrendUp color={'#fff'} size={30} />
                  <Heading size="xl" fontSize={'18px'} fontWeight="800" color="#fff" textTransform={'uppercase'}>
                    {' '}
                    Crescimento Financeiro (%)
                  </Heading>
                </CardHeader>
                <CardBody color="#fff" fontSize={'xl'}>
                  {numberFormater(0)}
                </CardBody>
              </Card>

              <Card size="md" boxShadow={'lg'} w={'100%'} backgroundColor={'orange.300'}>
                <CardHeader display={'flex'} gap={1} style={{ alignItems: 'center' }}>
                  <TbZoomMoney color={'#fff'} size={30} />
                  <Heading size="xl" fontSize={'xl'} fontWeight="800" color="#fff" textTransform={'uppercase'}>
                    {' '}
                    Inadimplentes
                  </Heading>
                </CardHeader>
                <CardBody color="#fff" fontSize={'xl'}>
                  {numberFormater(0)}
                </CardBody>
              </Card>
            </Flex>
          </Flex>

          <Flex bg={'white'} borderRadius={'5px'} boxShadow={'lg'} justify={'space-between'} align={'center'} w={'100%'}>
            <GraficoResumoUltimosTresMeses />
          </Flex>
        </Flex>
        <Flex w={'100%'} bg={'white'} borderRadius={'5px'} boxShadow={'lg'}>
          <GraficoReceitasDia />
        </Flex>
        <Flex w={'100%'} bg={'white'} borderRadius={'5px'} boxShadow={'lg'}>
          <GraficoResumoAnual />
        </Flex>
      </Stack>
    </Flex>
  );
};

export default memo(DashboardHomePage);
