import { useEffect } from 'react';
import styles from './index.module.scss';
import { ChatBar } from '@/components/molecules/ChatBar';
import MessageList from './MessageList';
import { ChatSendMessage, ChatReceiveMessage } from '@/types/chat';
import { useWebSocket } from '@/hooks/useWebSocket';

type ChatResponse = {
  httpStatus: number;
  message: string;
  data: ChatReceiveMessage[] | [];
};

type themeType = 'dark' | 'light';
type ChatBoardProps = {
  theme: themeType;
  type: string;
  roomId: string;
  sessionId: string;
  userId: number;
};

export default function ChatBoard({
  theme,
  type,
  roomId,
  sessionId,
  userId,
}: ChatBoardProps) {
  const { messages, connected, error, sendMessage, setMessages, setError } =
    useWebSocket({
      type,
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
          setMessages(data.data.reverse());
        } else if (data.httpStatus === 204) {
          setMessages([]);
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
      <div className={styles.systemMessage}>[채팅방에 입장하셨습니다.]</div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <MessageList messages={messages} />

      <ChatBar
        onSendMessage={handleSendMessage}
        roomId={sessionId}
        disabled={!connected || !!error}
        theme={theme}
      />
    </div>
  );
}
