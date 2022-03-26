import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView } from 'react-native';
import startScreen from './components/start';
import chatScreen from './components/chat';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="startScreen"
        >
          <Stack.Screen
            name="startScreen"
            component={startScreen}
          />
          <Stack.Screen
            name="chatScreen"
            component={chatScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
