import { Stack } from "expo-router";
import './globals.css';
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      {/* Oculta la barra que muestra hora y bateria */}
      <StatusBar hidden={true}/>

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack>;
    </>
  )
}
