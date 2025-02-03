import styles from './index.module.scss';
import IconVoteHand from '@/assets/icons/IconVoteHand';
import useTimer from '@/hooks/useTimer';
import { useEffect, useState } from 'react';
import Text from '@/components/atoms/Text';
import IconRefresh from '@/assets/icons/IconRefresh';
import clsx from 'clsx';

type VoteButtonLabel = '투표하기' | '투표시작전' | '선·관·위' | null;

interface Props {
  /** 버튼 타입 지정 (button, submit, reset) */
  type: 'button' | 'submit' | 'reset';
  /** 버튼에 이벤트 지정 */
  onClick?: () => void;
}

// API 연동을 시작하면 바꿀 예정
// const sessionId = '123';
const currentUserId = 123444;
const electionData = {
  sessionId: '456',
  hostId: 1234,
  voteStartTime: '2025-02-03T22:31:10',
  voteEndTime: '2025-02-04T18:00:00',
};

/** 메인화면 footer에 적용될 Router 버튼 입니다. */
function CircleButton({ type = 'button', onClick }: Props) {
  const isHost = currentUserId === electionData.hostId;
  const [state, setState] = useState({
    status: true,
    buttonLabel: '선·관·위' as VoteButtonLabel,
    deadLine: new Date(),
    onlyRefresh: false,
    isLoading: false,
  });

  useEffect(() => {
    updateButtonState();
  }, []);

  function updateButtonState() {
    if (isHost) return; // 선거 호스트인 경우 로직 작동 불필요

    if (currentUserId !== electionData.hostId) {
      const now = new Date();
      const startTime = new Date(electionData.voteStartTime);
      const endTime = new Date(electionData.voteEndTime);
      const newStatus = startTime <= now && now <= endTime;

      setState((prev) => ({
        ...prev,
        status: newStatus,
        buttonLabel: newStatus ? '투표하기' : '투표시작전',
        deadLine: newStatus ? endTime : startTime,
        onlyRefresh: false,
        isLoading: false,
      }));
    }
  }

  function handleButtonClick() {
    if (state.onlyRefresh) {
      setState((prev) => ({
        ...prev,
        isLoading: true,
      }));
      setTimeout(() => {
        updateButtonState();
      }, 1000);
    } else if (state.status && onClick) {
      onClick();
    }
  }

  const timeLeft = isHost ? null : useTimer(state.deadLine);
  useEffect(() => {
    if (!isHost && !state.status && timeLeft === '00:00:00') {
      setState((prev) => ({
        ...prev,
        buttonLabel: null,
        onlyRefresh: true,
      }));
    }
  }, [timeLeft]);

  return (
    <div className={styles['btn-container']}>
      <Text size='sm' color={state.status ? '#F58420' : '#333333'}>
        {state.onlyRefresh ? '새로고침!!' : timeLeft}
      </Text>
      <button
        type={type}
        className={clsx(styles.btn, styles[`btn-status-${state.status}`])}
        onClick={handleButtonClick}
      >
        <Text weight='normal' size='sm'>
          {state.buttonLabel}
        </Text>
        <div className={styles[`spin-${state.isLoading}`]}>
          {state.onlyRefresh ? <IconRefresh /> : <IconVoteHand />}
        </div>
      </button>
    </div>
  );
}

export default CircleButton;
