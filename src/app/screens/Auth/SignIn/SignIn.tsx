import { useNavigation } from '@react-navigation/native';
import { useState, type FC } from 'react';

import { AuthNavigationProps } from '@/app/interfaces/navigation/auth.interface';
import { AUTH_ROUTE } from '@/app/routes/routes';
import UserForm from '@/app/components/UserForm';
import { useUserContext } from '@/app/contexts/UserContext';
import { IUserRequest } from '@/app/interfaces/user.interface';
import { parseError } from '@/app/utils/parseError';

const SignIn: FC = () => {
  const { login, isLoading } = useUserContext();
  const navigation = useNavigation<AuthNavigationProps<typeof AUTH_ROUTE.SIGN_UP>>();
  const [error, setError] = useState<string>();

  const onSubmit = async (data: IUserRequest) => {
    try {
      await login(data);
    } catch (error) {
      setError(parseError(error));
    }
  };

  const onLinkPress = () => navigation.navigate(AUTH_ROUTE.SIGN_UP);

  return (
    <UserForm
      title='Sign in'
      linkTitle='Sign up'
      linkDescription='Don’t have an account?'
      onLinkPress={onLinkPress}
      onSubmit={onSubmit}
      error={error}
      isLoading={isLoading}
    />
  );
};

export default SignIn;
