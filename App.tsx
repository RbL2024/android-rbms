import * as React from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import {
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { ThemeProvider, DefaultTheme } from "@react-navigation/native";
import { useMyTheme } from "@/hooks/useMyTheme";

//Navigator
import Navigator from "./app/navigation/navigator";

export default function App() {
  const myTheme = useMyTheme();
  // const colorScheme = useColorScheme();
  // const currentScheme = colorScheme === "dark" ? "dark" : "light";

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
          <Navigator />
        </SafeAreaProvider>
      </ThemeProvider>
    </TouchableWithoutFeedback>
  );
}
