import styles from './index.module.scss';
import IconBlurChart from '@/assets/icons/IconBlurChart';
import IconFire from '@/assets/icons/IconFire';
import Text from '@/components/atoms/Text';
import { VoteSession } from '@/types/election';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface Props {
  data: VoteSession;
}

function Turnout({ data }: Props) {
  const [curIndex, setCurIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurIndex((prev) => (prev + 1) % data.voteResults.length);
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
              {data.voteResults[curIndex].voteName}
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
          {data.wholeVoterPercent}%
        </div>
      </div>
    </div>
  );
}

export default Turnout;
