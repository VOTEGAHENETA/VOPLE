import { ReactNode } from 'react';
import styles from './index.module.scss';
import { BaseButtonStatus } from '@/constants/ui.constants';

interface Props {
  /** 버튼 타입 지정 (button, submit, reset) */
  type: 'button' | 'submit' | 'reset';
  /** 버튼의 내용 입력 */
  children: ReactNode;
  /** 버튼의 종류 (base: radius-10px, chip: radius - 50%) */
  kind: 'base' | 'chip';
  /** 버튼의 활성 상태 (fill, outline, disable) */
  status: BaseButtonStatus;
  /** 버튼에 이벤트 지정 */
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
