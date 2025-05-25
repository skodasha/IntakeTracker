import { useNavigation } from '@react-navigation/native';
import { useState, type FC } from 'react';

import UserForm from '@/app/components/UserForm';
import { useUserContext } from '@/app/contexts/UserContext';
import { AuthNavigationProps } from '@/app/interfaces/navigation/auth.interface';
import { IUserRequest } from '@/app/interfaces/user.interface';
import { AUTH_ROUTE } from '@/app/routes/routes';
import { parseError } from '@/app/utils/parseError';

const SignUp: FC = () => {
  const { isLoading, register } = useUserContext();
  const [error, setError] = useState<string>();
  const navigation = useNavigation<AuthNavigationProps<typeof AUTH_ROUTE.SIGN_IN>>();

  const onSubmit = async (data: IUserRequest) => {
    try {
      await register(data);
    } catch (err) {
      setError(parseError(err));
    }
  };

  const onLinkPress = () => navigation.navigate(AUTH_ROUTE.SIGN_IN);

  return (
    <UserForm
      error={error}
      isLoading={isLoading}
      linkDescription="I already have an account"
      linkTitle="Sign in"
      title="Sign up"
      onLinkPress={onLinkPress}
      onSubmit={onSubmit}
    />
  );
};

export default SignUp;
