import React from 'react';
import styles from './index.module.scss';
import Input from '@/components/atoms/Input/index.tsx';
import Text from '@/components/atoms/Text/index.tsx';
import IconButton from '@/components/atoms/IconButton/index.tsx';
import {
  ICON_NAME,
  INPUT_TYPES,
  INPUT_VARIANTS,
  InputType,
  InputVariant,
} from '@/constants/ui.constants.ts';

export interface InputFieldProps {
  id: string; // input의 필수값
  value: string; // input의 필수값
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // input의 필수값
  type?: InputType;
  variant?: InputVariant;
  label?: string;
  placeholder?: string;
  helperText?: string; // 도움말 텍스트
  errorMessage?: string; // 오류 메시지
  disabled?: boolean; // 비활성화 여부
  validationMessage?: {
    // 입력값 검증 메시지 객체
    [K in InputType]?: string;
  };
}

export default function InputField({
  value,
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
    if (type === INPUT_TYPES.NUMBER) {
      const numberRegex = /^[0-9]*\.?[0-9]*$/;
      if (numberRegex.test(value)) {
        onChange(e);
      } else {
        alert(
          validationMessage[INPUT_TYPES.NUMBER] || '숫자만 입력 가능합니다.'
        );
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
          <Text size='xs' weight='normal'>
            {label}
          </Text>
        </label>
      )}

      {/* inputfield */}
      <div className={styles.inputfield__wrapper}>
        {/* input */}
        <Input
          value={value}
          variant={variant}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          {...props}
        />

        {/* serach-btn */}
        {variant === 'search' && (
          <button type='button' className={styles.search__button}>
            <IconButton
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
