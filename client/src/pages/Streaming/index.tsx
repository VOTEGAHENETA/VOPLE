// import BaseButton from '@/components/atoms/BaseButton';
import TabContainer from '@/components/organisms/TabContainer';
import styles from './index.module.scss';
import StreamSender from '@/components/atoms/StreamSender';
import StreamReceiver from '@/components/atoms/StreamReceiver';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import { useIsMine } from '@/services/hooks/live';

type StreamingParams = {
  session_id?: string; // optional로 변경
  team_id?: string; // optional로 변경
};

export default function Streaming() {
  const { session_id, team_id } = useParams<keyof StreamingParams>();

  // 파라미터 유효성 검사
  if (!session_id || !team_id) {
    return <div>잘못된 접근입니다.</div>;
  }
  const teamId = Number(team_id);
  const sessionId = Number(session_id);

  const { data: isCandidate, isLoading, isError } = useIsMine(teamId);

  if (isError) {
    return <div>사용자 정보를 불러오는데 실패했습니다.</div>;
  }
  return (
    <div className={styles.streaming__section}>
      <div className={styles.streamingContent}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {isCandidate ? (
              <StreamSender streamId={teamId} />
            ) : (
              <StreamReceiver streamId={teamId} />
            )}
          </>
        )}
      </div>
      {/* <BaseButton kind='base' status='fill' type='button'>
            라이브 시작
          </BaseButton> */}
      <TabContainer
        sessionId={sessionId}
        theme='dark'
        type='team'
        userId={1}
        voteTeamId={teamId}
      />
    </div>
  );
}
