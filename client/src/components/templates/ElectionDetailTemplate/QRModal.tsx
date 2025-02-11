import Text from '@/components/atoms/Text';
import styles from './index.module.scss';
import BaseButton from '@/components/atoms/BaseButton';
import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';
import { useQRCode } from '@/services/hooks/useQRCode';
import React, { useEffect, useState } from 'react';

interface Props {
  param: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function QRModal({ param, isOpen, setIsOpen }: Props) {
  const { data } = useQRCode(Number(param));
  const [qr, SetQR] = useState<string>('');

  useEffect(() => {
    if (data) SetQR(data);
  });

  function handleCloseDialog() {
    setIsOpen(false);
  }

  function handleDialogOutSideClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  }
  return (
    <dialog
      id='qr-modal'
      className={styles['qr-modal']}
      open={isOpen}
      onClick={handleDialogOutSideClick}
      style={{ display: isOpen ? 'flex' : 'none' }}
    >
      <div className={styles['qr-modal-wrapper']}>
        <img src={qr} alt='확대한 QR' />
        <BaseButton
          type='button'
          kind='mini-chip'
          status={BASE_BUTTON_STATUS.OUTLINE}
          onClick={handleCloseDialog}
        >
          <Text size='s' weight='bold'>
            닫기
          </Text>
        </BaseButton>
      </div>
    </dialog>
  );
}

export default QRModal;
