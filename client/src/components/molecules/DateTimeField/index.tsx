import React, { useRef } from 'react';
import styles from './index.module.scss';
import IconButton from '@/components/atoms/IconButton';
import { getFormattedDate, getFormattedTime } from '@/utils/date';

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

  function getMaxStartTime() {
    if (startDate === endDate) return endTime;
    return '';
  }

  function getMinEndTime() {
    if (startDate === endDate) {
      const [hours, minutes] = startTime.split(':').map(Number);
      let newMinutes = minutes + 1;
      let newHours = hours;
      if (newMinutes >= 60) {
        newHours = (newHours + 1) % 24;
        newMinutes = 0;
      }
      return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    }
    return '';
  }

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
            max={endDate}
            onChange={(e) => onChange('start', 'date', e.target.value)}
            disabled={disabled}
            onClick={() => handleInputClick(startDateRef)}
            className={styles.dateInput}
            required
          />
          <input
            ref={startTimeRef}
            type='time'
            value={startTime}
            max={getMaxStartTime()}
            onChange={(e) => onChange('start', 'time', e.target.value)}
            disabled={disabled}
            onClick={() => handleInputClick(startTimeRef)}
            className={styles.timeInput}
            required
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
            min={startDate}
            onChange={(e) => onChange('end', 'date', e.target.value)}
            disabled={disabled}
            onClick={() => handleInputClick(endDateRef)}
            className={styles.dateInput}
            required
          />
          <input
            ref={endTimeRef}
            type='time'
            value={endTime}
            min={getMinEndTime()}
            onChange={(e) => onChange('end', 'time', e.target.value)}
            disabled={disabled}
            onClick={() => handleInputClick(endTimeRef)}
            className={styles.timeInput}
            required
          />
        </div>
      </div>
    </div>
  );
}

export default DateTimeField;
