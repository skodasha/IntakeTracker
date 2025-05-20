import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';

import { IUser } from '@/app/interfaces/user.interface';

interface IUserContext {
  isLoading: boolean;
  user: IUser | null;
}

export const UserContext = createContext<IUserContext>({
  isLoading: false,
  user: null,
});

const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user] = useState<IUser | null>(null);
  const [isLoading] = useState(false);

  const value = useMemo(() => ({ isLoading, user }), [user, isLoading]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);

export default UserContextProvider;
