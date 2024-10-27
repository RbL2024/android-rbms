import * as React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import RentScreen from "../subscreens/homeScreen/rent";
import LockScreen from "../subscreens/homeScreen/lock";
import AvailabilityScreen from "../subscreens/homeScreen/availability";
import TTrackScreen from "../subscreens/homeScreen/ttrack";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Rent" component={RentScreen} options={{}}/>
            <Stack.Screen name="Lock" component={LockScreen} options={{}}/>
            <Stack.Screen name="Availability" component={AvailabilityScreen} options={{}}/>
            <Stack.Screen name="TTrack" component={TTrackScreen} options={{}}/>
        </Stack.Navigator>
    )
}


export default function BottomNav() {
  const myScheme = useMyTheme();
  const colorScheme = useColorScheme();
//   const currentScheme = colorScheme === "dark" ? "dark" : "light";
  
  return (
    <NavigationContainer >
      <Tab.Navigator screenOptions={{
        tabBarStyle: {
            backgroundColor: '#D6D6CA',
            paddingStart: GDim.width * 0.14,
            paddingEnd: GDim.width * 0.14,
            height: GDim.height * 0.07
        }
      }}>
        <Tab.Screen
          name="HomeScreen"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <MIcon name="home" size={GDim.scale * 15} color={focused ? myScheme.primary:myScheme.outline}/>
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? myScheme.primary : myScheme.onSurfaceVariant,
                  fontSize: GDim.scale * 6,
                }}
              >
                Home
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="HistoryScreen"
          component={HistoryScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <MIcon name="history" size={GDim.scale * 15} color={focused ? myScheme.primary:myScheme.outline}/>
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? myScheme.primary : myScheme.onSurfaceVariant,
                  fontSize: GDim.scale * 6,
                }}
              >
                History
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="NotificationsScreen"
          component={NotificationsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <MIcon name="notifications" size={GDim.scale * 15} color={focused ? myScheme.primary:myScheme.outline}/>
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? myScheme.primary : myScheme.onSurfaceVariant,
                  fontSize: GDim.scale * 6,
                }}
              >
                Notifications
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <MIcon name="account-circle" size={GDim.scale * 15} color={focused ? myScheme.primary:myScheme.outline}/>
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? myScheme.primary : myScheme.onSurfaceVariant,
                  fontSize: GDim.scale * 6,
                }}
              >
                Account
              </Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
