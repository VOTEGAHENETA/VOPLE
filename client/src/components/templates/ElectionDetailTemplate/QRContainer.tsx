import styles from './index.module.scss';
import Text from '@/components/atoms/Text';
import duumyQR from '@/assets/icons/dummyQR.svg';
import BaseButton from '@/components/atoms/BaseButton';
import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';
import React, { useState } from 'react';
import { useQRCode } from '@/services/hooks/useQRCode.ts';

interface Props {
  param: string;
}

function QRContainer({ param }: Props) {
  const { data } = useQRCode(param);
  const [qr, SetQR] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleExpendQR() {
    console.log(data);
    SetQR(data?.data);
    setIsOpen(true);
  }

  function handleCloseDialog() {
    setIsOpen(false);
  }

  function handleDialogOutSideClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  }

  return (
    <div className={styles['qr-container']}>
      <div className={styles['qr-section-text-part']}>
        <Text size='sm' weight='bold'>
          QR 코드
        </Text>
      </div>
      <div className={styles['qr-section-btn-part']}>
        <div className={styles['qr-section-wrapper']}>
          <div className={styles.blur}>
            <img src={duumyQR} alt='더미 QR' />
          </div>
          <div className={styles['btn-qr-extend']}>
            <BaseButton
              type='button'
              kind='mini-chip'
              status={BASE_BUTTON_STATUS.OUTLINE}
              onClick={handleExpendQR}
            >
              <Text size='s' weight='bold'>
                QR 코드 보기
              </Text>
            </BaseButton>
          </div>
        </div>
      </div>
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
    </div>
  );
}

export default QRContainer;
