import { memo, useEffect, useMemo, useState } from 'react'
import { Flex, Stack } from '@chakra-ui/react'
import type { tBanners } from '@/types/types'
import { findCurrentBanners } from '@/services/banners.http'
import Loading from '@/components/ui/Loading'
import Carousel from '@/components/ui/Carousel'

const PainelPage = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(false)
  const [banners, setBanners] = useState<tBanners[] | null>(null)

  const formatBanner = useMemo(() => {
    if (!banners) return []

    return banners.map((i) => ({
      src: String(i.arquivo),
      alt: String(i.descricao),
    }))
  }, [banners])
  const onInit = async () => {
    setIsLoadingPage(true)
    const result = await findCurrentBanners()
    if (result.success) {
      setBanners(result.data)
    }
    setIsLoadingPage(false)
  }

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
      <Stack
        w={'100%'}
        bg={'white'}
        borderRadius={'5px'}
        p={'10px'}
        gap={'10px'}
        boxShadow={'lg'}
      >
        {isLoadingPage ? <Loading /> : <Carousel images={formatBanner} />}
      </Stack>
    </Flex>
  )
}
export default memo(PainelPage)
