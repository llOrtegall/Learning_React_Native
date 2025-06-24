import { useAuth } from "@/contexts/AuthContextProvider";
import { Stack } from "expo-router";

export default function RootStack() {
  const { isAuth } = useAuth()

  if (!isAuth) {
    return (
      <Stack>
        <Stack.Screen name="log-in" options={{ headerShown: false }}/>
      </Stack>
    )
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  )
}