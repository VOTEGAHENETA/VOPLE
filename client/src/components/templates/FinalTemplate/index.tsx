import styles from './index.module.scss';
import Result from '@/components/organisms/WaitResult';
import FinalResult from '@/components/organisms/FinalResult';
import people from '@/assets/icons/people.svg';
import crown from '@/assets/icons/3dcrown.svg';
import Text from '@/components/atoms/Text';
import { getResultCurrent } from '@/services/election';
import { getFinalResult } from '@/services/election';
import { useEffect, useState } from 'react';
import { ElectionResult } from '@/types/final';
import { VoteResultsResponse } from '@/types/voteSession';
import { useParams } from 'react-router-dom';

function FinalTemplate() {
  const { election_id } = useParams<{ election_id: string }>();
  const sessionId = Number(election_id);
  const [finalData, setFinalData] = useState<ElectionResult | null>(null);
  const [currentData, setCurrentData] = useState<VoteResultsResponse | null>(
    null
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const finalResponse = await getFinalResult(sessionId);
        setFinalData(finalResponse);
        const currentResponse = await getResultCurrent(sessionId);
        setCurrentData(currentResponse);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [sessionId]);

  const formatDateTime = (isoString: string): string => {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  if (!finalData || !currentData) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.voteInfo}>
        <img src={people} alt='' />
        <Text size='lg' weight='bold' color='#111111'>
          {finalData.electionSessionDto?.sessionName}
        </Text>
        <Text size='s' weight='normal' color='#333333'>
          {formatDateTime(finalData.electionSessionDto?.voteStartTime)} ~{' '}
          {formatDateTime(finalData.electionSessionDto?.voteEndTime)}
        </Text>
      </div>
      <div className={styles.result}>
        <div className={styles.text}>
          <Text size='sm' weight='bold' color='#F58420'>
            투표 결과
          </Text>
          <Text size='lg' weight='bold' color='#333333'>
            모두의 한표, 과연 결과는?!
          </Text>
        </div>
        <img src={crown} className={styles.crown} />
        <div className={styles.content}>
          <FinalResult finalData={finalData} />
          <Result currentData={currentData} sessionId={sessionId} />
        </div>
      </div>
    </div>
  );
}

export default FinalTemplate;
