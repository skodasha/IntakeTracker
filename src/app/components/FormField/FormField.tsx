import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { TextInput, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/app/components';

const stylesheet = createStyleSheet((theme) => ({
  container: {
    gap: 8,
    width: '100%',
  },
  error: {
    color: theme.app.text.error,
  },
  input: {
    backgroundColor: theme.app.input.background,
    borderRadius: 12,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12.5,
  },
  label: {
    color: theme.app.text.secondary,
  },
}));

type FormFieldPropsType<T extends FieldValues> = {
  control: Control<T>;
  error: string;
  name: Path<T>;
  title: string;
  keyboardType?: 'default' | 'numeric';
  placeholder?: string;
  secureTextEntry?: boolean;
};

const FormField = <T extends FieldValues>({
  control,
  error,
  keyboardType,
  name,
  placeholder,
  secureTextEntry,
  title,
}: FormFieldPropsType<T>) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            keyboardType={keyboardType}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            style={styles.input}
            value={value?.toString()}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default FormField;
