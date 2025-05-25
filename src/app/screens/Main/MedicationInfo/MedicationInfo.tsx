import { type FC } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useRoute } from '@react-navigation/native';

import { MainRouteProps } from '@/app/interfaces/navigation/main.interface';
import { Text } from '@/app/components';
import MedicationForm from './components/MedicationForm';
import { MAIN_ROUTE } from '@/app/routes/routes';
import { useMedicationById, useMedications } from '@/app/hooks/useMedications';
import colors from '@/app/theme/colors';
import { MedicationType } from '@/app/interfaces/medication.interface';
import BackIcon from '@/app/assets/icons/back-icon.svg';
import BinIcon from '@/app/assets/icons/bin-icon.svg';

const stylesheet = createStyleSheet((theme, runtime) => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.app.background.secondary,
    flex: 1,
    paddingTop: runtime.insets.top,
  },
  title: {
    width: '100%',
    textAlign: 'center'
  },
  backButton: {
    position: 'absolute',
    width: 36,
    height: 36,
    backgroundColor: theme.app.background.primary,
    borderRadius: 36,
    left: 20,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    width: '100%',
    marginTop: 16,
    marginBottom: 24,
    position: 'relative',
    height: 36,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  formContainer: {
    backgroundColor: theme.app.background.primary,
    flex: 1,
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20
  },
  deleteButton: {
    position: 'absolute',
    width: 36,
    height: 36,
    backgroundColor: theme.app.background.primary,
    borderRadius: 36,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const MedicationInfo: FC = () => {
  const { styles } = useStyles(stylesheet);
  const navigation = useNavigation();
  const route = useRoute<MainRouteProps<typeof MAIN_ROUTE.MEDICATION_INFO>>();

  const { medicationId } = route.params || {};

  const { createMedication, updateMedication, isLoading: isSubmitLoading } = useMedications();
  const { data, isLoading } = useMedicationById(medicationId);
  
  const isEditMode = !!medicationId;

  const title = isEditMode ? 'Edit medication' : 'Add new medication';
  const buttonText = isEditMode ? 'Save' : 'Add medication';

  const handleSubmit = (data: MedicationType) => {
    if (isEditMode) {
      updateMedication({
        id: medicationId,
        ...data
      });
    } else {
      createMedication(data);
    }

    navigation.goBack()
  };

  const handleBackPress = () => navigation.goBack();

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <BackIcon />
        </TouchableOpacity>
        <Text fontSize={18} fontWeight="500" lineHeight={24} style={styles.title}>
          {title}
        </Text>
        {isEditMode && <TouchableOpacity style={styles.deleteButton}>
          <BinIcon /></TouchableOpacity>}
      </View>
      <View style={styles.formContainer}>
        {isLoading || isSubmitLoading ? (
          <ActivityIndicator color={colors.blue} />
        ) : (
          <MedicationForm
            buttonText={buttonText}
            onSubmit={handleSubmit}
            defaultValues={data}
          />
        )}
      </View>
    </View>
  );
};

export default MedicationInfo;
