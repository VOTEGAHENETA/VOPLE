import React, { useState } from 'react';
import styles from './index.module.scss';
import Input from '@/components/atoms/Input/index.tsx';
import IconButton from '@/components/atoms/IconButton/index.tsx';
import { ChatSendMessage } from '@/types/chat';

type themeType = 'dark' | 'light';

interface ChatBarProps {
  onSendMessage?: (messageData: ChatSendMessage) => void;
  placeholder?: string;
  disabled?: boolean;
  theme?: themeType;
  maxLength?: number;
}
export function ChatBar({
  onSendMessage,
  placeholder = '메세지를 입력해주세요.',
  disabled = false,
  theme = 'dark',
  maxLength = 100, // 기본값 100
}: ChatBarProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // 최대 글자수 체크
    if (newValue.length <= maxLength) {
      setInputValue(newValue);
    } else {
      alert(`최대 ${maxLength}자까지 입력 가능합니다.`);
    }
  };

  const onSubmit = () => {
    if (inputValue.trim()) {
      const messageData: ChatSendMessage = {
        text: inputValue,
      };

      onSendMessage?.(messageData);
      setInputValue('');
    }
  };

  // Enter 키 이벤트 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className={styles.chatBar}>
      <Input
        id='chat-input'
        value={inputValue}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        filled={true}
        disabled={disabled}
        theme={theme}
      />
      <IconButton
        name='send'
        onClick={() => inputValue.trim() && onSubmit()}
        className={styles.sendButton}
      />
    </div>
  );
}
