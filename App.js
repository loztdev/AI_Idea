import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from './src/screens/ChatScreen';
import ModelSelectorScreen from './src/screens/ModelSelectorScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Chat">
        <Stack.Screen 
          name="Chat" 
          component={ChatScreen}
          options={{ title: 'OpenRouter Chat' }}
        />
        <Stack.Screen 
          name="ModelSelector" 
          component={ModelSelectorScreen}
          options={{ title: 'Select Model' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
