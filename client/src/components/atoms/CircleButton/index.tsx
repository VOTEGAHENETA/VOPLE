import { ReactNode } from 'react';
import styles from './index.module.scss';
import IconVoteHand from '@/assets/icons/IconVoteHand';

interface Props {
  type: 'button' | 'submit' | 'reset';
  children: ReactNode;
  status: boolean;
  onClick?: () => void;
}

function CircleButton({ type = 'button', children, status, onClick }: Props) {
  const btnClasses = [
    styles.btn,
    styles[`btn-status-${status ? 'able' : 'disable'}`],
  ].join(' ');

  return (
    <button type={type} className={btnClasses} onClick={onClick}>
      {children}
      <div>
        <IconVoteHand />
      </div>
    </button>
  );
}

export default CircleButton;
