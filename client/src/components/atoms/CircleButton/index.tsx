import { ReactNode } from 'react';
import styles from './index.module.scss';
import IconVoteHand from '@/assets/icons/IconVoteHand';
import useTimer from '@/hooks/useTimer';

interface Props {
  /** 버튼 타입 지정 (button, submit, reset) */
  type: 'button' | 'submit' | 'reset';
  /** 버튼의 내용 입력 */
  children: ReactNode;
  /** 버튼의 활성 상태 (able: true, disable: false) */
  status: boolean;
  /** 버튼에 이벤트 지정 */
  onClick?: () => void;
}

/** 메인화면 footer에 적용될 Router 버튼 입니다. */
function CircleButton({ type = 'button', children, status, onClick }: Props) {
  const deadLine = new Date('2025-01-31T18:00:00'); // test 데이터
  const timeLeft = useTimer(deadLine);

  const btnClasses = [
    styles.btn,
    styles[`btn-status-${status ? 'able' : 'disable'}`],
  ].join(' ');

  return (
    <div className={styles['btn-container']}>
      <div>{timeLeft}</div>
      <button type={type} className={btnClasses} onClick={onClick}>
        {children}
        <div>
          <IconVoteHand />
        </div>
      </button>
    </div>
  );
}

export default CircleButton;
