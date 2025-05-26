import { useNavigation } from '@react-navigation/native';
import { useState, type FC } from 'react';

import UserForm from '@/app/components/UserForm';
import { useUserContext } from '@/app/contexts/UserContext';
import { ErrorObjectType } from '@/app/interfaces/error.interface';
import { AuthNavigationProps } from '@/app/interfaces/navigation/auth.interface';
import { IUserRequest } from '@/app/interfaces/user.interface';
import { AUTH_ROUTE } from '@/app/routes/routes';

const SignIn: FC = () => {
  const { isLoading, login } = useUserContext();
  const navigation = useNavigation<AuthNavigationProps<typeof AUTH_ROUTE.SIGN_UP>>();
  const [errors, setErrors] = useState<ErrorObjectType>();

  const handleSubmit = async (data: IUserRequest) => {
    try {
      await login(data);
    } catch (err) {
      setErrors(err as ErrorObjectType);
    }
  };

  const handleLinkPress = () => navigation.navigate(AUTH_ROUTE.SIGN_UP);

  return (
    <UserForm
      error={errors?.error?.message}
      isLoading={isLoading}
      linkDescription="Don’t have an account?"
      linkTitle="Sign up"
      title="Sign in"
      onLinkPress={handleLinkPress}
      onSubmit={handleSubmit}
    />
  );
};

export default SignIn;
