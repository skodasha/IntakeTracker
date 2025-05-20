import { type PropsWithChildren, createContext, useContext, useMemo } from 'react';

interface IApplicationContext {
  services: { [key: string]: unknown };
}

export const ApplicationContext = createContext<IApplicationContext>({
  services: {},
});

interface ApplicationContextProviderProps extends PropsWithChildren {
  services: { [key: string]: unknown };
}

const ApplicationContextProvider = ({ children, services }: ApplicationContextProviderProps) => {
  const value = useMemo(() => ({ services }), [services]);

  return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>;
};

export const useApplicationContext = () => useContext(ApplicationContext);

export default ApplicationContextProvider;
