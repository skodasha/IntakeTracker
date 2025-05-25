import { TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useForm } from 'react-hook-form';

import { Text } from '@/app/components';
import Button from '@/app/components/Button';
import FormField from '@/app/components/FormField/FormField';
import { IUserRequest } from '@/app/interfaces/user.interface';
import CircleWarningIcon from '@/app/assets/icons/circle-warning-icon.svg';

import { resolver } from './schema';
import FullScreenLoader from '../FullScreenLoader';

const stylesheet = createStyleSheet((theme) => ({
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%'
  },
  root: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.app.background.primary,
    flex: 1,
    padding: 20
  },
  nextButton: {
    marginBottom: 30,
  },
  formFieldsContainer: {
    width: '100%',
    gap: 14,
    marginTop: 20,
  },
  link: {
    color: theme.app.text.link,
  },
  linkContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 30,
  },
  errorContainer: {
    backgroundColor: theme.app.background.lightRed,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14.5,
    marginTop: 20,
    width: '100%',
  },
  errorText: {
    color: theme.app.text.error,
  }
}));

type UserFormPropsType = {
  title: string;
  linkTitle: string;
  linkDescription: string;
  onLinkPress: () => void;
  onSubmit: (data: IUserRequest) => void;
  error?: string;
  isLoading?: boolean;
};

const UserForm = ({ title, linkTitle, linkDescription, onSubmit, onLinkPress, error, isLoading }: UserFormPropsType) => {
  const { styles } = useStyles(stylesheet);
  const { control, handleSubmit, formState: { errors } } = useForm<IUserRequest>({ resolver });

  return (
    <View style={styles.root}>
      {isLoading && <FullScreenLoader />}
      <View style={styles.contentContainer}>
        <Text fontSize={24} fontWeight="500" lineHeight={32}>
          {title}
        </Text>
        <View style={styles.formFieldsContainer}>
          <FormField
              title="Name"
              name="email"
              control={control}
              error={errors.email?.message as string}
              placeholder='Enter email'
            />
            <FormField
              title="Password"
              name='password'
              control={control}
              error={errors.password?.message as string}
              placeholder='Enter password'
              secureTextEntry
            />
        </View>
        {error && (
          <View style={styles.errorContainer}>
            <CircleWarningIcon width={24} height={24} />
            <Text fontSize={14} style={styles.errorText}>{error}</Text>
          </View>
        )}
        <View style={styles.linkContainer}>
          <Text>{linkDescription}</Text>
          <TouchableOpacity onPress={onLinkPress}>
            <Text style={styles.link}>{linkTitle}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button title='Next' onPress={handleSubmit(onSubmit)} style={styles.nextButton} />
    </View>
  );
};

export default UserForm;
