import styles from './index.module.scss';
import IconVoteHand from '@/assets/icons/IconVoteHand';
import useTimer from '@/hooks/useTimer';
import { useEffect, useState } from 'react';
import Text from '@/components/atoms/Text';

type VoteButtonLabel = '투표하기' | '투표시작전' | '선·관·위';

interface Props {
  /** 버튼 타입 지정 (button, submit, reset) */
  type: 'button' | 'submit' | 'reset';
  /** 버튼에 이벤트 지정 */
  onClick?: () => void;
}

// API 연동을 시작하면 바꿀 예정
// const sessionId = '123';
const currentUserId = 456789;
const electionData = {
  sessionId: '456',
  hostId: 1234,
  voteStartTime: '2025-02-03T15:55:50',
  voteEndTime: '2025-02-03T18:00:00',
};

/** 메인화면 footer에 적용될 Router 버튼 입니다. */
function CircleButton({ type = 'button', onClick }: Props) {
  const [status, setStatus] = useState<boolean>();
  const [buttonLabel, setButtonLabel] = useState<VoteButtonLabel>('투표시작전');
  const [deadLine, setDeadline] = useState<Date>(new Date());
  const timeLeft = useTimer(deadLine);

  // const { data: electionData } = useQuery<ElectionContents>({
  //   queryKey: ['election', sessionId],
  //   queryFn: () => getElection(sessionId),
  // });

  useEffect(() => {
    const now = new Date();
    const startTime = new Date(electionData.voteStartTime);
    const endTime = new Date(electionData.voteEndTime);

    if (electionData.hostId === currentUserId) {
      if (buttonLabel !== '선·관·위') setButtonLabel('선·관·위');
      return;
    }

    if (timeLeft === '00:00:00') {
      if (now <= endTime) {
        setButtonLabel('투표하기');
        setDeadline(endTime);
        setStatus(true);
      }
    }

    if (now < startTime) {
      if (buttonLabel !== '투표시작전') {
        setButtonLabel('투표시작전');
        setDeadline(startTime);
        setStatus(false);
      }
    } else if (now >= startTime && now <= endTime) {
      if (buttonLabel !== '투표하기') {
        setButtonLabel('투표하기');
        setDeadline(endTime);
        setStatus(true);
      }
    }
  }, [timeLeft]);

  const btnClasses = [styles.btn, styles[`btn-status-${status}`]].join(' ');

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
