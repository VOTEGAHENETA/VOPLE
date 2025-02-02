// DateTimeField.tsx
import React, { useRef } from 'react';
import styles from './index.module.scss';
import IconButton from '@/components/atoms/IconButton';

interface DateTimeFieldProps {
  label: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  onChange: (
    type: 'start' | 'end',
    field: 'date' | 'time',
    value: string
  ) => void;
  disabled?: boolean;
}

const getFormattedDate = () => {
  return new Date().toISOString().split('T')[0];
};

const getFormattedTime = () => {
  return new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
};

export function DateTimeField({
  label,
  startDate = getFormattedDate(),
  startTime = getFormattedTime(),
  endDate = getFormattedDate(),
  endTime = getFormattedTime(),
  onChange,
  disabled = false,
}: DateTimeFieldProps) {
  const startDateRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);

  const handleInputClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    inputRef.current?.showPicker();
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputGroup}>
        <div
          className={`${styles.dateTimeWrapper} ${disabled ? styles['dateTimeWrapper--disabled'] : ''}`}
        >
          <input
            ref={startDateRef}
            type='date'
            value={startDate}
            onChange={(e) => onChange('start', 'date', e.target.value)}
            disabled={disabled}
            onClick={() => handleInputClick(startDateRef)}
            className={styles.dateInput}
          />
          <input
            ref={startTimeRef}
            type='time'
            value={startTime}
            onChange={(e) => onChange('start', 'time', e.target.value)}
            disabled={disabled}
            onClick={() => handleInputClick(startTimeRef)}
            className={styles.timeInput}
          />
        </div>

        <IconButton name='left' className={styles.arrow} />

        <div
          className={`${styles.dateTimeWrapper} ${disabled ? styles['dateTimeWrapper--disabled'] : ''}`}
        >
          <input
            ref={endDateRef}
            type='date'
            value={endDate}
            onChange={(e) => onChange('end', 'date', e.target.value)}
            disabled={disabled}
            onClick={() => handleInputClick(endDateRef)}
            className={styles.dateInput}
          />
          <input
            ref={endTimeRef}
            type='time'
            value={endTime}
            onChange={(e) => onChange('end', 'time', e.target.value)}
            disabled={disabled}
            onClick={() => handleInputClick(endTimeRef)}
            className={styles.timeInput}
          />
        </div>
      </div>
    </div>
  );
}

export default DateTimeField;
