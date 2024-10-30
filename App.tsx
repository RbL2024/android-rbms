import React, { useState, useEffect } from "react";
import { Keyboard, TouchableWithoutFeedback, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, DefaultTheme } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toaster } from "sonner-native";
import { useMyTheme } from "@/hooks/useMyTheme";
import * as Font from "expo-font";

import { LockProvider } from "@/context/lockContex";

//Navigator
import Navigator from "./app/navigation/navigator";

const loadFonts = async () => {
  await Font.loadAsync({
    "js-reg": require("@/assets/fonts/JosefinSans-Regular.ttf"), // Replace with your font file
    "js-bold": require("@/assets/fonts/JosefinSans-Bold.ttf"),
    "js-med": require("@/assets/fonts/JosefinSans-Medium.ttf"),
    "js-italic": require("@/assets/fonts/JosefinSans-Italic.ttf"),
  });
};

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const myTheme = useMyTheme();
  // const colorScheme = useColorScheme();
  // const currentScheme = colorScheme === "dark" ? "dark" : "light";

  useEffect(() => {
    loadFonts().then(() => setIsFontLoaded(true));
  }, []);

  if (!isFontLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    ); // You can also show a splash screen here
  }

  const defaultheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...myTheme,
    },
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemeProvider value={defaultheme}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <LockProvider>
              <Navigator />
              <Toaster />
            </LockProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </ThemeProvider>
    </TouchableWithoutFeedback>
  );
}
