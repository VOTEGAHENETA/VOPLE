import styles from './index.module.scss';
import IconBlurChart from '@/assets/icons/IconBlurChart';
import IconFire from '@/assets/icons/IconFire';
import Text from '@/components/atoms/Text';
import { ElectionResponse } from '@/types/voteSession';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface Props {
  election: ElectionResponse;
}

function Turnout({ election }: Props) {
  const [curIndex, setCurIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurIndex((prev) => (prev + 1) % election.voteResults.length);
        setIsVisible(true);
      }, 3000);
    }, 3000);

    return () => clearInterval(interval);
  }, [curIndex]);

  return (
    <div className={styles['main-turnout']}>
      <div className={styles['main-turnout-title']}>
        <Text size='m' color='var(--color-main-orange)' weight='bold'>
          현재 투표율
        </Text>
        <Text size='xl' color='var(--color-black)' weight='bold'>
          Who The Next !
        </Text>
        <Text size='xl' color='var(--color-black)' weight='bold'>
          다음 [&nbsp;
          <div className={styles.rotate}>
            <Text
              size='xl'
              color='var(--color-main-orange)'
              weight='bold'
              className={clsx(
                styles['vote-name'],
                isVisible ? styles['fade-in'] : styles['fade-out']
              )}
            >
              {election?.voteResults[curIndex].voteName ||
                '선거 정보 불러오는 중...'}
            </Text>
          </div>
          &nbsp;] 은 누구?!
        </Text>
      </div>
      <div className={styles['main-turnout-chart']}>
        <div className={styles.blur}>
          <IconBlurChart width='100%' />
        </div>
        <div className={styles['main-turnout-chart-percent']}>
          <IconFire />
          {election.wholeVoterPercent + '%' || '투표율 집계 중...'}
        </div>
      </div>
    </div>
  );
}

export default Turnout;
