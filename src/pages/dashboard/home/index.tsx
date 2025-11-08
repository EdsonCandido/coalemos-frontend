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
          <Card size="md" boxShadow={'lg'} w={'100%'}>
            <CardHeader>
              <Heading
                size="md"
                fontSize={'md'}
                fontWeight="400"
                color="gray.500"
              >
                {' '}
                Card - md
              </Heading>
            </CardHeader>
            <CardBody color="fg.muted">adipiscing elit.</CardBody>
          </Card>
          <Card size="md" boxShadow={'lg'} w={'100%'}>
            <CardHeader>
              <Heading
                size="md"
                fontSize={'md'}
                fontWeight="400"
                color="gray.500"
              >
                {' '}
                Card - md
              </Heading>
            </CardHeader>
            <CardBody color="fg.muted">adipiscing elit.</CardBody>
          </Card>
          <Card size="md" boxShadow={'lg'} w={'100%'}>
            <CardHeader>
              <Heading
                size="md"
                fontSize={'md'}
                fontWeight="400"
                color="gray.500"
              >
                {' '}
                Card - md
              </Heading>
            </CardHeader>
            <CardBody color="fg.muted">adipiscing elit.</CardBody>
          </Card>
          <Card size="md" boxShadow={'lg'} w={'100%'}>
            <CardHeader>
              <Heading
                size="md"
                fontSize={'md'}
                fontWeight="400"
                color="gray.500"
              >
                {' '}
                Card - md
              </Heading>
            </CardHeader>
            <CardBody color="fg.muted">adipiscing elit.</CardBody>
          </Card>
        </Flex>
      </Stack>
    </Flex>
  )
}

export default memo(DashboardHomePage)
