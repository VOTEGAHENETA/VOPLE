import React from 'react';
import styles from './index.module.scss';
import InputField from '@/components/molecules/InputField';
import DateTimeField from '@/components/molecules/DateTimeField';
import { INPUT_TYPES } from '@/constants/ui.constants';
import { TCreateElection, TSession } from '@/types/election';

type TDateDate = {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
};

interface Props {
  data: TCreateElection | TSession;
  dateData: TDateDate;
  onChangeLabel: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeWholeVoter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeQuestion: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAnswer: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDate: (
    type: 'start' | 'end',
    field: 'date' | 'time',
    value: string
  ) => void;
  isModify: boolean;
}

function ElectionInfoSection({
  data,
  dateData,
  onChangeLabel,
  onChangeWholeVoter,
  onChangeQuestion,
  onChangeAnswer,
  onChangeDate,
  isModify,
}: Props) {
  return (
    <div className={styles['election-wrapper']}>
      <div className={styles['election-section']}>
        <div className={styles['input-wrapper']}>
          <InputField
            id='label'
            label='선거명'
            onChange={onChangeLabel}
            value={data.sessionName}
            placeholder='예) 제 00회 OO학교 학생 임원 선거'
            disabled={isModify}
          />
        </div>
        <div className={styles['input-wrapper']}>
          <DateTimeField
            label='투표 진행 예정 시간'
            startDate={dateData.startDate}
            startTime={dateData.startTime}
            endDate={dateData.endDate}
            endTime={dateData.endTime}
            onChange={onChangeDate}
            disabled={isModify}
          />
        </div>
        <div className={styles['input-wrapper']}>
          <InputField
            id='whole-voter'
            label='투표 인원'
            type={INPUT_TYPES.NUMBER}
            value={data.wholeVoter}
            onChange={onChangeWholeVoter}
            disabled={isModify}
          />
        </div>
        <div className={styles['input-wrapper']}>
          <InputField
            id='entrance-question'
            label='선거방 입장 질문'
            type={INPUT_TYPES.TEXT}
            value={data.entranceQuestion}
            onChange={onChangeQuestion}
            disabled={isModify}
            placeholder='예) 우리 학교 교화는?'
          />
        </div>
        <div className={styles['input-wrapper']}>
          <InputField
            id='entrance-answer'
            label='선거방 입장 질문 답변'
            type={INPUT_TYPES.TEXT}
            value={data.entranceAnswer}
            onChange={onChangeAnswer}
            disabled={isModify}
            placeholder='예) 진달래'
          />
        </div>
      </div>
    </div>
  );
}

export default ElectionInfoSection;
