/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    primary: "rgb(23, 109, 50)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(162, 246, 172)",
    onPrimaryContainer: "rgb(0, 33, 9)",
    secondary: "rgb(81, 99, 81)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(212, 232, 209)",
    onSecondaryContainer: "rgb(15, 31, 17)",
    tertiary: "rgb(57, 101, 109)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(189, 234, 243)",
    onTertiaryContainer: "rgb(0, 31, 36)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(252, 253, 247)",
    onBackground: "rgb(26, 28, 25)",
    surface: "rgb(252, 253, 247)",
    onSurface: "rgb(26, 28, 25)",
    surfaceVariant: "rgb(221, 229, 217)",
    onSurfaceVariant: "rgb(65, 73, 65)",
    outline: "rgb(114, 121, 112)",
    outlineVariant: "rgb(193, 201, 190)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(46, 49, 46)",
    inverseOnSurface: "rgb(240, 241, 236)",
    inversePrimary: "rgb(135, 217, 146)",
    elevation: {
      level0: "transparent",
      level1: "rgb(241, 246, 237)",
      level2: "rgb(234, 242, 231)",
      level3: "rgb(227, 237, 225)",
      level4: "rgb(225, 236, 223)",
      level5: "rgb(220, 233, 219)",
    },
    surfaceDisabled: "rgba(26, 28, 25, 0.12)",
    onSurfaceDisabled: "rgba(26, 28, 25, 0.38)",
    backdrop: "rgba(43, 50, 43, 0.4)",
  },
  dark: {
    text: "#ECEDEE",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    primary: "rgb(135, 217, 146)",
    onPrimary: "rgb(0, 57, 20)",
    primaryContainer: "rgb(0, 83, 33)",
    onPrimaryContainer: "rgb(162, 246, 172)",
    secondary: "rgb(184, 204, 182)",
    onSecondary: "rgb(36, 52, 37)",
    secondaryContainer: "rgb(58, 75, 58)",
    onSecondaryContainer: "rgb(212, 232, 209)",
    tertiary: "rgb(161, 206, 215)",
    onTertiary: "rgb(0, 54, 61)",
    tertiaryContainer: "rgb(31, 77, 84)",
    onTertiaryContainer: "rgb(189, 234, 243)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(26, 28, 25)",
    onBackground: "rgb(226, 227, 221)",
    surface: "rgb(26, 28, 25)",
    onSurface: "rgb(226, 227, 221)",
    surfaceVariant: "rgb(65, 73, 65)",
    onSurfaceVariant: "rgb(193, 201, 190)",
    outline: "rgb(139, 147, 137)",
    outlineVariant: "rgb(65, 73, 65)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(226, 227, 221)",
    inverseOnSurface: "rgb(46, 49, 46)",
    inversePrimary: "rgb(23, 109, 50)",
    elevation: {
      level0: "transparent",
      level1: "rgb(31, 37, 31)",
      level2: "rgb(35, 43, 35)",
      level3: "rgb(38, 49, 38)",
      level4: "rgb(39, 51, 40)",
      level5: "rgb(41, 55, 42)",
    },
    surfaceDisabled: "rgba(226, 227, 221, 0.12)",
    onSurfaceDisabled: "rgba(226, 227, 221, 0.38)",
    backdrop: "rgba(43, 50, 43, 0.4)",
  },
};
