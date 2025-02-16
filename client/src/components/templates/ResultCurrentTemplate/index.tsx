import Result from '@/components/organisms/WaitResult';
import ResultChatContainer from '@/components/organisms/ResultChatContainer';
import styles from './index.module.scss';
import { getFinalResult, getResultCurrent } from '@/services/election';
import { useEffect, useState } from 'react';
import { VoteResultsResponse } from '@/types/voteSession';
import { ElectionResult } from '@/types/final';
import { useNavigate } from 'react-router-dom';

const ResultCurrentTemplate = () => {
  const [currentData, setCurrentData] = useState<VoteResultsResponse | null>();
  const [finalData, setFinalData] = useState<ElectionResult | null>();
  const navigate = useNavigate();
  const sessionId = 1;

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

  console.log(finalData?.electionSessionDto.voteEndTime);

  // 투표 종료되면 이동
  useEffect(() => {
    if (finalData?.electionSessionDto.voteEndTime) {
      const voteEndTime = new Date(finalData.electionSessionDto.voteEndTime);
      const now = new Date();
      if (now >= voteEndTime) {
        navigate(`/elections/${sessionId}/final`);
      }
    }
  }, [finalData, navigate, sessionId]);

  return (
    <div className={styles.result__container}>
      {currentData && <Result currentData={currentData} />}
      <ResultChatContainer sessionId={1} userId={1} />
    </div>
  );
};

export default ResultCurrentTemplate;
