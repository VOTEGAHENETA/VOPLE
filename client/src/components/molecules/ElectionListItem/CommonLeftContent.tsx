import Text from '@/components/atoms/Text';
import styles from './index.module.scss';

interface CommonLeftContentProps {
  sessionName: string;
  startTime: string;
  endTime: string;
  isClosed?: boolean;
}

const formatPeriod = (startTime: string, endTime: string): string => {
  // 기존의 formatPeriod 함수 구현을 여기에 추가하시면 됩니다.
  return `${startTime} - ${endTime}`;
};

export const CommonLeftContent = ({
  sessionName,
  startTime,
  endTime,
  isClosed = false,
}: CommonLeftContentProps) => {
  return (
    <div className={styles.leftContent}>
      <div className={styles.title__wrap}>
        {isClosed && (
          <Text
            className={styles.closedBadge}
            size='sm'
            weight='bold'
            color='var(--color-main-pink)'
          >
            마감
          </Text>
        )}
        <Text
          className={styles.title}
          size='sm'
          weight='bold'
          color='var(--color-black)'
        >
          {sessionName}
        </Text>
      </div>
      <p className={styles.period}>{formatPeriod(startTime, endTime)}</p>
    </div>
  );
};

export default CommonLeftContent;
