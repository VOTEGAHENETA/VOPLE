// Input.tsx
import styles from './index.module.scss';
import React from 'react';

// textarea, 날짜 입력 형식 등을 위해 일단 남겨둠
export interface BaseInputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface InputProps extends BaseInputProps {
  variant?: 'default' | 'search' | 'error' | 'warning';
  placeholder?: string;
  disabled?: boolean; // disabled 속성 추가
}

/* 설명 
# variant 기능구분 
- default : 기본 입력
- search : 검색 입력
- error : 에러 상태 입력 ex) 땡 틀렸습니다. 잘못된 비밀번호 입니다. 
- warning : 경고 상태 입력 ex) 비밀번호 양식 오류(유효성검사)
- disabled : 비활성화 상태 입력
*/

export function Input({
  variant = 'default',
  disabled = false,
  ...props
}: InputProps) {
  const inputClassName = `
    ${styles.input}
    ${variant !== 'default' ? styles[`input--${variant}`] : ''}
    ${disabled ? styles['input--disabled'] : ''}
  `.trim();

  return <input className={inputClassName} disabled={disabled} {...props} />;
}
