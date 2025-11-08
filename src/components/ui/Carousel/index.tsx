import { Box, Flex, HStack, Image, Text } from '@chakra-ui/react'
import { useState, memo } from 'react'

type tParans = {
  images: Array<{
    src: string
    alt: string
  }>
}
const arrowStyles = {
  cursor: 'pointer',
  top: '50%',
  w: 'auto',
  mt: '-22px',
  p: '16px',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '18px',
  transition: '0.6s ease',
  borderRadius: '0 3px 3px 0',
  _hover: {
    opacity: 0.8,
    bg: 'black',
  },
}
const CarouselComponent = ({ images }: tParans) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slidesCount = images.length
  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1))
  }
  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1))
  }
  const setSlide = (slide: number) => {
    setCurrentSlide(slide)
  }
  const carouselStyle = {
    transition: 'all .5s',
    ml: `-${currentSlide * 100}%`,
  }

  return (
    <Flex
      w="full"
      bg="#edf3f8"
      _dark={{
        bg: '#3e3e3e',
      }}
      // p={10}
      alignItems="center"
      justifyContent="center"
    >
      <Flex w="full" overflow="hidden" pos="relative">
        <Flex h="400px" w="full" {...carouselStyle}>
          {images.map((slide, sid) => (
            <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
              <Text
                color="white"
                fontSize="xs"
                p="8px 12px"
                pos="absolute"
                top="0"
              >
                {sid + 1} / {slidesCount}
              </Text>
              <Image
                src={slide.src}
                alt={slide.alt}
                fallbackSrc="https://placehold.co/1700x400"
                boxSize="full"
                backgroundSize="cover"
              />
            </Box>
          ))}
        </Flex>
        <Text
          {...arrowStyles}
          userSelect={'none'}
          pos={'absolute'}
          left="0"
          onClick={prevSlide}
        >
          &#10094;
        </Text>
        <Text
          {...arrowStyles}
          userSelect={'none'}
          pos={'absolute'}
          right="0"
          onClick={nextSlide}
        >
          &#10095;
        </Text>
        <HStack justify="center" pos="absolute" bottom="8px" w="full">
          {Array.from({
            length: slidesCount,
          }).map((_, slide) => (
            <Box
              key={`dots-${slide}`}
              cursor="pointer"
              boxSize={['7px', null, '15px']}
              m="0 2px"
              bg={currentSlide === slide ? 'blackAlpha.800' : 'blackAlpha.500'}
              rounded="50%"
              display="inline-block"
              transition="background-color 0.6s ease"
              _hover={{
                bg: 'blackAlpha.800',
              }}
              onClick={() => setSlide(slide)}
            ></Box>
          ))}
        </HStack>
      </Flex>
    </Flex>
  )
}

export default memo(CarouselComponent)
