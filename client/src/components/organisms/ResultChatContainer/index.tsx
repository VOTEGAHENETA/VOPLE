import { useState } from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
// import BaseButton from '@/components/atoms/BaseButton';
import ChatBoard from '../ChatBoard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

//  Mock-Data (samplePoster, MOCK_PLEDGES)
import IconButton from '@/components/atoms/IconButton';

type TabContainerProps = {
  userId: number;
  sessionId: number;
  voteTeamId?: number;
};

export default function ResultChatContainer({
  userId = 1,
  sessionId,
  voteTeamId = 1,
}: TabContainerProps) {
  // 슬라이드 상태 추가
  const [isSlideDown, setIsSlideDown] = useState(false);

  // 슬라이드 토글 함수 추가
  const toggleSlide = () => {
    setIsSlideDown((prev) => !prev);
  };

  return (
    <div
      className={clsx(styles.container, { [styles.slideDown]: isSlideDown })}
    >
      <IconButton
        name='leftLongBlack'
        className={styles.slideButton}
        onClick={toggleSlide}
      />
      <div className={styles.chatContent}>
        <QueryClientProvider client={queryClient}>
          <ChatBoard
            sessionId={sessionId}
            type='session'
            theme='light'
            userId={userId}
            voteTeamId={voteTeamId}
          />
        </QueryClientProvider>
      </div>
    </div>
  );
}
