import { useNavigation } from '@react-navigation/native';
import { type FC } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import AddIcon from '@/app/assets/icons/add-icon.svg';
import LogoutIcon from '@/app/assets/icons/logout-icon.svg';
import { Text } from '@/app/components';
import { useUserContext } from '@/app/contexts/UserContext';
import { useMedications } from '@/app/hooks/useMedications';
import { MainNavigationProps } from '@/app/interfaces/navigation/main.interface';
import { MAIN_ROUTE } from '@/app/routes/routes';
import colors from '@/app/theme/colors';

import EmptyListComponent from './components/EmptyListComponent/EmptyListComponent';
import MedicationItem from './components/MedicationItem/MedicationItem';

const stylesheet = createStyleSheet((theme, runtime) => ({
  addButton: {
    alignItems: 'center',
    backgroundColor: theme.app.button.primary.background,
    borderRadius: 12,
    bottom: 42,
    height: 48,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    width: 48,
  },
  backButton: {
    alignItems: 'center',
    borderColor: '#F7F7F7',
    borderRadius: 36,
    borderWidth: 1,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  contentContainer: {
    flexGrow: 1,
    gap: 10,
    paddingBottom: 42,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 35,
    width: '100%',
  },
  loader: {
    marginTop: 30,
  },
  medicationsContainer: {
    marginTop: 20,
    width: '100%',
  },
  root: {
    alignItems: 'center',
    backgroundColor: theme.app.background.primary,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: runtime.insets.top,
  },
  title: {
    color: theme.app.text.primary,
  },
}));

const MedicationList: FC = () => {
  const { logout } = useUserContext();
  const { styles } = useStyles(stylesheet);
  const navigation = useNavigation<MainNavigationProps<typeof MAIN_ROUTE.MEDICATION_INFO>>();

  const { data: medications, isLoading } = useMedications();

  const onAddPress = () => navigation.navigate(MAIN_ROUTE.MEDICATION_INFO);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text fontSize={24} fontWeight="500" lineHeight={32} style={styles.title}>
          Medication List
        </Text>
        <TouchableOpacity style={styles.backButton} onPress={logout}>
          <LogoutIcon height={20} width={20} />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator color={colors.blue} style={styles.loader} />
      ) : (
        <FlatList
          ListEmptyComponent={EmptyListComponent}
          contentContainerStyle={styles.contentContainer}
          data={medications}
          renderItem={({ item }) => <MedicationItem medication={item} />}
          style={styles.medicationsContainer}
        />
      )}
      <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
        <AddIcon height={24} width={24} />
      </TouchableOpacity>
    </View>
  );
};

export default MedicationList;
