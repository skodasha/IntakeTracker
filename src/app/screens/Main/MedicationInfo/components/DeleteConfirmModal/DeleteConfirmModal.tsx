import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/app/components';
import Button from '@/app/components/Button';

const stylesheet = createStyleSheet((theme) => ({
  cancelButton: {
    alignItems: 'center',
    height: 48,
    marginBottom: 40,
    paddingVertical: 12,
    width: '100%',
  },
  container: {
    alignItems: 'center',
    backgroundColor: theme.app.background.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 40,
  },
  deleteButton: {
    backgroundColor: theme.app.button.error.background,
    marginTop: 32,
  },
  handle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 2,
    height: 5,
    marginTop: 8,
    width: 44,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  title: {
    marginTop: 46,
    textAlign: 'center',
  },
}));

type DeleteConfirmModalPropsType = {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const DeleteConfirmModal = ({ isVisible, onCancel, onConfirm }: DeleteConfirmModalPropsType) => {
  const { styles } = useStyles(stylesheet);

  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      swipeDirection="down"
      onBackdropPress={onCancel}
      onSwipeComplete={onCancel}
    >
      <View style={styles.container}>
        <View style={styles.handle} />
        <Text fontSize={24} fontWeight="500" lineHeight={32} style={styles.title}>
          Are you sure you want to delete this medication?
        </Text>
        <Button style={styles.deleteButton} title="Delete medication" onPress={onConfirm} />
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text fontSize={16} fontWeight="500" lineHeight={20}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default DeleteConfirmModal;
