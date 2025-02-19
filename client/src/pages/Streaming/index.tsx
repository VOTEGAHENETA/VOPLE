import TabContainer from '@/components/organisms/TabContainer';
import styles from './index.module.scss';
import StreamSender from '@/components/atoms/StreamSender';
import StreamReceiver from '@/components/atoms/StreamReceiver';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import { useEffect, useState } from 'react';
import { getIsMine } from '@/services/stream';
import IconButton from '@/components/atoms/IconButton';
import StreamMobileBlock from '@/components/organisms/StreamMobileBlock';
import { useStreamData } from '@/services/hooks/live';

type StreamingParams = {
  session_id?: string; // optional로 변경
  team_id?: string; // optional로 변경
};

interface StreamingState {
  isLoading: boolean;
  error: string | null;
  isCandidate: boolean | null;
  isStreaming: boolean | null;
}

// interface CandidateData {
//   isCandidate: boolean;
// }

export default function Streaming() {
  const { session_id, team_id } = useParams<keyof StreamingParams>();
  const [state, setState] = useState<StreamingState>({
    isLoading: true,
    error: null,
    isCandidate: null,
    isStreaming: false,
  });

  // 파라미터 유효성 검사
  if (!session_id || !team_id) {
    return <div>잘못된 접근입니다.</div>;
  }
  const teamId = Number(team_id);
  const sessionId = Number(session_id);
  const { data: streamData, isLoading: isStreaming } = useStreamData(teamId);

  const navigate = useNavigate();

  useEffect(() => {
    let isSubscribed = true;

    async function fetchCandidateStatus() {
      try {
        const candidateData = await getIsMine(teamId);

        if (!isSubscribed) return;

        if (
          candidateData &&
          typeof candidateData.isCandidate === 'boolean' &&
          streamData &&
          typeof streamData.isStreaming === 'boolean'
        ) {
          setState({
            isLoading: false,
            error: null,
            isCandidate: candidateData.isCandidate,
            isStreaming: streamData.isStreaming,
          });
        } else {
          throw new Error('후보자 데이터가 유효하지 않습니다.');
        }
      } catch (error) {
        if (!isSubscribed) return;

        setState({
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : '후보자 정보를 가져오는데 실패했습니다.',
          isCandidate: null,
          isStreaming: null,
        });
      }
    }

    fetchCandidateStatus();

    return () => {
      isSubscribed = false;
    };
  }, [teamId, streamData]);

  function handleClickBack() {
    console.log('back!');
    navigate(`/elections/${session_id}`);
  }

  if (state.isLoading) {
    return (
      <div className={styles.loading}>
        <LoadingSpinner />
      </div>
    );
  }

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
      <div className={styles.streaming__back} onClick={handleClickBack}>
        <IconButton name='back' />
      </div>
      <div className={styles.streamingContent}>
        {state.isCandidate ? (
          <StreamSender streamId={teamId} streamData={streamData} />
        ) : // streamData가 있고 isStreaming이 true일 때만 StreamReceiver 렌더링
        isStreaming ? (
          <StreamReceiver streamData={streamData} />
        ) : (
          <div className={styles.loadingBox}>
            <LoadingSpinner />
            <span>아직 라이브 시작 전이에요😅</span>
          </div>
        )}
      </div>
      <TabContainer
        sessionId={sessionId}
        theme='dark'
        type='team'
        voteTeamId={teamId}
      />
      {state.isCandidate && <StreamMobileBlock sessionId={sessionId} />}
    </div>
  );
}
