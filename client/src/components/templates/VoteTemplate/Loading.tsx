import { useState, useEffect } from 'react';
import ConfirmModal from '@/components/molecules/ConfirmModal';
import greenCheck from '@/assets/icons/greenCheck.svg';
import Text from '@/components/atoms/Text';
import styles from './index.module.scss';

function Loading() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => (prev > 1 ? prev - 1 : 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ConfirmModal imgSrc={greenCheck}>
      <div className={styles.loading}>
        <div className={styles.complete}>
          <Text size='s' weight='bold' color='#000000'>
            투표가 완료 됐어요.
          </Text>
          <Text size='s' weight='bold' color='#000000'>
            당신의 한 표가 세상을 만듭니다!
          </Text>
        </div>
        <Text size='s' weight='normal' color='#777777'>
          잠시후 투표 현황 페이지로 이동합니다 ... {count}
        </Text>
      </div>
    </ConfirmModal>
  );
}

export default Loading;
