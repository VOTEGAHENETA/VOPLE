import styles from './index.module.scss';
import Text from '@/components/atoms/Text';
import duumyQR from '@/assets/icons/dummyQR.svg';
import BaseButton from '@/components/atoms/BaseButton';
import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';
import React from 'react';

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function QRContainer({ setIsOpen }: Props) {
  function handleExpendQR() {
    setIsOpen(true);
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
    </div>
  );
}

export default QRContainer;
