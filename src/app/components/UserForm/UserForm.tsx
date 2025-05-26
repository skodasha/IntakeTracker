import { useForm } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/app/components';
import { IUserRequest } from '@/app/interfaces/user.interface';

import Button from '../Button';
import ErrorMessage from '../ErrorMessage';
import FormField from '../FormField';
import FullScreenLoader from '../FullScreenLoader';

import { resolver } from './schema';

const stylesheet = createStyleSheet((theme) => ({
  contentContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  formFieldsContainer: {
    gap: 14,
    marginTop: 20,
    width: '100%',
  },
  link: {
    color: theme.app.text.link,
  },
  linkContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 30,
  },
  nextButton: {
    marginBottom: 30,
  },
  root: {
    alignItems: 'center',
    backgroundColor: theme.app.background.primary,
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
}));

type UserFormPropsType = {
  linkDescription: string;
  linkTitle: string;
  onLinkPress: () => void;
  onSubmit: (data: IUserRequest) => void;
  title: string;
  error?: string;
  isLoading?: boolean;
};

const UserForm = ({
  error,
  isLoading,
  linkDescription,
  linkTitle,
  onLinkPress,
  onSubmit,
  title,
}: UserFormPropsType) => {
  const { styles } = useStyles(stylesheet);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IUserRequest>({ resolver });

  return (
    <View style={styles.root}>
      {isLoading && <FullScreenLoader />}
      <View style={styles.contentContainer}>
        <Text fontSize={24} fontWeight="500" lineHeight={32}>
          {title}
        </Text>
        <View style={styles.formFieldsContainer}>
          <FormField<IUserRequest>
            control={control}
            error={errors.email?.message as string}
            name="email"
            placeholder="Enter email"
            title="Name"
          />
          <FormField<IUserRequest>
            secureTextEntry
            control={control}
            error={errors.password?.message as string}
            name="password"
            placeholder="Enter password"
            title="Password"
          />
        </View>
        <ErrorMessage message={error} />
        <View style={styles.linkContainer}>
          <Text>{linkDescription}</Text>
          <TouchableOpacity onPress={onLinkPress}>
            <Text style={styles.link}>{linkTitle}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button style={styles.nextButton} title="Next" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default UserForm;
