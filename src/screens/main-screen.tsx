import React, { useState, useCallback } from 'react'
import { VStack, useColorModeValue, Fab, Icon } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import shortid from 'shortid'

import AnimatedColorBox from '../components/animated-color-box'
import TaskList, { TaskItemData } from '../components/task-list'
import Masthead from '../components/masthead'
import Navbar from '../components/navbar'

const initialData: Array<TaskItemData> = []
// [
//   {
//     id: shortid.generate(),
//     subject: 'Buy movie tickets for Friday',
//     done: false
//   },
//   {
//     id: shortid.generate(),
//     subject: 'Make a React Native app',
//     done: false
//   }
// ]

export default function MainScreen() {
  const [data, setData] = useState<Array<TaskItemData>>(initialData)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)

  const handleToggleTaskItem = useCallback((item: TaskItemData) => {
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        done: !item.done
      }
      return newData
    })
  }, [])

  const handleChangeTaskItemSubject = useCallback(
    (item: TaskItemData, newSubject: string) => {
      setData(prevData => {
        const newData = [...prevData]
        const index = prevData.indexOf(item)
        newData[index] = {
          ...item,
          subject: newSubject
        }
        return newData
      })
    },
    []
  )

  const handleFinishEditingTaskItem = useCallback((_item: TaskItemData) => {
    setEditingItemId(null)
  }, [])

  const handlePressTaskItemLabel = useCallback((item: TaskItemData) => {
    setEditingItemId(item.id)
  }, [])

  const handleRemoveItem = useCallback((item: TaskItemData) => {
    setData(prevData => {
      const newData = prevData.filter(i => i !== item)
      return newData
    })
  }, [])

  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'primary.900')}
      w="full"
    >
      <Masthead title="Eaee jow!" image={require('../assets/masthead.png')}>
        <Navbar />
      </Masthead>
      <VStack
        flex={1}
        space={1}
        mt="-20px"
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        pt="20px"
        bg={useColorModeValue('warmGray.50', 'primary.900')}
      >
        <TaskList
          data={data}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveItem}
          editingItemId={editingItemId}
        />
      </VStack>
      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.500', 'blue.400')}
        onPress={() => {
          const id = shortid.generate()
          setData([
            {
              id,
              subject: '',
              done: false
            },
            ...data
          ])
          setEditingItemId(id)
        }}
      />
    </AnimatedColorBox>
  )
}
