import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import Button from '@/app/components/Button';
import ErrorMessage from '@/app/components/ErrorMessage';
import FormField from '@/app/components/FormField/FormField';
import { ErrorObjectType } from '@/app/interfaces/error.interface';
import { MedicationType } from '@/app/interfaces/medication.interface';

import { resolver } from './schema';

const stylesheet = createStyleSheet(() => ({
  button: {
    marginBottom: 30,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
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

const initialValues: MedicationType = {
  description: '',
  initialAmount: 0,
  name: '',
  targetAmount: 1,
};

type MedicationFormPropsType = {
  buttonText: string;
  onSubmit: (data: MedicationType) => void;
  defaultValues?: MedicationType;
  errors?: ErrorObjectType;
};

const MedicationForm = ({
  buttonText,
  defaultValues = initialValues,
  errors,
  onSubmit,
}: MedicationFormPropsType) => {
  const { styles } = useStyles(stylesheet);
  const { control, formState, handleSubmit } = useForm<MedicationType>({
    defaultValues,
    errors,
    resolver,
  });

  return (
    <View style={styles.root}>
      <View style={styles.contentContainer}>
        <View style={styles.formFieldsContainer}>
          <FormField<MedicationType>
            control={control}
            error={formState.errors.name?.message}
            name="name"
            placeholder="Enter name"
            title="Name"
          />
          <FormField<MedicationType>
            multiline
            control={control}
            error={formState.errors.description?.message}
            name="description"
            placeholder="Enter description"
            title="Description"
          />
          <FormField<MedicationType>
            control={control}
            error={formState.errors.initialAmount?.message}
            keyboardType="numeric"
            name="initialAmount"
            placeholder="Enter initial amount"
            title="Initial amount"
          />
          <FormField<MedicationType>
            control={control}
            error={formState.errors.targetAmount?.message}
            keyboardType="numeric"
            name="targetAmount"
            placeholder="Enter target amount"
            title="Target amount"
          />
        </View>
        <ErrorMessage message={errors?.error?.message} />
      </View>
      <Button style={styles.button} title={buttonText} onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default MedicationForm;
