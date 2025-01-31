import styles from './index.module.scss';
import IconButton from '@/components/atoms/IconButton';
import { ICON_NAME } from '@/constants/ui.constants';
import CircleButton from '@/components/atoms/CircleButton';
import { ReactNode } from 'react';

interface Props {
  /** 투표 시간과 역할에 따라 표시되는 내용이 달라진다. */
  children: ReactNode;
}

/** 메인 화면에서 보여질 Footer */
function Footer({ children }: Props) {
  return (
    <nav id={styles.footer}>
      <IconButton name={ICON_NAME.HOME} />
      <IconButton name={ICON_NAME.MYPAGE} />
      <div className={styles['circle-section']}>
        <CircleButton status={false} type='button'>
          {children}
        </CircleButton>
      </div>
    </nav>
  );
}

export default Footer;
