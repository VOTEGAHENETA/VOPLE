import { useEffect, useState, useRef } from 'react';
import styles from './index.module.scss';
import { ChatBar } from '@/components/molecules/ChatBar';
import Text from '@/components/atoms/Text';

interface ChatMessage {
  userId: number;
  nickname: string;
  text: string;
  color: string;
  createdTime: string;
}

interface ChatResponse {
  httpStatus: number;
  message: string;
  data: ChatMessage[] | null;
}

interface ChatBoardProps {
  type: string; // 채팅방 종류 : 후보자 유세용 & 실시간 투표 결과용
  roomId: string; // 채팅방 고유 식별자
  sessionId: string; // 세션 ID
  wsUrl: string; // WebSocket 서버 URL
}

const DUMMY_MESSAGES: ChatMessage[] = [
  {
    userId: 1,
    nickname: '날뛰는 날다람쥐',
    text: '1',
    color: '#c9eb37',
    createdTime: '13:00:09',
  },
  {
    userId: 2,
    nickname: '말하는 말',
    text: '○',
    color: '#ed2fae',
    createdTime: '13:01:55',
  },
  {
    userId: 3,
    nickname: '얼록진 얼룩말',
    text: '와 진짜 박빙이네 ㅋㅋ',
    color: '#45B7D1',
    createdTime: '13:01:55',
  },
  {
    userId: 4,
    nickname: '그래도 화면',
    text: '김싸피가 누구임?',
    color: '#FF1493',
    createdTime: '14:23:00',
  },
  {
    userId: 5,
    nickname: '첫한 첫',
    text: '재 공부 잘함?',
    color: '#FFD700',
    createdTime: '15:00:00',
  },
];

export default function ChatBoard({
  type,
  roomId,
  sessionId,
  wsUrl,
}: ChatBoardProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(DUMMY_MESSAGES);
  const [connected, setConnected] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const messageAreaRef = useRef<HTMLDivElement>(null);

  // 초기 채팅 내역 로딩
  // useEffect(() => {
  //   const fetchInitialChats = async () => {
  //     try {
  //       const response = await fetch(`/api/room/${type}/${roomId}`);
  //       const data: ChatResponse = await response.json();

  //       if (data.httpStatus === 200) {
  //         setMessages(data.data || []);
  //         setError(null);
  //       } else if (data.httpStatus === 204) {
  //         setMessages([]);
  //         setError(null);
  //       } else {
  //         setError(data.message);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       setError('채팅 내역을 불러오는데 실패했습니다.');
  //     }
  //   };

  //   fetchInitialChats();
  // }, [sessionId]);

  // WebSocket 연결 설정
  // useEffect(() => {
  //   wsRef.current = new WebSocket(`${wsUrl}?sessionId=${sessionId}`);

  //   wsRef.current.onopen = () => {
  //     setConnected(true);
  //     setError(null);
  //   };

  //   wsRef.current.onmessage = (event) => {
  //     const data = JSON.parse(event.data);

  //     if (data.httpStatus === 200) {
  //       const newMessage = data.data;
  //       setMessages((prev) => [...prev, newMessage]);
  //     }
  //   };

  //   wsRef.current.onclose = () => {
  //     setConnected(false);
  //   };

  //   wsRef.current.onerror = () => {
  //     setError('WebSocket 연결에 실패했습니다.');
  //   };

  //   // 클린업 함수
  //   return () => {
  //     wsRef.current?.close();
  //   };
  // }, [sessionId, wsUrl]);

  // 새 메시지가 추가될 때 스크롤 최하단으로 이동
  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // 메시지 전송 핸들러
  // const onSendMessage = (text: string) => {
  //   if (text.trim() && wsRef.current?.readyState === WebSocket.OPEN) {
  //     wsRef.current.send(
  //       JSON.stringify({
  //         sessionId: sessionId,
  //         text: text,
  //       })
  //     );
  //   }
  // };

  return (
    <div className={styles.chatBoard}>
      {/* 입장 메시지 */}
      <div className={styles.systemMessage}>[채팅방에 입장하셨습니다.]</div>

      {/* 에러 메시지 */}
      {error && <div className={styles.errorMessage}>{error}</div>}

      {/* 메시지 영역 */}
      <div className={styles.messageArea} ref={messageAreaRef}>
        {messages.map((message, index) => (
          <div key={index} className={styles.messageRow}>
            <Text className={styles.time} size='s'>
              [{message.createdTime.slice(0, 5)}]
            </Text>
            <Text className={styles.username} color={message.color} size='s'>
              {message.nickname}
            </Text>
            <Text className={styles.content} size='s'>
              {message.text}
            </Text>
          </div>
        ))}
      </div>

      {/* 채팅 입력 */}
      <ChatBar
        // onSendMessage={onSendMessage}
        roomId={sessionId}
        disabled={!connected || !!error}
      />
    </div>
  );
}
