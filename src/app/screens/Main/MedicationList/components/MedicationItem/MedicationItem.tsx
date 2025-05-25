import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/app/components';
import { MainNavigationProps } from '@/app/interfaces/navigation/main.interface';
import { MAIN_ROUTE } from '@/app/routes/routes';
import { IMedication } from '@/app/interfaces/medication.interface';
import EditIcon from '@/app/assets/icons/edit-icon.svg';
import PlusIcon from '@/app/assets/icons/plus-icon.svg';
import MinusIcon from '@/app/assets/icons/minus-icon.svg';
import FulfilledIcon from '@/app/assets/icons/ok-icon.svg';

const stylesheet = createStyleSheet((theme) => ({
  root: {
    backgroundColor: theme.app.background.lightGray,
    borderRadius: 16,
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 24
  },
  title: {
    color: theme.app.text.primary,
  },
  editButton: {
    width: 32,
    height: 32,
    backgroundColor: theme.app.background.primary,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
  },
  description: {
    marginTop: 4,
    marginBottom: 10,
    minHeight: 120,
    color: theme.app.text.secondary,
  },
  amountTitle: {
    color: theme.app.text.secondary,
  },
  amountContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center'
  },
  counterRow: {
    backgroundColor: theme.app.background.darkGray,
    borderRadius: 100,
    paddingVertical: 6,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  amount: {
    fontSize: 18,
    minWidth: 24,
    textAlign: 'center'
  },
  divider: {
    width: 1,
    height: 15,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 14,
  },
  fulfilled: {
    borderWidth: 1,
    borderColor: theme.app.background.green
  },
  fulfilledIcon: {
    backgroundColor: theme.app.background.green,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  titleWrapper: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center'
  }
}));

type MedicationItemPropsType = {
  medication: IMedication;
};

const MedicationItem = ({ medication }: MedicationItemPropsType) => {
  const { styles } = useStyles(stylesheet);
  const navigation = useNavigation<MainNavigationProps<typeof MAIN_ROUTE.MEDICATION_INFO>>();
  
  const isFulfilledMedication = medication.initialAmount === medication.targetAmount;

  const onEditPress = () => navigation.navigate(MAIN_ROUTE.MEDICATION_INFO, { medicationId: medication.id })
  
  return (
    <View style={[styles.root, isFulfilledMedication && styles.fulfilled]}>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          {isFulfilledMedication && <View style={styles.fulfilledIcon}><FulfilledIcon /></View>}
          <Text style={styles.title} fontWeight="500">
            {medication.name}
          </Text>
        </View>
        <Text style={styles.description} fontSize={14} lineHeight={20}>{medication.description}</Text>
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
          <Text style={styles.amountTitle} fontSize={12} lineHeight={23}>Target amount: {medication.targetAmount}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
        <EditIcon width={20} height={20} />
      </TouchableOpacity>
    </View>
  );
};

export default MedicationItem;
