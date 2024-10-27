import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Color'; // Adjust the path as necessary

export function useMyTheme(fallback?: string) {
  const colorScheme = useColorScheme();
  const color = colorScheme === 'dark' ? Colors.light : Colors.light;

  return color || fallback;
}