import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import EditIcon from '@/app/assets/icons/edit-icon.svg';
import MinusIcon from '@/app/assets/icons/minus-icon.svg';
import FulfilledIcon from '@/app/assets/icons/ok-icon.svg';
import PlusIcon from '@/app/assets/icons/plus-icon.svg';
import { Text } from '@/app/components';
import { IMedication } from '@/app/interfaces/medication.interface';
import { MainNavigationProps } from '@/app/interfaces/navigation/main.interface';
import { MAIN_ROUTE } from '@/app/routes/routes';

const stylesheet = createStyleSheet((theme) => ({
  amount: {
    fontSize: 18,
    minWidth: 24,
    textAlign: 'center',
  },
  amountContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  amountTitle: {
    color: theme.app.text.secondary,
  },
  container: {
    flex: 1,
  },
  counterButton: {
    alignItems: 'center',
    height: 20,
    justifyContent: 'center',
    width: 20,
  },
  counterRow: {
    alignItems: 'center',
    backgroundColor: theme.app.background.darkGray,
    borderRadius: 100,
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  description: {
    color: theme.app.text.secondary,
    marginBottom: 10,
    marginTop: 4,
    minHeight: 120,
  },
  divider: {
    backgroundColor: '#D9D9D9',
    height: 15,
    marginHorizontal: 14,
    width: 1,
  },
  editButton: {
    alignItems: 'center',
    backgroundColor: theme.app.background.primary,
    borderRadius: 32,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  fulfilled: {
    borderColor: theme.app.background.green,
    borderWidth: 1,
  },
  fulfilledIcon: {
    alignItems: 'center',
    backgroundColor: theme.app.background.green,
    borderRadius: 20,
    height: 20,
    justifyContent: 'center',
    width: 20,
  },
  root: {
    backgroundColor: theme.app.background.lightGray,
    borderRadius: 16,
    flexDirection: 'row',
    gap: 24,
    paddingHorizontal: 16,
    paddingVertical: 14,
    width: '100%',
  },
  title: {
    color: theme.app.text.primary,
  },
  titleWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
}));

type MedicationItemPropsType = {
  medication: IMedication;
};

const MedicationItem = ({ medication }: MedicationItemPropsType) => {
  const { styles } = useStyles(stylesheet);
  const navigation = useNavigation<MainNavigationProps<typeof MAIN_ROUTE.MEDICATION_INFO>>();

  const isFulfilledMedication = medication.initialAmount === medication.targetAmount;

  const onEditPress = () =>
    navigation.navigate(MAIN_ROUTE.MEDICATION_INFO, { medicationId: medication.id });

  return (
    <View style={[styles.root, isFulfilledMedication && styles.fulfilled]}>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          {isFulfilledMedication && (
            <View style={styles.fulfilledIcon}>
              <FulfilledIcon />
            </View>
          )}
          <Text fontWeight="500" style={styles.title}>
            {medication.name}
          </Text>
        </View>
        <Text fontSize={14} lineHeight={20} style={styles.description}>
          {medication.description}
        </Text>
        <View style={styles.amountContainer}>
          <View style={styles.counterRow}>
            <TouchableOpacity style={styles.counterButton}>
              <MinusIcon />
            </TouchableOpacity>
            <View style={styles.divider} />
            <Text style={styles.amount}>{medication.initialAmount}</Text>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.counterButton}>
              <PlusIcon />
            </TouchableOpacity>
          </View>
          <Text fontSize={12} lineHeight={23} style={styles.amountTitle}>
            Target amount: {medication.targetAmount}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
        <EditIcon height={20} width={20} />
      </TouchableOpacity>
    </View>
  );
};

export default MedicationItem;
