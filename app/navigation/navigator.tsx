import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons as MIcon } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useMyTheme } from "@/hooks/useMyTheme";

import GDim from "@/hooks/useDimension";

//Screens
import HomeScreen from "../screens/home";
import HistoryScreen from "../screens/history";
import NotificationsScreen from "../screens/notifications";
import AccountScreen from "../screens/account";
import RentScreen from "../subscreens/homeScreen/bikes";
import LockScreen from "../subscreens/homeScreen/lock";
import AvailabilityScreen from "../subscreens/homeScreen/availability";
import TTrackScreen from "../subscreens/homeScreen/ttrack";
import BikePreviewScreen from "../subscreens/bikePreview/preview";
import ReserveScreen from "../subscreens/bikePreview/reserve";

import LrpageScreen from "../subscreens/accountScreen/lrpage";
import LogpageScreen from "../subscreens/accountScreen/logpage";
import RegpageScreen from "../subscreens/accountScreen/regpage";
import Accountmain from "../subscreens/accountScreen/accountmain";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Bikes"
        component={RentScreen}
        options={{
          title: "Bikes",
          headerStyle: {
            backgroundColor: "#355E3B",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontFamily: "js-reg",
          },
        }}
      />
      <Stack.Screen
        name="Lock"
        component={LockScreen}
        options={{
          title: "Smart Lock",
          headerStyle: {
            backgroundColor: "#355E3B",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontFamily: "js-reg",
          },
        }}
      />
      <Stack.Screen
        name="Availability"
        component={AvailabilityScreen}
        options={{
          title: "Availability",
          headerStyle: {
            backgroundColor: "#355E3B",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontFamily: "js-reg",
          },
        }}
      />
      <Stack.Screen
        name="TTrack"
        component={TTrackScreen}
        options={{
          title: "Time Track",
          headerStyle: {
            backgroundColor: "#355E3B",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontFamily: "js-reg",
          },
        }}
      />
      <Stack.Screen
        name="Preview"
        component={BikePreviewScreen}
        options={{
          title: "",
          headerTintColor: "#FFFFFF",
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: "js-reg",
          },
        }}
      />
      <Stack.Screen
        name="Reserve"
        component={ReserveScreen}
        options={{
          title: "Reserve",
          headerStyle: {
            backgroundColor: "#355E3B",
          },
          headerTintColor: "#FFFFFF",
          // headerTransparent: true,
          headerTitleStyle: {
            fontFamily: "js-reg",
          },
        }}
      />
    </Stack.Navigator>
  );
};

const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ASPage"
        component={AccountScreen}
        options={{
          title: "",
          headerTintColor: "#FFFFFF",
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: "js-reg",
          },
        }}
      />
      <Stack.Screen
        name="LSPage"
        component={LogpageScreen}
        options={{
          title: "",
          headerTintColor: "#FFFFFF",
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: "js-reg",
          },
        }}
      />
      <Stack.Screen
        name="LRSPage"
        component={LrpageScreen}
        options={{
          title: "",
          headerTintColor: "#FFFFFF",
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: "js-reg",
          },
        }}
      />
      <Stack.Screen
        name="RSPage"
        component={RegpageScreen}
        options={{
          title: "",
          headerTintColor: "#FFFFFF",
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: "js-reg",
          },
        }}
      />
      <Stack.Screen
        name="AccMain"
        component={Accountmain}
        options={{
          title: "",
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


export default function BottomNav() {
  const myScheme = useMyTheme();
  const colorScheme = useColorScheme();

  //   const currentScheme = colorScheme === "dark" ? "dark" : "light";
 

  
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#D6D6CA",
            paddingStart: GDim.width * 0.12,
            paddingEnd: GDim.width * 0.12,
            height: GDim.height * 0.07,
          },
        }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <MIcon
                name="home"
                size={GDim.scale * 15}
                color={focused ? myScheme.primary : myScheme.outline}
              />
            ),
            tabBarLabel: "",
            // tabBarLabel: ({ focused }) => (
            //   <Text
            //     style={{
            //       color: focused ? myScheme.primary : myScheme.onSurfaceVariant,
            //       fontSize: GDim.scale * 4,
            //       fontFamily: 'js-reg'
            //     }}
            //   >
            //     Home
            //   </Text>
            // ),
          }}
        />
        <Tab.Screen
          name="HistoryScreen"
          component={HistoryScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <MIcon
                name="history"
                size={GDim.scale * 15}
                color={focused ? myScheme.primary : myScheme.outline}
              />
            ),
            tabBarLabel: "",
            // tabBarLabel: ({ focused }) => (
            //   <Text
            //     style={{
            //       color: focused ? myScheme.primary : myScheme.onSurfaceVariant,
            //       fontSize: GDim.scale * 6,
            //       fontFamily: 'js-reg'
            //     }}
            //   >
            //     History
            //   </Text>
            // ),
          }}
        />
        <Tab.Screen
          name="NotificationsScreen"
          component={NotificationsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <MIcon
                name="notifications"
                size={GDim.scale * 15}
                color={focused ? myScheme.primary : myScheme.outline}
              />
            ),
            tabBarLabel: "",
            // tabBarLabel: ({ focused }) => (
            //   <Text
            //     style={{
            //       color: focused ? myScheme.primary : myScheme.onSurfaceVariant,
            //       fontSize: GDim.scale * 6,
            //       fontFamily: 'js-reg'
            //     }}
            //   >
            //     Notifications
            //   </Text>
            // ),
          }}
        />
        <Tab.Screen
          name="AccountScreen"
          component={AccountStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <MIcon
                name="account-circle"
                size={GDim.scale * 15}
                color={focused ? myScheme.primary : myScheme.outline}
              />
            ),
            tabBarLabel: "",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
