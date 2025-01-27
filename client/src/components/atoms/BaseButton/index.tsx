import { ReactNode } from 'react';
import styles from './index.module.scss';
import { BaseButtonStatus } from '@/constants/ui.constants';

interface Props {
  type: 'button' | 'submit' | 'reset';
  children: ReactNode;
  kind: 'base' | 'chip';
  status: BaseButtonStatus;
  onClick?: () => void;
}

/** 버튼 기본 UI */
const BaseButton = ({
  type = 'button',
  children,
  kind,
  status,
  onClick,
}: Props) => {
  const btnClasses = [
    styles.btn,
    styles[`btn-${kind}`],
    styles[`btn-status-${status}`],
  ].join(' ');

  return (
    <button type={type} className={btnClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default BaseButton;
