import { useRef } from 'react';

import ConfirmBottomSheetModal from '@/app/components/ConfirmBottomSheetModal';
import {
  ConfirmModalPropsType,
  ConfirmModalRefType,
} from '@/app/components/ConfirmBottomSheetModal/ConfirmBottomSheetModal';

export const useConfirmModal = () => {
  const ref = useRef<ConfirmModalRefType>(null);

  const ConfirmModal = (props: ConfirmModalPropsType) => {
    return <ConfirmBottomSheetModal ref={ref} {...props} />;
  };

  const openConfirm = () => {
    ref.current?.present();
  };

  return {
    ConfirmModal,
    openConfirm,
  };
};
