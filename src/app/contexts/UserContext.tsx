import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';

import { IUser, IUserRequest } from '@/app/interfaces/user.interface';
import authRepository from '@/app/repositories/api/auth';
import userRepository from '@/app/repositories/api/user';

import { useApplicationContext } from './ApplicationContext';

interface IUserContext {
  isLoading: boolean;
  user: IUser | null;
  isAuthenticated: boolean;
  register: (data: IUserRequest) => Promise<void>;
  login: (data: IUserRequest) => Promise<void>;
  logout: () => void;
}

export const UserContext = createContext<IUserContext>({
  isLoading: false,
  user: null,
  isAuthenticated: false,
  register: async () => {},
  login: async () => {},
  logout: () => {},
});

const UserContextProvider = ({ children }: PropsWithChildren) => {
  const { repositories: { storage } } = useApplicationContext();
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      const token = storage.getItem('access_token');
      if (token) {
        try {
          userRepository.setAccessToken(token);
          const profileResponse = await userRepository.getCurrent();
          setUser(profileResponse);
        } catch (error) {
          storage.removeItem('access_token');
        }
      }
      setIsLoading(false);
    };

    init();
  }, []);

  const register = async (data: IUserRequest) => {
    setIsLoading(true);
    try {
      const { accessToken } = await authRepository.register(data);
      await storage.setItem('auth_token', accessToken);
      userRepository.setAccessToken(accessToken);

      const profileResponse = await userRepository.getCurrent();
      setUser(profileResponse);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: IUserRequest) => {
    setIsLoading(true);
    try {
      const { accessToken } = await authRepository.login(data);
      await storage.setItem('auth_token', accessToken);
      userRepository.setAccessToken(accessToken);

      const profileResponse = await userRepository.getCurrent();
      setUser(profileResponse);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    storage.removeItem('access_token');
    userRepository.setAccessToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      isLoading,
      user,
      isAuthenticated: !!user,
      register,
      login,
      logout,
    }),
    [user, isLoading]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);

export default UserContextProvider;
