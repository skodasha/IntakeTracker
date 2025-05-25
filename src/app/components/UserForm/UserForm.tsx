import { useForm } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import CircleWarningIcon from '@/app/assets/icons/circle-warning-icon.svg';
import { Text } from '@/app/components';
import Button from '@/app/components/Button';
import FormField from '@/app/components/FormField/FormField';
import { IUserRequest } from '@/app/interfaces/user.interface';

import FullScreenLoader from '../FullScreenLoader';

import { resolver } from './schema';

const stylesheet = createStyleSheet((theme) => ({
  contentContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  errorContainer: {
    backgroundColor: theme.app.background.lightRed,
    borderRadius: 12,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 14.5,
    width: '100%',
  },
  errorText: {
    color: theme.app.text.error,
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
          <FormField
            control={control}
            error={errors.email?.message as string}
            name="email"
            placeholder="Enter email"
            title="Name"
          />
          <FormField
            secureTextEntry
            control={control}
            error={errors.password?.message as string}
            name="password"
            placeholder="Enter password"
            title="Password"
          />
        </View>
        {error && (
          <View style={styles.errorContainer}>
            <CircleWarningIcon height={24} width={24} />
            <Text fontSize={14} style={styles.errorText}>
              {error}
            </Text>
          </View>
        )}
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
