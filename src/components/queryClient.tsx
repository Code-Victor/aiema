import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as TQueryClientProvider,
  focusManager,
  onlineManager,
} from "@tanstack/react-query";
import { isAxiosError } from "axios";
import React from "react";
import type { AppStateStatus } from "react-native";
import { AppState, Keyboard, Platform } from "react-native";
import { MMKV } from "react-native-mmkv";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const CACHE_TTL = 1000 * 60 * 60 * 24 * 7; // 7 days
const storage = new MMKV({ id: "react-query-cache" });
const mmkvStorage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
  getItem: (key: string) => {
    return storage.getString(key) || null;
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
};

const syncStoragePersister = createSyncStoragePersister({
  storage: mmkvStorage,
});

// supports auto refetch on reconnect like in web browser
// onlineManager.setEventListener((setOnline) => {
//   return NetInfo.addEventListener((state) => {
//     setOnline(!!state.isConnected);
//   });
// });
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: CACHE_TTL,
    },
  },
});
persistQueryClient({
  queryClient,
  persister: syncStoragePersister,
  maxAge: CACHE_TTL,
  buster: "1.0.0",
});

export const QueryClientProvider = React.memo(
  ({ children }: { children: React.ReactNode }) => {
    React.useEffect(() => {
      const subscription = AppState.addEventListener(
        "change",
        onAppStateChange
      );

      return () => subscription.remove();
    }, []);

    return (
      <TQueryClientProvider client={queryClient}>
        {children}
      </TQueryClientProvider>
    );
  }
);
export default queryClient;
