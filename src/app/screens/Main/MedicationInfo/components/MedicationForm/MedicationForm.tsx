import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import Button from '@/app/components/Button';
import ErrorMessage from '@/app/components/ErrorMessage';
import FormField from '@/app/components/FormField/FormField';
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
          <FormField<MedicationType>
            control={control}
            error={errors.name?.message as string}
            name="name"
            placeholder="Enter name"
            title="Name"
          />
          <FormField<MedicationType>
            control={control}
            error={errors.description?.message as string}
            name="description"
            placeholder="Enter description"
            title="Description"
          />
          <FormField<MedicationType>
            control={control}
            error={errors.initialAmount?.message as string}
            keyboardType="numeric"
            name="initialAmount"
            placeholder="Enter initial amount"
            title="Initial amount"
          />
          <FormField<MedicationType>
            control={control}
            error={errors.targetAmount?.message as string}
            name="targetAmount"
            placeholder="Enter target amount"
            title="Target amount"
          />
        </View>
        <ErrorMessage message={error} />
      </View>
      <Button style={styles.button} title={buttonText} onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default MedicationForm;
