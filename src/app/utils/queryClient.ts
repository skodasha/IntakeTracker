import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

import StorageRepository from '@/app/repositories/storage';

export const createQueryClient = (storage: StorageRepository) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  });

  const storagePersister = createSyncStoragePersister({
    storage: {
      getItem(key: string) {
        return storage.getItem(key);
      },
      removeItem(key: string) {
        storage.removeItem(key);
      },
      setItem(key: string, value: string) {
        storage.setItem(key, value);
      },
    },
  });

  persistQueryClient({
    persister: storagePersister,
    queryClient,
  });

  return queryClient;
};
