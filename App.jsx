/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import StackNavigation from './src/navigation/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { UserProvider } from './src/components/UserProvider';


function App() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <UserProvider>
          <NavigationContainer>
            <Provider store={store}>
              <StackNavigation />
            </Provider>
          </NavigationContainer>
        </UserProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

export default App;
