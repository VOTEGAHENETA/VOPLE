import Text from '@/components/atoms/Text';
import styles from './index.module.scss';
import { getFormattedDate, getFormattedTime } from '@/utils/date';

interface CommonLeftContentProps {
  sessionName: string;
  startTime: string;
  endTime: string;
  isClosed?: boolean;
}

const formatPeriod = (
  sd: string,
  st: string,
  ed: string,
  et: string
): string => {
  const startDateTime = `${sd}(${st})`;
  const endDateTime = `${ed} (${et})`;

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
  const sd = getFormattedDate(new Date(startTime));
  const ed = getFormattedDate(new Date(startTime));
  const st = getFormattedTime(new Date(endTime));
  const et = getFormattedTime(new Date(endTime));
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
      <p className={styles.period}>{formatPeriod(sd, st, ed, et)}</p>
    </div>
  );
};

export default CommonLeftContent;
