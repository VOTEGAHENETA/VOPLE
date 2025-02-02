import styles from './index.module.scss';
import IconVoteHand from '@/assets/icons/IconVoteHand';
import useTimer from '@/hooks/useTimer';
import { useEffect, useState } from 'react';
import Text from '@/components/atoms/Text';
import { useQuery } from '@tanstack/react-query';
import { ElectionContents } from '@/types/election';
import { getElection } from '@/services/election';

type VoteButtonLabel = '투표하기' | '투표시작전' | '선·관·위';

interface Props {
  /** 버튼 타입 지정 (button, submit, reset) */
  type: 'button' | 'submit' | 'reset';
  /** 버튼의 활성 상태 (able: true, disable: false) */
  status: boolean;
  /** 버튼에 이벤트 지정 */
  onClick?: () => void;
}

/** 메인화면 footer에 적용될 Router 버튼 입니다. */
function CircleButton({ type = 'button', status, onClick }: Props) {
  const [buttonLabel, setButtonLabel] = useState<VoteButtonLabel>('투표시작전');
  const [deadLine, setDeadline] = useState<Date>(new Date()); // test 데이터
  const timeLeft = useTimer(deadLine);

  // sessionId와 currentUserId는 API 연동을 시작하면 바꿀 예정 (아마 zustand 활용?)
  const sessionId = '123';
  const currentUserId = 456789;

  const { data: electionData } = useQuery<ElectionContents>({
    queryKey: ['election', sessionId],
    queryFn: () => getElection(sessionId),
  });

  useEffect(() => {
    if (!electionData) return;

    const now = new Date();
    const startTime = new Date(electionData.voteStartTime);
    const endTime = new Date(electionData.voteEndTime);

    if (electionData.hostId === currentUserId) {
      setButtonLabel('선·관·위');
    } else {
      if (now < startTime) {
        setButtonLabel('투표시작전');
        setDeadline(new Date(electionData.voteStartTime));
      } else if (startTime <= now && now <= endTime) {
        setButtonLabel('투표하기');
        setDeadline(new Date(electionData.voteEndTime));
      }
    }
  }, [electionData]);

  const btnClasses = [
    styles.btn,
    styles[`btn-status-${status ? 'able' : 'disable'}`],
  ].join(' ');

  return (
    <div className={styles['btn-container']}>
      <div>{timeLeft}</div>
      <button type={type} className={btnClasses} onClick={onClick}>
        <Text weight='normal' size='s'>
          {buttonLabel}
        </Text>
        <div>
          <IconVoteHand />
        </div>
      </button>
    </div>
  );
}

export default CircleButton;
