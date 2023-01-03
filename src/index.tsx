import React, { useCallback, useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import MainScreen from './screens/main-screen'
import AboutScreen from './screens/about-screen'
import Sidebar from './components/sidebar'
import * as database from './utils/database'
import ListsScreen from './screens/lists-screen'

const Drawer = createDrawerNavigator()

const App = () => {
  const startDatabase = useCallback(() => {
    database.init().then(() => {
      console.log('database initiaded successfully')
    })
  }, [])

  useEffect(() => {
    startDatabase()
  }, [])

  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={props => <Sidebar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'back',
        overlayColor: '#00000000'
      }}
    >
      <Drawer.Screen name="Main" component={MainScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Lists" component={ListsScreen} />
    </Drawer.Navigator>
  )
}

export default App
