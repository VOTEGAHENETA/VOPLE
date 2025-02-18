import Result from '@/components/organisms/WaitResult';
import ResultChatContainer from '@/components/organisms/ResultChatContainer';
import styles from './index.module.scss';
import { getResultCurrent } from '@/services/election';
import { useEffect, useState } from 'react';
import { VoteResultsResponse } from '@/types/voteSession';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ResultCurrentTemplate = () => {
  const [currentData, setCurrentData] = useState<VoteResultsResponse | null>();
  const navigate = useNavigate();
  const { election_id } = useParams<{ election_id: string }>();
  const sessionId = Number(election_id);

  // 뒤로가기(팝스테이트) 이벤트 막기
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    const handleBackButton = () => {
      window.history.pushState(null, '', window.location.href);
    };
    window.addEventListener('popstate', handleBackButton);
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

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

  // // 투표 종료되면 이동
  useEffect(() => {
    if (currentData?.endDate) {
      const voteEndTime = new Date(currentData.endDate);
      const now = new Date();
      if (now.getTime() >= voteEndTime.getTime()) {
        navigate(`/elections/${sessionId}/final`);
      }
    }
  }, [currentData]);

  return (
    <div className={styles.result__container}>
      {currentData && (
        <Result currentData={currentData} sessionId={sessionId} />
      )}
      <ResultChatContainer sessionId={sessionId} />
    </div>
  );
};

export default ResultCurrentTemplate;
