import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { IUser, IUserRequest } from '@/app/interfaces/user.interface';
import authRepository from '@/app/repositories/api/auth';
import userRepository from '@/app/repositories/api/user';
import TokenService from '@/app/services/token.service';

import { useApplicationContext } from './ApplicationContext';

interface IUserContext {
  isLoading: boolean;
  login: (data: IUserRequest) => Promise<void>;
  logout: () => void;
  register: (data: IUserRequest) => Promise<void>;
  user: IUser | null;
}

export const UserContext = createContext<IUserContext>({
  isLoading: false,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  user: null,
});

const UserContextProvider = ({ children }: PropsWithChildren) => {
  const {
    repositories: { storage },
  } = useApplicationContext();
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      const token = storage.getItem('access_token');
      if (token) {
        try {
          TokenService.setAccessToken(token);

          const profileResponse = await userRepository.getCurrent();
          setUser(profileResponse);
        } catch (error) {
          storage.removeItem('access_token');
        }
      }
      setIsLoading(false);
    };

    init();
  }, [storage]);

  const register = useCallback(
    async (data: IUserRequest) => {
      setIsLoading(true);
      try {
        const { accessToken } = await authRepository.register(data);

        storage.setItem('access_token', accessToken);
        TokenService.setAccessToken(accessToken);

        const profileResponse = await userRepository.getCurrent();
        setUser(profileResponse);
      } finally {
        setIsLoading(false);
      }
    },
    [storage]
  );

  const login = useCallback(
    async (data: IUserRequest) => {
      setIsLoading(true);
      try {
        const { accessToken } = await authRepository.login(data);

        storage.setItem('access_token', accessToken);
        TokenService.setAccessToken(accessToken);

        const profileResponse = await userRepository.getCurrent();
        setUser(profileResponse);
      } finally {
        setIsLoading(false);
      }
    },
    [storage]
  );

  const logout = useCallback(() => {
    storage.removeItem('access_token');
    TokenService.setAccessToken(null);
    setUser(null);
  }, [storage]);

  const value = useMemo(
    () => ({
      isLoading,
      login,
      logout,
      register,
      user,
    }),
    [user, isLoading, login, logout, register]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);

export default UserContextProvider;
