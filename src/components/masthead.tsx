import React from 'react'
import { ImageSourcePropType } from 'react-native'
import { Box, VStack, Heading, Image, useColorModeValue } from 'native-base'

interface Props {
  title: string
  image?: ImageSourcePropType
  children: React.ReactNode
}

const Masthead = ({ title, image, children }: Props) => {
  return image ? (
    <VStack h="300px">
      <Image
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        w="full"
        h="300px"
        resizeMode="cover"
        source={image}
        alt="masthead image"
      />
      {children}
      <Box flex={1} />
      <Heading color="white" p={6} size="xl">
        {title}
      </Heading>
    </VStack>
  ) : (
    <VStack h="230px" bg={useColorModeValue('blue.500', 'blue.400')}>
      {children}
      <Heading m={0} color="white" px={6} size="xl">
        {title}
      </Heading>
    </VStack>
  )
}

export default Masthead
