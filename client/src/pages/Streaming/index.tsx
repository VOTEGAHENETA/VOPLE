import TabContainer from '@/components/organisms/TabContainer';
import styles from './index.module.scss';
import StreamSender from '@/components/atoms/StreamSender';
import StreamReceiver from '@/components/atoms/StreamReceiver';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import { useEffect, useState } from 'react';
import { getIsMine } from '@/services/stream';

type StreamingParams = {
  session_id?: string; // optional로 변경
  team_id?: string; // optional로 변경
};

interface StreamingState {
  isLoading: boolean;
  error: string | null;
  isCandidate: boolean | null;
}

export default function Streaming() {
  const { session_id, team_id } = useParams<keyof StreamingParams>();
  const [state, setState] = useState<StreamingState>({
    isLoading: true,
    error: null,
    isCandidate: null,
  });

  // 파라미터 유효성 검사
  if (!session_id || !team_id) {
    return <div>잘못된 접근입니다.</div>;
  }
  const teamId = Number(team_id);
  const sessionId = Number(session_id);

  useEffect(() => {
    let isSubscribed = true;

    const fetchCandidateStatus = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));
        const candidateData = await getIsMine(teamId);
        console.log('Candidate Data:', candidateData);

        if (
          isSubscribed &&
          candidateData &&
          typeof candidateData.isCandidate === 'boolean'
        ) {
          setState({
            isLoading: false,
            error: null,
            isCandidate: candidateData.isCandidate,
          });
        } else {
          throw new Error('후보자 데이터가 유효하지 않습니다.');
        }
      } catch (error) {
        if (isSubscribed) {
          console.error('Fetch Error:', error);
          setState({
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : '후보자 정보를 가져오는데 실패했습니다.',
            isCandidate: null,
          });
        }
      }
    };

    fetchCandidateStatus();

    return () => {
      isSubscribed = false;
    };
  }, [teamId]);

  // 에러 발생 시
  if (state.error) {
    return (
      <div className={styles.streaming__section}>
        <div className={styles.error}>{state.error}</div>
        <TabContainer
          sessionId={sessionId}
          theme='dark'
          type='team'
          voteTeamId={teamId}
        />
      </div>
    );
  }

  return (
    <div className={styles.streaming__section}>
      <div className={styles.streamingContent}>
        {state.isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {state.isCandidate ? (
              <StreamSender streamId={teamId} />
            ) : (
              <StreamReceiver streamId={teamId} />
            )}
          </>
        )}
      </div>
      <TabContainer
        sessionId={sessionId}
        theme='dark'
        type='team'
        voteTeamId={teamId}
      />
    </div>
  );
}
