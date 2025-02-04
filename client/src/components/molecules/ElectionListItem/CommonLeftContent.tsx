import Text from '@/components/atoms/Text';
import styles from './index.module.scss';

interface CommonLeftContentProps {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  isClosed?: boolean;
}

const formatPeriod = (startDate: string, endDate: string): string => {
  // 기존의 formatPeriod 함수 구현을 여기에 추가하시면 됩니다.
  return `${startDate} - ${endDate}`;
};

export const CommonLeftContent = ({
  title,
  startDate,
  endDate,
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
          {title}
        </Text>
      </div>
      <p className={styles.period}>{formatPeriod(startDate, endDate)}</p>
    </div>
  );
};

export default CommonLeftContent;
