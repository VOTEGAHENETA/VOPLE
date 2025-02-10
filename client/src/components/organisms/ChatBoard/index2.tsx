import styles from './index.module.scss';
import { ChatBar } from '@/components/molecules/ChatBar';
import MessageList from './MessageList';
import { ChatSendMessage } from '@/types/chat';
import { useChatMessages } from '@/queries/queries/useChatMessages';
import Heart from './Heart';

console.log('ChatBoard Rendered');

type ThemeType = 'dark' | 'light';
type ChatType = 'session' | 'team';

type ChatBoardProps = {
  type: ChatType;
  theme: ThemeType;
  userId: number;
  sessionId: number;
  voteTeamId?: number;
};

export default function ChatBoard({
  type,
  theme,
  userId,
  sessionId,
  voteTeamId,
}: ChatBoardProps) {
  // 탭 변환 시 렌더링 확인용
  console.log('ChatBoard Rendered');

  // as 사용해야하는 케이스인가 재차 고려 필요
  const roomId = type === 'session' ? sessionId : (voteTeamId as number);

  const { messages, isLoading, isError, error, connected, sendMessage } =
    useChatMessages(type, roomId, sessionId, userId); // react-queries

  const handleSendMessage = (messageData: ChatSendMessage) => {
    sendMessage(messageData.text);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    if (error instanceof Error) {
      return <div className={styles.errorMessage}>{error.message}</div>;
    } else {
      return <div className={styles.errorMessage}>{error}</div>;
    }
  }

  return (
    <div className={`${styles.chatBoard} ${styles[theme]}`}>
      <div className={styles.chatWrapper}>
        <MessageList messages={messages} />
      </div>

      <ChatBar
        onSendMessage={handleSendMessage}
        roomId={roomId}
        disabled={!connected || !!error}
        theme={theme}
      />
      <div></div>
      {/* 채팅 Heart */}
      <div style={{ display: type === 'team' ? 'block' : 'none' }}>
        <Heart></Heart>
      </div>
    </div>
  );
}
