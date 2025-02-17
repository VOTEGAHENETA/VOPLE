import Text from '@/components/atoms/Text';
import styles from './index.module.scss';
import {
  convertUTCToKST,
  getFormattedDate,
  getFormattedTime,
} from '@/utils/date';

interface CommonLeftContentProps {
  sessionName: string;
  startTime: string;
  endTime: string;
  isClosed?: boolean;
}

const formatPeriod = (st: string, et: string): string => {
  const startDate = getFormattedDate(convertUTCToKST(new Date(st)));
  const startTime = getFormattedTime(convertUTCToKST(new Date(st)));
  const endDate = getFormattedDate(convertUTCToKST(new Date(et)));
  const endTime = getFormattedTime(convertUTCToKST(new Date(et)));

  const startDateTime = `${startDate}(${startTime})`;
  const endDateTime = `${endDate}(${endTime})`;

  const str = `${startDateTime} -
  ${endDateTime}`;
  return str;
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
