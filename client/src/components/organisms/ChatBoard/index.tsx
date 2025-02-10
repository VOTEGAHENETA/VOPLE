import { useEffect } from 'react';
import styles from './index.module.scss';
import { ChatBar } from '@/components/molecules/ChatBar';
import MessageList from './MessageList';
import { ChatSendMessage, ChatReceiveMessage } from '@/types/chat';
import { useWebSocket } from '@/hooks/useWebSocket';
import Heart from './Heart';

console.log('ChatBoard Rendered');

type ChatResponse = {
  httpStatus: number;
  message: string;
  data: ChatReceiveMessage[] | [];
};

type ThemeType = 'dark' | 'light';
type roomType = 'session' | 'team';

type ChatBoardProps = {
  type: roomType;
  theme: ThemeType;
  userId: number;
  sessionId: number;
  voteTeamId?: number;
};

const enterMessage: ChatReceiveMessage = {
  userId: 0, // userId가 0일 경우 시스템 메시지
  nickname: 'System',
  text: '[ 채팅방에 입장하셨습니다 ]',
  color: '#fff',
  createdTime: new Date().toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }),
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

  const { messages, connected, error, sendMessage, setMessages, setError } =
    useWebSocket({
      type: type,
      roomId,
      sessionId,
      userId,
    });

  useEffect(() => {
    // 초기화
    const fetchInitialChats = async () => {
      try {
        const response = await fetch(`/api/room/${type}/${roomId}`);
        const data: ChatResponse = await response.json();

        if (data.httpStatus === 200) {
          setMessages([...data.data.reverse(), enterMessage]);
        } else if (data.httpStatus === 204) {
          setMessages([enterMessage]);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error('초기 채팅 로딩 에러:', error);
        setError('채팅 내역을 불러오는데 실패했습니다.');
      }
    };

    fetchInitialChats();
  }, [type, roomId]);

  const handleSendMessage = (messageData: ChatSendMessage) => {
    sendMessage(messageData.text);
  };

  return (
    <div className={`${styles.chatBoard} ${styles[theme]}`}>
      <div className={styles.chatWrapper}>
        {error && <div className={styles.errorMessage}>{error}</div>}
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
