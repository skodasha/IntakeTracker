import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/app/components';
import Button from '@/app/components/Button';
import FormField from '@/app/components/FormField/FormField';
import { MedicationType } from '@/app/interfaces/medication.interface';

import { resolver } from './schema';

const stylesheet = createStyleSheet((theme) => ({
  button: {
    marginBottom: 30,
  },
  contentContainer: {
    flex: 1,
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
    width: '100%',
  },
  root: {
    flex: 1,
    justifyContent: 'space-between',
  },
}));

type MedicationFormPropsType = {
  buttonText: string;
  onSubmit: (data: MedicationType) => void;
  defaultValues?: MedicationType;
  error?: string;
};

const MedicationForm = ({
  buttonText,
  defaultValues,
  error,
  onSubmit,
}: MedicationFormPropsType) => {
  const { styles } = useStyles(stylesheet);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<MedicationType>({ defaultValues, resolver });

  return (
    <View style={styles.root}>
      <View style={styles.contentContainer}>
        <View style={styles.formFieldsContainer}>
          <FormField
            control={control}
            error={errors.name?.message as string}
            name="name"
            placeholder="Enter name"
            title="Name"
          />
          <FormField
            control={control}
            error={errors.description?.message as string}
            name="description"
            placeholder="Enter description"
            title="Description"
          />
          <FormField
            control={control}
            error={errors.initialAmount?.message as string}
            keyboardType="numeric"
            name="initialAmount"
            placeholder="Enter initial amount"
            title="Initial amount"
          />
          <FormField
            control={control}
            error={errors.targetAmount?.message as string}
            name="targetAmount"
            placeholder="Enter target amount"
            title="Target amount"
          />
        </View>
        {error && (
          <View style={styles.errorContainer}>
            <Text fontSize={14} style={styles.errorText}>
              {error}
            </Text>
          </View>
        )}
      </View>
      <Button style={styles.button} title={buttonText} onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default MedicationForm;
