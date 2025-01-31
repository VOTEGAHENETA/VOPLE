import React from 'react';
import styles from './index.module.scss';
import { Input, BaseInputProps } from '@/components/atoms/Input/index.tsx';
import Icon from '@/components/atoms/Icon/index.tsx';
import { ICON_NAME } from '@/constants/ui.constants.ts';
import Text from '@/components/atoms/Text/index.tsx';

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
    type={INPUT_TYPES.EMAIL}
    value={email}
    onChange={handleChange}
    placeholder="이메일을 입력하세요"
  />
 *
 * // 3. 도움말 텍스트가 있는 입력 필드
  <InputField 
    id="password"
    type={INPUT_TYPES.PASSWORD}
    label="비밀번호"
    value={password}
    onChange={handleChange}
    helperText="8-20자의 영문, 숫자, 특수문자를 조합해주세요"
  />
 *
 * // 4. 검색 입력 필드
  <InputField 
    id="search"
    type={INPUT_TYPES.SEARCH}
    variant={INPUT_VARIANTS.SEARCH}
    value={searchTerm}
    onChange={handleSearch}
    placeholder="검색어를 입력하세요"
  />
 * 
 * // 5. 에러 상태의 입력 필드
  <InputField 
    id="password"
    type={INPUT_TYPES.PASSWORD}
    variant={INPUT_VARIANTS.ERROR}
    value={password}
    onChange={handleChange}
    errorMessage="잘못된 비밀번호입니다"
  />
 *  
 * // 6. 경고 상태의 입력 필드
  <InputField 
    id="password"
    type={INPUT_TYPES.PASSWORD}
    variant={INPUT_VARIANTS.WARNING}
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
 * // 8. 숫자 입력 필드 (validation 포함)
  <InputField 
    id="age"
    type={INPUT_TYPES.NUMBER}
    value={age}
    onChange={handleChange}
    validationMessage={{
      number: "숫자만 입력해주세요"
    }}
  />
 *
 * // 9. 전화번호 입력 필드 (validation 포함)
  <InputField 
    id="phone"
    type={INPUT_TYPES.TEL}
    value={phone}
    onChange={handleChange}
    validationMessage={{
      tel: "올바른 전화번호 형식이 아닙니다"
    }}
  />
 * 
 * // props 정리
 * 필수 props
 * @props {string} id - 입력 필드의 고유 식별자
 * @props {string} value - 입력 필드의 값
 * @props {function} onChange - 값 변경 핸들러
 * 
 * 선택 props
 * @props {InputType} type - 입력 데이터 타입 (INPUT_TYPES.TEXT | INPUT_TYPES.NUMBER | INPUT_TYPES.TEL | INPUT_TYPES.EMAIL | INPUT_TYPES.PASSWORD | INPUT_TYPES.SEARCH)
 * @props {InputVariant} variant - 입력 필드 스타일 (INPUT_VARIANTS.DEFAULT | INPUT_VARIANTS.SEARCH | INPUT_VARIANTS.ERROR | INPUT_VARIANTS.WARNING)
 * @props {string} label - label 텍스트
 * @props {string} [placeholder] - placeholder 텍스트
 * @props {string} [helperText] - 도움말 텍스트
 * @props {string} [errorMessage] - 오류 메시지
 * @props {boolean} [disabled] - 비활성화 여부
 * @props {object} [validationMessage] - 입력값 검증 메시지 객체
 * @props {string} [validationMessage.number] - 숫자 타입 입력값 검증 메시지
 * @props {string} [validationMessage.tel] - 전화번호 타입 입력값 검증 메시지
 */

// 상수 정의
const INPUT_TYPES = {
  TEXT: 'text',
  NUMBER: 'number',
  TEL: 'tel',
  EMAIL: 'email',
  PASSWORD: 'password',
  SEARCH: 'search',
} as const;

const INPUT_VARIANTS = {
  DEFAULT: 'default',
  SEARCH: 'search',
  ERROR: 'error',
  WARNING: 'warning',
} as const;

export { INPUT_TYPES, INPUT_VARIANTS };

// 타입 추출
type InputType = (typeof INPUT_TYPES)[keyof typeof INPUT_TYPES];
type InputVariant = (typeof INPUT_VARIANTS)[keyof typeof INPUT_VARIANTS];

export interface InputFieldProps extends BaseInputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: InputType;
  variant?: InputVariant;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  validationMessage?: {
    [K in InputType]?: string;
  };
}

export default function InputField({
  onChange,
  type = INPUT_TYPES.TEXT,
  variant = INPUT_VARIANTS.DEFAULT,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  validationMessage = {
    [INPUT_TYPES.NUMBER]: '숫자만 입력 가능합니다.',
    [INPUT_TYPES.TEL]: '유효한 전화번호 형식이 아닙니다.',
  },
  ...props
}: InputFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // 입력값이 비어있는 경우는 항상 허용
    if (value === '') {
      onChange(e);
      return;
    }

    // 숫자 타입 검증
    if (type === 'number') {
      const numberRegex = /^[0-9]*\.?[0-9]*$/;
      if (numberRegex.test(value)) {
        onChange(e);
      } else {
        alert(validationMessage.number || '숫자만 입력 가능합니다.');
      }
      return;
    }

    // 전화번호 타입 검증
    if (type === 'tel') {
      const telRegex = /^[0-9-]*$/;
      if (telRegex.test(value)) {
        onChange(e);
      } else {
        alert(validationMessage.tel || '유효한 전화번호 형식이 아닙니다.');
      }
      return;
    }

    // 기본적으로는 모든 입력 허용
    onChange(e);
  };

  // const showError = variant === 'error' && errorMessage;
  const showError = variant === 'error' && Boolean(errorMessage);
  const showHelper = Boolean(helperText) && !showError;

  const handleSearch = () => {
    // 검색 로직 구현
  };

  return (
    <div className='inputfield'>
      {/* label */}
      {label && (
        <label className={styles.inputfield__label}>
          <Text size='sm' weight='normal'>
            {label}
          </Text>
        </label>
      )}

      {/* inputfield */}
      <div className={styles.inputfield__wrapper}>
        {/* input */}
        <Input
          variant={variant}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          {...props}
        />

        {/* serach-btn */}
        {variant === 'search' && (
          <button type='button' className={styles.search__button}>
            <Icon
              className={styles.search__icon}
              name={ICON_NAME.ORANGEBIGGER}
              onClick={handleSearch}
            />
          </button>
        )}
      </div>

      {/* helperText or errorMessage */}
      {(showHelper || showError) && (
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
