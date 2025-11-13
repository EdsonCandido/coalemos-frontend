import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
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
  Image,
  Input,
  Text,
} from '@chakra-ui/react'
import { FileUploader } from 'devextreme-react'
import { findBannerByCod, storeBanner } from '@/services/banners.http'
import Loading from '@/components/ui/Loading'

type Input = {
  isOpen: boolean
  bannerId: number | null
  setBannerId: (value: number | null) => void
  setIsOpenModal: (value: boolean) => void
  onSuccess: () => Promise<void>
}

const ModalBanner = ({
  onSuccess,
  isOpen,
  bannerId,
  setIsOpenModal,
  setBannerId,
}: Input) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

  const [descricao, setDescricao] = useState('')
  const [dt_inicio, setDt_inicio] = useState('')
  const [dt_fim, setDt_fim] = useState('')
  const [arquivo, setArquivo] = useState<File>()
  const [arquivo64, setArquivo64] = useState('')

  const [isEditModal, setIsEditModal] = useState(false)

  const onSubmit = async () => {
    setIsLoadingSubmit(true)

    toast.dismiss()

    let isInvalid = false

    if (dt_inicio.length < 1) {
      toast.warn('Data de inicio não pode ser vazia', { position: 'top-left' })
      isInvalid = true
    }
    if (dt_fim.length < 1) {
      toast.warn('Data final não pode ser vazia', { position: 'top-left' })
      isInvalid = true
    }

    if (dt_inicio > dt_fim) {
      toast.warn('Data de inicio não pode ser maior que a data final', {
        position: 'top-left',
      })
      isInvalid = true
    }

    if (!isEditModal) {
      if (!arquivo) {
        toast.warn('Você deve anexar um banner', { position: 'top-left' })
        isInvalid = true
      }
    }

    if (isInvalid) {
      toast.warn('Preença todos os campos corretamente', {
        position: 'top-left',
      })
      setTimeout(() => {
        setIsLoadingSubmit(false)
      }, 1500)

      return
    }

    const result = await storeBanner({
      data_vigencia_inicial: dt_inicio,
      data_vigencia_final: dt_fim,
      descricao,
      arquivo: arquivo as unknown as string,
      cod: Number(bannerId),
    })

    if (result.success) {
      if (isEditModal) {
        toast.success('Banner editado com sucesso!', { position: 'top-left' })
      } else {
        toast.success('Banner cadastrado com sucesso!', {
          position: 'top-left',
        })
      }

      setIsLoadingSubmit(false)
      onCloseModal()
    } else {
      console.error(result)
      toast.warn(result.message)
    }

    setIsLoadingSubmit(false)
    await onSuccess()
  }

  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString)
    return date.toISOString().split('T')[0] // Formato YYYY-MM-DD
  }

  const onLoadBanner = async () => {
    if (bannerId) {
      const query = await findBannerByCod(bannerId)

      if (query.success) {
        setDescricao(query.data!.descricao)
        setDt_fim(formatDateForInput(query.data!.data_vigencia_final))
        setDt_inicio(formatDateForInput(query.data!.data_vigencia_inicial))
        setArquivo64(String(query.data?.arquivo))
      }
    }
  }

  const onCloseModal = () => {
    setDescricao('')

    setIsOpenModal(false)
    setDt_fim('')
    setDt_inicio('')
    setBannerId(null)
  }

  const onInit = async () => {
    setIsLoading(true)
    if (bannerId) {
      await onLoadBanner()
      setIsEditModal(true)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (isOpen) {
      void onInit()
    }
  }, [isOpen])

  useEffect(() => {
    const getBase64Async = async () => {
      if (arquivo) {
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64 = reader.result as string

          const base64WithoutPrefix = base64
          // .split(',')[1]

          setArquivo64(base64WithoutPrefix)
        }
        reader.readAsDataURL(arquivo)
      }
    }

    if (arquivo) {
      void getBase64Async()
    }
  }, [arquivo])

  return (
    <Drawer
      onClose={onCloseModal}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      isOpen={isOpen}
      size={'sm'}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader as="p">
          {bannerId ? 'Editar Banner' : 'Novo Banner'}
        </DrawerHeader>
        <DrawerBody>
          {isLoading ? (
            <Loading />
          ) : (
            <Flex w={'100%'} p={1} gap={1} flexDir={'column'}>
              <Flex w={'100%'} p={1} gap={1} flexDir={'column'}>
                <Text>Descrição</Text>
                <Input
                  isDisabled={isLoadingSubmit}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  type="text"
                />
              </Flex>
              <Flex>
                <Flex w={'50%'} p={1} gap={1} flexDir={'column'}>
                  <Flex>
                    <Text>Data Inicio</Text>
                    <span style={{ color: 'red' }}>*</span>
                  </Flex>
                  <Input
                    isDisabled={isLoadingSubmit}
                    value={dt_inicio}
                    onChange={(e) => setDt_inicio(e.target.value)}
                    type="date"
                  />
                </Flex>
                <Flex w={'50%'} p={1} gap={1} flexDir={'column'}>
                  <Flex>
                    <Text>Data Fim</Text>
                    <span style={{ color: 'red' }}>*</span>
                  </Flex>
                  <Input
                    isDisabled={isLoadingSubmit}
                    value={dt_fim}
                    onChange={(e) => setDt_fim(e.target.value)}
                    type="date"
                  />
                </Flex>
              </Flex>
              <Flex p={1} align={'center'}>
                <Flex direction={'column'}>
                  <Flex>
                    <Text>Banner</Text>
                    <span style={{ color: 'red' }}>*</span>
                  </Flex>
                  <FileUploader
                    accept="image/*"
                    value={arquivo ? [arquivo] : []}
                    onValueChange={(e) => {
                      if (e && e[0]) {
                        setArquivo(e[0])
                      } else {
                        setArquivo(undefined)
                      }
                    }}
                    uploadMode="useForm"
                  />
                </Flex>
              </Flex>
              {arquivo64 && (
                <Flex align={'center'} justify={'center'}>
                  <Image src={`${arquivo64}`} alt="banner" width={'80%'} />
                </Flex>
              )}
            </Flex>
          )}
        </DrawerBody>
        <DrawerFooter>
          {!isLoading && (
            <>
              <Button variant="outline" mr={3} onClick={onCloseModal}>
                Cancelar
              </Button>
              <Button
                colorScheme="blue"
                onClick={onSubmit}
                isDisabled={isLoadingSubmit}
              >
                Salvar
              </Button>
            </>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default ModalBanner
