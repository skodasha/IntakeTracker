import config from '@/app/config/config';
import StorageRepository from '@/app/repositories/storage';

export const initApplicationContext = () => {
  const storageRepository = new StorageRepository(config.storage);

  return {
    repositories: { storage: storageRepository },
    services: {},
  };
};
