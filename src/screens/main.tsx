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

const checkmarkColor = '#000000'
const highlightColor = '#ff0000'
const boxOutlineColor = '#000000'

export default function MainScreen() {
  const [checked, setChecked] = React.useState<boolean>(false)

  const handleCheckboxPress = useCallback(() => {
    setChecked(prev => !prev)
  }, [])

  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      px={4}
      flex={1}
    >
      <VStack space={5} alignItems="center">
        <TaskItem isDone={checked} onToggleCheckbox={handleCheckboxPress} />
        <Box p={10} bg={useColorModeValue('red.500', 'yellow.500')}>
          <Text>Main page</Text>
        </Box>
        <ThemeToggle />
      </VStack>
    </Center>
  )
}
