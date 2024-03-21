import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import Secondlogin from '../Screens/Secondlogin';
import AppLoading from '../Screens/AppLoading';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="AppLoading"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="AppLoading"
        component={AppLoading}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Secondlogin"
        component={Secondlogin}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
