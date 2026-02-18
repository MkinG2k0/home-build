import { QueryClient } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import * as React from "react";

import {
  GC_TIME_MS,
  PERSIST_CACHE_KEY,
  PERSIST_MAX_AGE_MS,
  STALE_TIME_MS,
} from "../../shared/config";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: GC_TIME_MS,
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: STALE_TIME_MS,
    },
  },
});

const asyncStorage =
  typeof window !== "undefined"
    ? {
        getItem: (key: string) =>
          Promise.resolve(window.localStorage.getItem(key)),
        removeItem: (key: string) => {
          window.localStorage.removeItem(key);
          return Promise.resolve();
        },
        setItem: (key: string, value: string) => {
          window.localStorage.setItem(key, value);
          return Promise.resolve();
        },
      }
    : undefined;

const persister = createAsyncStoragePersister({
  key: PERSIST_CACHE_KEY,
  storage: asyncStorage,
});

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => (
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{
      maxAge: PERSIST_MAX_AGE_MS,
      persister,
    }}
  >
    {children}
  </PersistQueryClientProvider>
);