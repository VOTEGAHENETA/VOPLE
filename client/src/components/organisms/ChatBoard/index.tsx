import { useEffect } from 'react';
import styles from './index.module.scss';
import { ChatBar } from '@/components/molecules/ChatBar';
import MessageList from './MessageList';
import { ChatSendMessage } from '@/types/chat';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useChatMessages } from '@/services/hooks/useChatMessages';
import ChatHeart from '@/components/atoms/ChatHeart';

type ThemeType = 'dark' | 'light';
type roomType = 'session' | 'team';

type ChatBoardProps = {
  type: roomType;
  theme: ThemeType;
  sessionId: number;
  voteTeamId?: number;
};

// const enterMessage: ChatReceiveMessage = {
//   userId: 0, // userId가 0일 경우 시스템 메시지
//   nickname: 'System',
//   text: '[ 채팅방에 입장하셨습니다 ]',
//   color: '#fff',
//   createdTime: new Date().toLocaleTimeString('ko-KR', {
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//     hour12: false,
//   }),
// };

export default function ChatBoard({
  type,
  theme,
  sessionId,
  voteTeamId,
}: ChatBoardProps) {
  // 탭 변환 시 렌더링 확인용
  // console.log('ChatBoard Rendered');

  // roomId를 계산하기 전에 타입 체크
  if (type === 'team' && typeof voteTeamId === 'undefined') {
    return <div className={styles.error}>팀 채팅에는 팀 ID가 필요합니다.</div>;
  }

  // 타입 체크 후에는 안전하게 할당 가능
  const roomId = type === 'session' ? sessionId : voteTeamId!;

  const { data: initialChats, isError: chatError } = useChatMessages(
    type,
    roomId
  );

  const { messages, connected, error, sendMessage, setMessages, setError } =
    useWebSocket({
      type: type,
      roomId,
      sessionId,
    });

  useEffect(() => {
    if (chatError) {
      setError('채팅 메시지를 불러오는데 실패했습니다.');
      return;
    }

    if (initialChats) {
      if (initialChats.httpStatus === 200) {
        setMessages([...initialChats.data.reverse()]);
      } else if (initialChats.httpStatus === 204) {
        setMessages([]);
      } else {
        setError(initialChats.message);
      }
    }
  }, [initialChats]);

  const handleSendMessage = (messageData: ChatSendMessage) => {
    sendMessage(messageData.text);
  };

  return (
    <div className={`${styles.chatBoard} ${styles[theme]}`}>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <MessageList messages={messages} />

      <ChatBar
        onSendMessage={handleSendMessage}
        roomId={roomId}
        disabled={!connected || !!error}
        theme={theme}
      />
      {/* 채팅 Heart */}
      <div
        className={styles.heartBox}
        style={{ display: type === 'team' ? 'block' : 'none' }}
      >
        <ChatHeart></ChatHeart>
      </div>
    </div>
  );
}
