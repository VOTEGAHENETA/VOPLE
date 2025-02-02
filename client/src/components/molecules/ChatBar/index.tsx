import React from 'react';
import styles from './index.module.scss';
import Input from '@/components/atoms/Input/index.tsx';
import IconButton from '@/components/atoms/IconButton/index.tsx';

interface ChatBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function ChatBar({
  value,
  onChange,
  onSubmit,
  onKeyPress,
  placeholder = '메세지를 입력해주세요.',
  disabled = false,
}: ChatBarProps) {
  return (
    <div className={styles.chatBar}>
      <Input
        id='chat-input'
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        filled={true}
        disabled={disabled}
      />
      <IconButton
        name='send'
        onClick={() => value.trim() && onSubmit()}
        className={styles.sendButton}
      />
    </div>
  );
}
