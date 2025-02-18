import { useEffect, useRef } from 'react';
import Text from '@/components/atoms/Text';
import styles from './index.module.scss';
import { ChatReceiveMessage } from '@/types/chat';

type MessageListProps = {
  messages: ChatReceiveMessage[];
};

export default function MessageList({ messages }: MessageListProps) {
  const messageAreaRef = useRef<HTMLDivElement>(null);

  // 새 메시지가 추가될 때 스크롤 최하단으로 이동
  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // messages가 undefined인 경우 빈 배열 반환
  const safeMessages = Array.isArray(messages) ? messages : [];

  // 시간 포맷팅 함수
  const formatTime = (timeString?: string) => {
    if (!timeString) return '';
    try {
      return timeString.slice(0, 5);
    } catch (error) {
      console.error('시간 형식 오류:', error);
      return '';
    }
  };
  return (
    <div className={styles.messageArea} ref={messageAreaRef}>
      {safeMessages.map((message, index) => (
        <div
          key={`${message.userId}-${index}`}
          className={`${styles.messageRow} ${
            message.userId === 0 ? styles.systemMessage : ''
          }`}
        >
          {/* 시간 */}
          <Text className={styles.time} size='s'>
            [{formatTime(message.createdTime)}]
            {/* [{message.createdTime.slice(0, 5)}] */}
          </Text>
          {/* 닉네임*/}
          <Text className={styles.username} color={message.color} size='s'>
            {message.nickname || '알 수 없음'}
          </Text>
          {/* 내용 */}
          <Text className={styles.content} size='s'>
            {message.text || ''}
          </Text>
        </div>
      ))}
    </div>
  );
}
