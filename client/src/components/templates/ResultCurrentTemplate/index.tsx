import Result from '@/components/organisms/WaitResult';
import ResultChatContainer from '@/components/organisms/ResultChatContainer';
import styles from './index.module.scss';
import { getFinalResult, getResultCurrent } from '@/services/election';
import { useEffect, useState } from 'react';
import { VoteResultsResponse } from '@/types/voteSession';
import { ElectionResult } from '@/types/final';
import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

const ResultCurrentTemplate = () => {
  const [currentData, setCurrentData] = useState<VoteResultsResponse | null>(
    null
  );
  const [finalData, setFinalData] = useState<ElectionResult | null>(null);
  // const navigate = useNavigate();
  const { election_id } = useParams<{ election_id: string }>();
  const sessionId = Number(election_id);

  // 뒤로가기(팝스테이트) 이벤트 막기
  // useEffect(() => {
  //   window.history.pushState(null, '', window.location.href);
  //   const handleBackButton = () => {
  //     window.history.pushState(null, '', window.location.href);
  //   };
  //   window.addEventListener('popstate', handleBackButton);
  //   return () => {
  //     window.removeEventListener('popstate', handleBackButton);
  //   };
  // }, []);

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

  // // 투표 종료되면 이동
  // useEffect(() => {
  //   if (finalData?.electionSessionDto.voteEndTime) {
  //     const voteEndTime = new Date(finalData.electionSessionDto.voteEndTime);
  //     const now = new Date();
  //     if (now >= voteEndTime) {
  //       navigate(`/elections/${sessionId}/final`);
  //     }
  //   }
  // }, [finalData, navigate, sessionId]);

  return (
    <div className={styles.result__container}>
      {currentData && (
        <Result currentData={currentData} sessionId={sessionId} />
      )}
      <ResultChatContainer sessionId={1} userId={1} />
    </div>
  );
};

export default ResultCurrentTemplate;
