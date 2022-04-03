import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Button, Alert, ScrollView } from 'react-native';
import StartScreen from './components/Start';
import ChatScreen from './components/Chat';
import CustomActions from './components/CustomActions';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';


const Stack = createStackNavigator();

export default class App extends React.Component {
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
        >
          <Stack.Screen
            name="StartScreen"
            component={StartScreen}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
