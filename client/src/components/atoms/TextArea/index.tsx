import { ChangeEvent } from 'react';
import styles from './index.module.scss';

export interface TextAreaProps {
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  disabled?: boolean;
}

export function TextArea({
  id,
  value = '',
  onChange,
  placeholder,
  maxLength,
  rows = 4,
  disabled = false,
  ...props
}: TextAreaProps) {
  return (
    <textarea
      id={id}
      value={value}
      className={styles.textarea}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      rows={rows}
      disabled={disabled}
      {...props}
    />
  );
}

export default TextArea;
