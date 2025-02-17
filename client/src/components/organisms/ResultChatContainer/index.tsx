// import { useState } from 'react';
import styles from './index.module.scss';
// import BaseButton from '@/components/atoms/BaseButton';
import ChatBoard from '../ChatBoard';

//  Mock-Data (samplePoster, MOCK_PLEDGES)
// import IconButton from '@/components/atoms/IconButton';

type TabContainerProps = {
  // userId?: number;
  sessionId: number;
  // voteTeamId?: number;
};

export default function ResultChatContainer({ sessionId }: TabContainerProps) {
  // 슬라이드 상태 추가
  // const [isSlideDown, setIsSlideDown] = useState(false);

  // 슬라이드 토글 함수 추가
  // const toggleSlide = () => {
  //   setIsSlideDown((prev) => !prev);
  // };

  return (
    <div className={styles.container}>
      <ChatBoard sessionId={sessionId} type='session' theme='light' />
    </div>
  );
}
