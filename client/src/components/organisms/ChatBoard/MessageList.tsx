import { useEffect, useRef } from 'react';
// import Text from '@/components/atoms/Text';
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
          {/* 시스템 메시지가 아닐 때만 시간과 닉네임 표시 */}
          {message.nickname.toLowerCase() !== 'system' && (
            <>
              <span className={styles.time}>
                [{formatTime(message.createdTime)}]
              </span>
              <span
                className={styles.username}
                style={{ color: message.color }}
              >
                {message.nickname || '알 수 없음'}
              </span>
            </>
          )}
          {/* 내용 */}
          <span className={styles.content}>{message.text || ''}</span>
        </div>
      ))}
    </div>
  );
}
