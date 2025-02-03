import React, { useState } from 'react';
import styles from './index.module.scss';
import Input from '@/components/atoms/Input/index.tsx';
import IconButton from '@/components/atoms/IconButton/index.tsx';

interface ChatMessage {
  type: 'CHAT_MESSAGE'; // 메시지 타입 구분
  payload: {
    message: string; // 실제 입력한 메시지
    roomId: string; // 채팅방 ID
    timestamp: number; // 메시지 전송 시간
  };
}

interface ChatBarProps {
  roomId: string;
  onSendMessage: (messageData: ChatMessage) => void; // 서버로 메시지를 보내는 함수
  placeholder?: string;
  disabled?: boolean;
}

export function ChatBar({
  roomId,
  onSendMessage,
  placeholder = '메세지를 입력해주세요.',
  disabled = false,
}: ChatBarProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = () => {
    if (inputValue.trim()) {
      const messageData: ChatMessage = {
        type: 'CHAT_MESSAGE',
        payload: {
          message: inputValue.trim(),
          roomId: roomId,
          timestamp: Date.now(),
        },
      };

      onSendMessage(messageData);
      setInputValue('');
    }
  };

  return (
    <div className={styles.chatBar}>
      <Input
        id='chat-input'
        value={inputValue}
        onChange={onChange}
        placeholder={placeholder}
        filled={true}
        disabled={disabled}
      />
      <IconButton
        name='send'
        onClick={() => inputValue.trim() && onSubmit()}
        className={styles.sendButton}
      />
    </div>
  );
}
