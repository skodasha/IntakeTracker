import { useNavigation } from '@react-navigation/native';
import { useState, type FC } from 'react';

import UserForm from '@/app/components/UserForm';
import { useUserContext } from '@/app/contexts/UserContext';
import { ErrorObjectType } from '@/app/interfaces/error.interface';
import { AuthNavigationProps } from '@/app/interfaces/navigation/auth.interface';
import { IUserRequest } from '@/app/interfaces/user.interface';
import { AUTH_ROUTE } from '@/app/routes/routes';

const SignUp: FC = () => {
  const { isLoading, register } = useUserContext();
  const [errors, setErrors] = useState<ErrorObjectType>();
  const navigation = useNavigation<AuthNavigationProps<typeof AUTH_ROUTE.SIGN_IN>>();

  const onSubmit = async (data: IUserRequest) => {
    try {
      await register(data);
    } catch (err) {
      setErrors(err as ErrorObjectType);
    }
  };

  const onLinkPress = () => navigation.navigate(AUTH_ROUTE.SIGN_IN);

  return (
    <UserForm
      error={errors?.error?.message}
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
