import { useAuth } from '@/stores/auth-store'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  // Image,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const schema = z.object({
  login: z.string().email('Formato de e-mail inválido'),
  senha: z.string().min(5, 'A senha deve ter pelo menos 6 caracteres'),
})

type LoginFormData = z.infer<typeof schema>

const Login = () => {
  const navigate = useNavigate()

  const { signIn } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  })

  const onPressSubmit = async (e: LoginFormData) => {
    const result = await signIn({ login: e.login, password: e.senha })

    if (result != null) {
      navigate('/painel')
    }
  }

  const onKeyPress = (e: { keyCode: number }) => {
    if (e.keyCode === 13) handleSubmit(onPressSubmit)()
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'flex-end'}
      p={8}
      bg={useColorModeValue('gray.500', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading
          style={{ textAlign: 'center' }}
          lineHeight={1.1}
          fontSize={{ base: '2xl', md: '3xl' }}
        >
          <Flex w={'100%'} justify={'center'} align={'center'}>
            {/* <Image src={Logo} h={150} /> */}
            <Text>COALEMOS</Text>
          </Flex>
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Login</FormLabel>
          <Input
            {...register('login')}
            isDisabled={isSubmitting}
            // value={loginTxt}
            // onChange={(e) => setLoginTxt(e.target.value)}
            type="text"
          />
          {errors.login && (
            <span style={{ color: 'red', fontSize: '12px' }}>
              {errors.login?.message}
            </span>
          )}
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Senha</FormLabel>
          <Input
            {...register('senha')}
            isDisabled={isSubmitting}
            type="password"
            // value={passwordTxt}
            onKeyUp={onKeyPress}
            // onChange={(e) => setPasswordTxt(e.target.value)}
          />
          {errors.senha && (
            <span style={{ color: 'red', fontSize: '12px' }}>
              {errors.senha?.message}
            </span>
          )}
        </FormControl>
        <Stack spacing={6}>
          {/* <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'flex-end'}>
                        <Text cursor={'pointer'} _hover={{ textDecoration: 'underline' }} color={'blue.500'}>Esqueceu sua senha?</Text>
                    </Stack> */}
          <Button
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
            onClick={handleSubmit(onPressSubmit)}
            type="submit"
            bg={'#030067'}
            color={'white'}
            _hover={{
              bg: 'blue.600',
            }}
          >
            Entrar
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}

export default Login
