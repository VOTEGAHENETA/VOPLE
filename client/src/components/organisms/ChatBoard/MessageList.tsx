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

  console.log('******', messages);

  return (
    <div className={styles.messageArea} ref={messageAreaRef}>
      {messages.map((message, index) => (
        <div
          key={`${message.userId}-${index}`}
          className={`${styles.messageRow} ${
            message.userId === 0 ? styles.systemMessage : ''
          }`}
        >
          {/* 시간 */}
          <Text className={styles.time} size='s'>
            [{message.createdTime.slice(0, 5)}]
          </Text>
          {/* 닉네임 : 추후 id -> nickname 으로 수정 */}
          <Text className={styles.username} color={message.color} size='s'>
            {message.userId}
          </Text>
          {/* 내용 */}
          <Text className={styles.content} size='s'>
            {message.text}
          </Text>
        </div>
      ))}
    </div>
  );
}
