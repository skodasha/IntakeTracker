import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/app/components';
import Button from '@/app/components/Button';

import BackdropComponent from './BackdropComponent';

const stylesheet = createStyleSheet((theme) => ({
  cancelButton: {
    alignItems: 'center',
    height: 48,
    marginBottom: 20,
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
    marginTop: 26,
    textAlign: 'center',
  },
}));

export type ConfirmModalRefType = {
  dismiss: () => void;
  present: () => void;
};

export type ConfirmModalPropsType = {
  confirmBtnTitle: string;
  onConfirm: () => void;
  title: string;
  onCancel?: () => void;
};

const ConfirmBottomSheetModal = forwardRef<ConfirmModalRefType, ConfirmModalPropsType>(
  ({ confirmBtnTitle, onCancel, onConfirm, title }, ref) => {
    const { styles } = useStyles(stylesheet);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    useImperativeHandle(ref, () => ({
      dismiss: () => bottomSheetModalRef.current?.dismiss(),
      present: () => bottomSheetModalRef.current?.present(),
    }));

    const handleCancelPress = () => {
      bottomSheetModalRef.current?.dismiss();
      if (onCancel) {
        onCancel();
      }
    };

    const handleConfirmPress = () => {
      bottomSheetModalRef.current?.dismiss();
      onConfirm();
    };

    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={BackdropComponent}
        handleIndicatorStyle={styles.handle}
        index={0}
      >
        <BottomSheetView style={styles.container}>
          <Text fontSize={24} fontWeight="500" lineHeight={32} style={styles.title}>
            {title}
          </Text>
          <Button
            style={styles.deleteButton}
            title={confirmBtnTitle}
            onPress={handleConfirmPress}
          />
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancelPress}>
            <Text fontSize={16} fontWeight="500" lineHeight={20}>
              Cancel
            </Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

ConfirmBottomSheetModal.displayName = 'ConfirmBottomSheetModal';
export default ConfirmBottomSheetModal;
