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
type ChatType = 'session' | 'team';

type ChatBoardProps = {
  type: ChatType;
  theme: ThemeType;
  userId: number;
  sessionId: number;
  voteTeamId?: number;
};

// 더미 메세지
const DUMMY_MESSAGES: ChatReceiveMessage[] = [
  {
    userId: 1,
    nickname: '김모범',
    text: '안녕하세요! 저는 1번 후보 김모범입니다.',
    color: '#FF5733',
    createdTime: '07:16:50',
  },
  {
    userId: 2,
    nickname: '유권자1',
    text: '후보님 공약에 대해 질문드리고 싶습니다.',
    color: '#33FF57',
    createdTime: '07:16:51',
  },
  {
    userId: 1,
    nickname: '김모범',
    text: '네, 어떤 점이 궁금하신가요?',
    color: '#FF5733',
    createdTime: '07:17:50',
  },
  {
    userId: 2,
    nickname: '유권자1',
    text: '학교 급식 개선 공약에 대해 구체적인 계획이 있으신가요?',
    color: '#33FF57',
    createdTime: '07:17:50',
  },
  {
    userId: 3,
    nickname: '유권자2',
    text: '저도 같은 궁금증이 있었습니다!',
    color: '#5733FF',
    createdTime: '07:18:50',
  },
  {
    userId: 1,
    nickname: '김모범',
    text: '안녕하세요! 저는 1번 후보 김모범입니다.',
    color: '#FF5733',
    createdTime: '07:16:50',
  },
  {
    userId: 2,
    nickname: '유권자1',
    text: '후보님 공약에 대해 질문드리고 싶습니다.',
    color: '#33FF57',
    createdTime: '07:16:51',
  },
  {
    userId: 1,
    nickname: '김모범',
    text: '네, 어떤 점이 궁금하신가요?',
    color: '#FF5733',
    createdTime: '07:17:50',
  },
  {
    userId: 2,
    nickname: '유권자1',
    text: '학교 급식 개선 공약에 대해 구체적인 계획이 있으신가요?',
    color: '#33FF57',
    createdTime: '07:17:50',
  },
  {
    userId: 3,
    nickname: '유권자2',
    text: '저도 같은 궁금증이 있었습니다!',
    color: '#5733FF',
    createdTime: '07:18:50',
  },
];

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
        setMessages(DUMMY_MESSAGES);
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
      {/* 채팅 Heart */}
      <Heart></Heart>
    </div>
  );
}
