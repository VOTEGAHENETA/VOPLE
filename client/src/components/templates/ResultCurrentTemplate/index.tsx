import Result from '@/components/organisms/WaitResult';
import ResultChatContainer from '@/components/organisms/ResultChatContainer';
import styles from './index.module.scss';
import { getResultCurrent } from '@/services/election';
import { useEffect, useState } from 'react';
import { VoteResultsResponse } from '@/types/voteSession';

const ResultCurrentTemplate = () => {
  const [currentData, setCurrentData] = useState<VoteResultsResponse | null>(
    null
  );
  const sessionId = 1;

  useEffect(() => {
    async function fetchData() {
      try {
        const currentResponse = await getResultCurrent(sessionId);
        setCurrentData(currentResponse);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [sessionId]);

  return (
    <div className={styles.result__container}>
      {currentData && <Result currentData={currentData} />}
      <ResultChatContainer sessionId={1} userId={1} />
    </div>
  );
};

export default ResultCurrentTemplate;
