import React, { useCallback, useEffect, useState } from 'react'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import { useColorModeValue, VStack, Text, Fab, Icon, Input } from 'native-base'
import { AntDesign } from '@expo/vector-icons'

import AnimatedColorBox from '../components/animated-color-box'
import Masthead from '../components/masthead'
import Navbar from '../components/navbar'
import { TaskItemData } from '../components/task-list'
import { getLists } from '../utils/database'

interface ListData {
  name: string
  image?: string
}

const ListsScreen = () => {
  const [lists, setLists] = useState<Array<ListData> | null>(null)
  const [title, setTitle] = useState('')

  const handleChangeTitle = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setTitle(e.nativeEvent.text)
    },
    []
  )

  const handleCreateList = useCallback(() => {}, [])

  const handleFetchLists = async () => {
    const listsData = await getLists()
    console.log('lists:', listsData)
    // setLists(listsData)
  }

  useEffect(() => {
    handleFetchLists()
    console.log('effect!')
  }, [])

  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'primary.900')}
      w="full"
    >
      <Masthead title="Lists" image={require('../assets/masthead.png')}>
        <Navbar />
      </Masthead>
      <VStack
        flex={1}
        space={1}
        mt="-20px"
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        pt="20px"
        px="20px"
        bg={useColorModeValue('warmGray.50', 'primary.900')}
      >
        <Text>Lists veizao</Text>
        <Input placeholder="Title" value={title} onChange={handleChangeTitle} />
        {/* <Input placeholder="Image" onChange={handleChangeTitle} /> */}
        {lists && lists.map(list => <Text>{list.name}</Text>)}
      </VStack>
      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.500', 'blue.400')}
        onPress={handleCreateList}
      />
    </AnimatedColorBox>
  )
}

export default ListsScreen
