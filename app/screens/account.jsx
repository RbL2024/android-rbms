import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

import GDim from "@/hooks/useDimension";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

import Logpage from "../subscreens/accountScreen/logpage";
import Regpage from "../subscreens/accountScreen/regpage";
import Accountmain from "../subscreens/accountScreen/accountmain";


const storeData = async (username, password) => {
  try {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('password', password); // Note: Storing passwords is not secure
  } catch (e) {
      console.error('Failed to save data', e);
  }
};
const getData = async () => {
  try {
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      
      if (username !== null && password !== null) {
          // Use the retrieved data
          console.log('Username:', username);
          console.log('Password:', password);
      }
  } catch (e) {
      console.error('Failed to fetch data', e);
  }
};


const AccountMainStack = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedInStatus = await AsyncStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedInStatus === 'true');
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);
  return (
    <Stack.Navigator initialRouteName={isLoggedIn?"ACmainPage":"LOGPage"}>
      <Stack.Screen
        name="LOGPage"
        component={Logpage}
        options={{
          headerShown: false,
          title: "",
          headerTintColor: "#FFFFFF",
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: "js-reg",
          },
        }}
      />
      <Stack.Screen
        name="ACmainPage"
        component={Accountmain}
        options={{
          title: "",
          headerShown: false,
          headerTintColor: "#FFFFFF",
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: "js-reg",
          },
        }}
      />
    </Stack.Navigator>
  );
};


export default function Account() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, {
      // paddingTop: insets.top,
      // paddingBottom: insets.bottom,
      // paddingLeft: insets.left,
      // paddingRight: insets.right,
    }]}>
      <Tab.Navigator>
        <Tab.Screen
          name="Login"
          component={AccountMainStack}
          options={{
            tabBarStyle: {
              display: 'none',
              backgroundColor: '#D6D6CA',
              height: GDim.height * 0.045
            },
            tabBarIndicatorStyle: {
              backgroundColor: '#355E3B'
            }
          }} />
        <Tab.Screen
          name="Register"
          component={Regpage}
          options={{
            tabBarStyle: {
              display: 'none',
              backgroundColor: '#D6D6CA',
              height: GDim.height * 0.045
            },
            tabBarIndicatorStyle: {
              backgroundColor: '#355E3B'
            }
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
