import styles from './index.module.scss';
import Result from '@/components/organisms/WaitResult';
import FinalResult from '@/components/organisms/FinalResult';
import people from '@/assets/icons/people.svg';
import Text from '@/components/atoms/Text';
import { useFinalResult } from '@/services/hooks/useFinalResult';

function FinalTemplate() {
  const sessionId = 1;
  const { data } = useFinalResult(sessionId);

  const formatDateTime = (isoString: string): string => {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  console.log(data.electionSessionDto);

  return (
    <div className={styles.container}>
      <div className={styles.voteInfo}>
        <img src={people} alt='' />
        <Text size='lg' weight='bold' color='#111111'>
          {data.electionSessionDto?.sessionName}
        </Text>
        <Text size='s' weight='normal' color='#333333'>
          {formatDateTime(data.electionSessionDto?.voteStartTime)} ~{' '}
          {formatDateTime(data.electionSessionDto?.voteEndTime)}
        </Text>
      </div>
      <div className={styles.content}>
        <FinalResult />
        <Result />
      </div>
    </div>
  );
}

export default FinalTemplate;
