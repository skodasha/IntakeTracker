import { type PropsWithChildren, createContext, useContext, useMemo } from 'react';

import StorageRepository from '../repositories/storage';

interface IApplicationContext {
  repositories: { storage: StorageRepository };
  services: { [key: string]: unknown };
}

export const ApplicationContext = createContext<IApplicationContext>({
  repositories: {} as { storage: StorageRepository },
  services: {},
});

interface ApplicationContextProviderProps extends PropsWithChildren {
  repositories: { storage: StorageRepository };
  services: { [key: string]: unknown };
}

const ApplicationContextProvider = ({
  children,
  repositories,
  services,
}: ApplicationContextProviderProps) => {
  const value = useMemo(() => ({ repositories, services }), [services, repositories]);

  return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>;
};

export const useApplicationContext = () => useContext(ApplicationContext);

export default ApplicationContextProvider;
