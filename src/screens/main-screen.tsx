import React, { useState, useCallback } from 'react'
import {
  Text,
  Box,
  Center,
  VStack,
  themeTools,
  useTheme,
  useColorMode,
  useColorModeValue
} from 'native-base'
import { Pressable } from 'react-native'

import ThemeToggle from '../components/theme-toggle'
import TaskItem from '../components/task-item'

export default function MainScreen() {
  const [checked, setChecked] = useState<boolean>(false)
  const [subject, setSubject] = useState('Task Item')
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const handleCheckboxPress = useCallback(() => {
    setChecked(prev => !prev)
  }, [])

  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      // px={4}
      flex={1}
    >
      <VStack space={5} alignItems="center" w="full">
        <TaskItem
          isDone={checked}
          isEditing={isEditing}
          onToggleCheckbox={handleCheckboxPress}
          subject={subject}
          onChangeSubject={setSubject}
          onFinishEditing={() => setIsEditing(false)}
          onPressLabel={() => setIsEditing(true)}
        />
        <ThemeToggle />
      </VStack>
    </Center>
  )
}
