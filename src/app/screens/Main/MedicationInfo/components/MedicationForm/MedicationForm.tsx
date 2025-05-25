import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useForm } from 'react-hook-form';

import { Text } from '@/app/components';
import Button from '@/app/components/Button';
import FormField from '@/app/components/FormField/FormField';
import { MedicationType } from '@/app/interfaces/medication.interface';
import { resolver } from './schema';

const stylesheet = createStyleSheet((theme) => ({
  contentContainer: {
    flex: 1,
    width: '100%'
  },
  root: {
    justifyContent: 'space-between',
    flex: 1,
  },
  button: {
    marginBottom: 30,
  },
  formFieldsContainer: {
    width: '100%',
    gap: 14,
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

type MedicationFormPropsType = {
  buttonText: string;
  onSubmit: (data: MedicationType) => void;
  error?: string;
  defaultValues?: MedicationType;
};

const MedicationForm = ({ buttonText, onSubmit, error, defaultValues }: MedicationFormPropsType) => {
  const { styles } = useStyles(stylesheet);
  const { control, handleSubmit, formState: { errors } } = useForm<MedicationType>(
    { defaultValues, resolver }
  );

  return (
    <View style={styles.root}>
      <View style={styles.contentContainer}>
        <View style={styles.formFieldsContainer}>
            <FormField
              title="Name"
              name="name"
              control={control}
              error={errors.name?.message as string}
              placeholder='Enter name'
            />
            <FormField
              title='Description'
              name='description'
              control={control}
              error={errors.description?.message as string}
              placeholder='Enter description'
            />
            <FormField
              title='Initial amount'
              name='initialAmount'
              control={control}
              error={errors.initialAmount?.message as string}
              placeholder='Enter initial amount'
              keyboardType='numeric'
            />
            <FormField
              title='Target amount'
              name='targetAmount'
              control={control}
              error={errors.targetAmount?.message as string}
              placeholder='Enter target amount'
            />
        </View>
        {error && (
          <View style={styles.errorContainer}>
            <Text fontSize={14} style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>
      <Button title={buttonText} onPress={handleSubmit(onSubmit)} style={styles.button} />
    </View>
  );
};

export default MedicationForm;
