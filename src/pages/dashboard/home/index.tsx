import { memo, useEffect } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import { FaArrowDown, FaArrowUp, FaMoneyBill } from 'react-icons/fa'

const DashboardHomePage = () => {
  const onInit = () => {}

  useEffect(() => {
    void onInit()
  }, [])
  return (
    <Flex
      flexDir={'column'}
      justifyContent={'center'}
      alignItems={'flex-start'}
      gap={'10px'}
    >
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
        <Flex
          gap={2}
          p={1}
          w={'100%'}
          justify={'space-between'}
          align={'center'}
        >
          <Flex justify={'space-between'} align={'center'} w={'100%'} gap={5}>
            <Card
              size="md"
              boxShadow={'lg'}
              w={'100%'}
              backgroundColor={'green.300'}
            >
              <CardHeader
                display={'flex'}
                gap={1}
                style={{ alignItems: 'center' }}
              >
                <FaArrowDown color={'#fff'} />
                <Heading
                  size="xl"
                  fontSize={'xl'}
                  fontWeight="800"
                  color="#fff"
                  textTransform={'uppercase'}
                >
                  {' '}
                  Entradas
                </Heading>
              </CardHeader>
              <CardBody color="fg.muted">adipiscing elit.</CardBody>
            </Card>
            <Card
              size="md"
              boxShadow={'lg'}
              w={'100%'}
              backgroundColor={'red.300'}
            >
              <CardHeader
                display={'flex'}
                gap={1}
                style={{ alignItems: 'center' }}
              >
                <FaArrowUp color={'#fff'} />
                <Heading
                  size="xl"
                  fontSize={'xl'}
                  fontWeight="800"
                  color="#fff"
                  textTransform={'uppercase'}
                >
                  {' '}
                  Saídas
                </Heading>
              </CardHeader>
              <CardBody color="fg.muted">adipiscing elit.</CardBody>
            </Card>
          </Flex>
          <Flex
            justify={'space-between'}
            align={'center'}
            w={'100%'}
            gap={5}
            border={'1px red solid'}
          ></Flex>
        </Flex>
      </Stack>
    </Flex>
  )
}

export default memo(DashboardHomePage)
