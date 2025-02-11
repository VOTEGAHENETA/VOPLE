import { ChangeEvent } from 'react';
import styles from './index.module.scss';
import TextArea from '../../atoms/TextArea';
import Text from '../../atoms/Text';
import TextCounter from '../../atoms/TextCounter';

export interface TextAreaFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  disabled?: boolean;
}

export function TextAreaField({
  id,
  label = 'TextArea의 Label',
  value = '',
  onChange,
  placeholder,
  maxLength = 100,
  rows = 4,
  disabled = false,
  ...props
}: TextAreaFieldProps) {
  return (
    <div className={styles.textAreaField}>
      {label && (
        <label className={styles.textAreaField__label}>
          <Text size='sm' weight='normal'>
            {label}
          </Text>
        </label>
      )}
      <TextArea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        disabled={disabled}
        {...props}
      />
      {maxLength && (
        <TextCounter currentLength={value.length} maxLength={maxLength} />
      )}
    </div>
  );
}

export default TextAreaField;
