import { useNavigation, useRoute } from '@react-navigation/native';
import { useState, type FC } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import BackIcon from '@/app/assets/icons/back-icon.svg';
import BinIcon from '@/app/assets/icons/bin-icon.svg';
import { Text } from '@/app/components';
import { useMedicationById, useMedications } from '@/app/hooks/useMedications';
import { MedicationType } from '@/app/interfaces/medication.interface';
import { MainRouteProps } from '@/app/interfaces/navigation/main.interface';
import { MAIN_ROUTE } from '@/app/routes/routes';
import colors from '@/app/theme/colors';

import MedicationForm from './components/MedicationForm';
import { parseError } from '@/app/utils/parseError';

const stylesheet = createStyleSheet((theme, runtime) => ({
  backButton: {
    alignItems: 'center',
    backgroundColor: theme.app.background.primary,
    borderRadius: 36,
    height: 36,
    justifyContent: 'center',
    left: 20,
    position: 'absolute',
    width: 36,
    zIndex: 1,
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: theme.app.background.primary,
    borderRadius: 36,
    height: 36,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    width: 36,
  },
  formContainer: {
    backgroundColor: theme.app.background.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    padding: 20,
    width: '100%',
  },
  header: {
    height: 36,
    justifyContent: 'center',
    marginBottom: 24,
    marginTop: 16,
    paddingHorizontal: 20,
    position: 'relative',
    width: '100%',
  },
  root: {
    alignItems: 'center',
    backgroundColor: theme.app.background.secondary,
    flex: 1,
    paddingTop: runtime.insets.top,
  },
  title: {
    textAlign: 'center',
    width: '100%',
  },
}));

const MedicationInfo: FC = () => {
  const { styles } = useStyles(stylesheet);
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const route = useRoute<MainRouteProps<typeof MAIN_ROUTE.MEDICATION_INFO>>();

  const { medicationId } = route.params || {};

  const {
    createMedication,
    deleteMedication,
    isLoading: isSubmitLoading,
    updateMedication,
  } = useMedications();
  const { data, isLoading } = useMedicationById(medicationId);

  const isEditMode = !!medicationId;

  const title = isEditMode ? 'Edit medication' : 'Add new medication';
  const buttonText = isEditMode ? 'Save' : 'Add medication';

  const handleSubmit = async (medication: MedicationType) => {
    const onSuccess = () => navigation.goBack();
    const onError = (err: Error) => setError(parseError(err));

    if (isEditMode) {
      updateMedication({
        id: medicationId,
        ...medication,
      }, {
        onSuccess,
        onError
      });
    } else {
      createMedication(medication, {
        onSuccess,
        onError
      });
    }
  };

  const handleBackPress = () => navigation.goBack();

  const handleDeletePress = (id: string) => {
    deleteMedication(id);
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <BackIcon />
        </TouchableOpacity>
        <Text fontSize={18} fontWeight="500" lineHeight={24} style={styles.title}>
          {title}
        </Text>
        {isEditMode && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeletePress(medicationId)}
          >
            <BinIcon />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.formContainer}>
        {isLoading || isSubmitLoading ? (
          <ActivityIndicator color={colors.blue} />
        ) : (
          <MedicationForm buttonText={buttonText} defaultValues={data} onSubmit={handleSubmit} error={error}/>
        )}
      </View>
    </View>
  );
};

export default MedicationInfo;
