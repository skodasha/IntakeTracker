import { type FC } from 'react';
import { useNavigation } from '@react-navigation/native';

import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/app/components';
import { MainNavigationProps } from '@/app/interfaces/navigation/main.interface';
import { MAIN_ROUTE } from '@/app/routes/routes';
import { useMedications } from '@/app/hooks/useMedications';
import colors from '@/app/theme/colors';
import LogoutIcon from '@/app/assets/icons/logout-icon.svg';
import AddIcon from '@/app/assets/icons/add-icon.svg';

import MedicationItem from './components/MedicationItem/MedicationItem';
import EmptyListComponent from './components/EmptyListComponent/EmptyListComponent';

const stylesheet = createStyleSheet((theme, runtime) => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.app.background.primary,
    flex: 1,
    paddingTop: runtime.insets.top,
    paddingHorizontal: 20
  },
  title: {
    color: theme.app.text.primary,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#F7F7F7',
    borderWidth: 1,
    borderRadius: 36
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 35
  },
  addButton: {
    width: 48,
    height: 48,
    position: 'absolute',
    bottom: 42,
    right: 20,
    backgroundColor: theme.app.button.primary.background,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medicationsContainer: {
    width: '100%',
    marginTop: 20,
  },
  contentContainer: {
    flexGrow: 1,
    gap: 10,
    paddingBottom: 42
  },
  loader: {
    marginTop: 30
  }
}));

const MedicationList: FC = () => {
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
        <TouchableOpacity style={styles.backButton}>
          <LogoutIcon width={20} height={20} />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator color={colors.blue} style={styles.loader} />
      ) : (
        <FlatList 
          style={styles.medicationsContainer}
          contentContainerStyle={styles.contentContainer}
          data={medications}
          renderItem={({ item }) => <MedicationItem medication={item} />}
          ListEmptyComponent={EmptyListComponent}
        />
      )}
      <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
        <AddIcon width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
};

export default MedicationList;
