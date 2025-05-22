import { type PropsWithChildren, createContext, useContext, useMemo } from 'react';
import StorageRepository from '../repositories/storage';

interface IApplicationContext {
  services: { [key: string]: unknown };
  repositories: { storage: StorageRepository };
}

export const ApplicationContext = createContext<IApplicationContext>({
  services: {},
  repositories: {} as { storage: StorageRepository },
});

interface ApplicationContextProviderProps extends PropsWithChildren {
  services: { [key: string]: unknown };
  repositories: { storage: StorageRepository };
}

const ApplicationContextProvider = ({ children, services, repositories }: ApplicationContextProviderProps) => {
  const value = useMemo(() => ({ services, repositories }), [services, repositories]);

  return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>;
};

export const useApplicationContext = () => useContext(ApplicationContext);

export default ApplicationContextProvider;
