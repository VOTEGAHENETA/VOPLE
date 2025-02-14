import styles from './index.module.scss';
import IconVoteHand from '@/assets/icons/IconVoteHand';
import useTimer from '@/hooks/useTimer';
import { useEffect, useState } from 'react';
import Text from '@/components/atoms/Text';
import IconRefresh from '@/assets/icons/IconRefresh';
import clsx from 'clsx';
import { useElectionStore } from '@/stores/election';
import { useNavigate, useParams } from 'react-router-dom';

type VoteButtonLabel = '투표하기' | '투표시작전' | '선·관·위' | null;

interface Props {
  /** 버튼 타입 지정 (button, submit, reset) */
  type: 'button' | 'submit' | 'reset';
}

// API 연동을 시작하면 바꿀 예정
const currentUserId = 12;

/** 메인화면 footer에 적용될 Router 버튼 입니다. */
function CircleButton({ type = 'button' }: Props) {
  const { election_id } = useParams() as { election_id: string };
  const { election, isHost } = useElectionStore();
  const navigate = useNavigate();

  const [state, setState] = useState({
    status: true,
    buttonLabel: '선·관·위' as VoteButtonLabel,
    deadLine: new Date(),
    onlyRefresh: false,
    isLoading: false,
  });

  useEffect(() => {
    if (election) {
      updateButtonState();
    }
  }, [election]);

  function updateButtonState() {
    if (!election) return;
    if (isHost) return; // 선거 호스트인 경우 로직 작동 불필요

    if (currentUserId !== election.hostId) {
      const now = new Date();
      const startTime = new Date(election.startTime);
      const endTime = new Date(election.endTime);
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
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }));
      }, 1000);
    } else {
      if (isHost) {
        navigate(`/elections/${election_id}/manage`);
      } else {
        navigate(`/elections/${election_id}/vote`);
      }
    }
  }

  const timeLeft = useTimer(isHost ? new Date() : state.deadLine);
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
      <Text
        size='sm'
        color={state.status ? 'var(--color-main-orange)' : 'var(--color-black)'}
      >
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
        <div
          className={clsx(styles[`spin-${state.isLoading}`], {
            [styles.spinning]: state.isLoading,
          })}
        >
          {state.onlyRefresh ? <IconRefresh /> : <IconVoteHand />}
        </div>
      </button>
    </div>
  );
}

export default CircleButton;
