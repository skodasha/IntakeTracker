import { TextInput, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Control, Controller } from 'react-hook-form';

import { Text } from '@/app/components';

const stylesheet = createStyleSheet((theme) => ({
  container: {
    width: '100%',
    gap: 8
  },
  label: {
    color: theme.app.text.secondary,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12.5,
    backgroundColor: theme.app.input.background,
    fontSize: 16
  },
  error: {
    color: theme.app.text.error,
  },
}));

type FormFieldPropsType = {
  name: string;
  error: string;
  control: Control<any>;
  title: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'numeric';
};

const FormField = ({ name, error, control, title, placeholder, secureTextEntry, keyboardType }: FormFieldPropsType) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value?.toString()}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
          />
        )}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

export default FormField;
