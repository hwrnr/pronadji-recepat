import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";

const queryClient = new QueryClient();

export default function Wrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1 }}>
        <Slot />
        <StatusBar style="auto" translucent={false} />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

// TODO: Fix invisible status bar
