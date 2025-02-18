import styles from './index.module.scss';
import ChatBoard from '../ChatBoard';
import IconButton from '@/components/atoms/IconButton';
import { useState } from 'react';

type TabContainerProps = {
  sessionId: number;
};

export default function ResultChatContainer({ sessionId }: TabContainerProps) {
  // 슬라이드 상태 추가
  const [isSlideDown, setIsSlideDown] = useState(false);

  // 슬라이드 토글 함수 추가
  const toggleSlide = () => {
    setIsSlideDown((prev) => !prev);
  };

  return (
    <div
      className={`${styles.container} ${isSlideDown ? styles.slideDown : ''}`}
    >
      <IconButton
        name='leftLongBlack'
        onClick={toggleSlide}
        className={styles.slideButton}
      />
      <ChatBoard sessionId={sessionId} type='session' theme='light' />
    </div>
  );
}
