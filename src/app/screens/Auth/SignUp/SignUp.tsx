import { useNavigation } from '@react-navigation/native';
import { useState, type FC } from 'react';

import { AuthNavigationProps } from '@/app/interfaces/navigation/auth.interface';
import { AUTH_ROUTE } from '@/app/routes/routes';
import { IUserRequest } from '@/app/interfaces/user.interface';
import UserForm from '@/app/components/UserForm';
import { useUserContext } from '@/app/contexts/UserContext';
import { parseError } from '@/app/utils/parseError';

const SignUp: FC = () => {
  const { register, isLoading } = useUserContext();
  const [error, setError] = useState<string>();
  const navigation = useNavigation<AuthNavigationProps<typeof AUTH_ROUTE.SIGN_IN>>();

  const onSubmit = async (data: IUserRequest) => {
    try {
      await register(data);
    } catch (error) {
      setError(parseError(error));
    }
  };
 
  const onLinkPress = () => navigation.navigate(AUTH_ROUTE.SIGN_IN);
  
  return (
    <UserForm
      title='Sign up'
      linkTitle='Sign in'
      linkDescription='I already have an account'
      onLinkPress={onLinkPress}
      onSubmit={onSubmit}
      error={error}
      isLoading={isLoading}
    />
  );
};

export default SignUp;
