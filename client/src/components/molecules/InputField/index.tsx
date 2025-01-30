import React from 'react';
import styles from './index.module.scss';
import { Input, BaseInputProps } from '@/components/atoms/Input/index.tsx';
import searchIcon from '@/assets/images/Icons/search-icon.svg';

/** 컴포넌트 사용 예시 및 props 설명
 * @component InputField
 * @example
 * // 1. 기본 사용법
  <InputField 
    id="username"
    value={username}
    onChange={handleChange}
    disabled={false}
  />
 * 
 * // 2. 라벨이 있는 입력 필드
  <InputField 
    id="email"
    label="이메일"
    value={email}
    onChange={handleChange}
    placeholder="이메일을 입력하세요"
  />
 *
 * // 3. 도움말 텍스트가 있는 입력 필드
  <InputField 
    id="password"
    label="비밀번호"
    value={password}
    onChange={handleChange}
    helperText="8-20자의 영문, 숫자, 특수문자를 조합해주세요"
  />
 *
 * // 4. 검색 입력 필드
  <InputField 
    id="search"
    variant="search"
    value={searchTerm}
    onChange={handleSearch}
    placeholder="검색어를 입력하세요"
  />
 * 
 * // 5. 에러 상태의 입력 필드
  <InputField 
    id="password"
    variant="error"
    value={password}
    onChange={handleChange}
    errorMessage="잘못된 비밀번호입니다"
  />
 *  
 * // 6. 경고 상태의 입력 필드
  <InputField 
    id="password"
    variant="warning"
    value={password}
    onChange={handleChange}
    helperText="비밀번호 형식을 확인해주세요"
  />
 *
 * // 7. 비활성화된 입력 필드
    <InputField 
    id="username"
    value={username}
    onChange={handleChange}
    disabled={true}
    />
 *
 * // props 정리
 * 필수 props
 * @props {string} id - 입력 필드의 고유 식별자
 * @props {string} [value] - 입력 필드의 값
 * @props {function} [onChange] - 값 변경 핸들러
 * 
 * 선택 props
 * @props {'default' | 'search' | 'error' | 'warning'} variant - 입력 필드 스타일
 * @props {string} label - label 텍스트
 * @props {string} [placeholder] - placeholder 텍스트
 * @props {string} [helperText] - 도움말 텍스트
 * @props {string} [errorMessage] - 오류 메시지
 * @props {boolean} [disabled] - 비활성화 여부
 * 
 */

export interface InputFieldProps extends BaseInputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: 'default' | 'search' | 'error' | 'warning';
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
}

export function InputField({
  variant = 'default',
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  ...props
}: InputFieldProps) {
  const showError = variant === 'error' && errorMessage;

  return (
    <div className='inputfield'>
      {/* label */}
      {label && <label className={styles.inputfield__label}>{label}</label>}

      {/* inputfield */}
      <div className={styles.inputfield__wrapper}>
        {/* input */}
        <Input
          variant={variant}
          placeholder={placeholder}
          disabled={disabled}
          {...props}
        />

        {/* serach-btn */}
        {variant === 'search' && (
          <button type='button' className={styles.search__button}>
            <img
              className={styles.search__icon}
              src={searchIcon}
              alt='search icon'
            />
            {/* <Icon name='search' size={18} /> */}
          </button>
        )}
      </div>

      {/* helperText or errorMessage */}
      {(helperText || errorMessage) && (
        <p
          className={`
          ${styles.inputfield__helper}
          ${showError ? styles['inputfield__helper--error'] : ''}
        `}
        >
          {showError ? errorMessage : helperText}
        </p>
      )}
    </div>
  );
}
