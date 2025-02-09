import React, { useState } from 'react';
import styles from './index.module.scss';
import ElectionInfoSection from '@/components/organisms/ElectionInfoSection';
import { TCreateElection } from '@/types/election';
import BaseButton from '@/components/atoms/BaseButton';
import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';
import Text from '@/components/atoms/Text';

function ElectionDetailTemplate() {
  const [state, setState] = useState<TCreateElection>({
    hostId: 0,
    entranceQuestion: '',
    entranceAnswer: '',
    startTime: new Date(),
    endTime: new Date(),
    wholeVoter: 0,
    sessionName: '',
  });
  const [dateState, setDateState] = useState({
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
  });
  const [isModify, setIsModify] = useState<boolean>(true);

  function handleChangeLabel(e: React.ChangeEvent<HTMLInputElement>) {
    setState((prev) => ({
      ...prev,
      sessionName: e.target.value,
    }));
  }

  function handleChangeWholeVoter(e: React.ChangeEvent<HTMLInputElement>) {
    setState((prev) => ({
      ...prev,
      wholeVoter: e.target.valueAsNumber,
    }));
  }

  function handleChangeQuestion(e: React.ChangeEvent<HTMLInputElement>) {
    setState((prev) => ({
      ...prev,
      entranceQuestion: e.target.value,
    }));
  }

  function handleChangeAnswer(e: React.ChangeEvent<HTMLInputElement>) {
    setState((prev) => ({
      ...prev,
      entranceAnswer: e.target.value,
    }));
  }

  function handleChangeDate(
    type: 'start' | 'end',
    field: 'date' | 'time',
    value: string
  ) {
    const str = type.concat(field);

    switch (str) {
      case 'startdate':
        setDateState((prev) => ({
          ...prev,
          startDate: value,
        }));
        break;

      case 'starttime':
        setDateState((prev) => ({
          ...prev,
          startTime: value,
        }));
        break;

      case 'enddate':
        setDateState((prev) => ({
          ...prev,
          endDate: value,
        }));
        break;

      case 'endtime': {
        setDateState((prev) => ({
          ...prev,
          endTime: value,
        }));
        break;
      }
    }

    setState((prev) => ({
      ...prev,
    }));
  }

  function handleChangeModify() {
    setIsModify(!isModify);
  }

  return (
    <div className={styles['detail-container']}>
      <div className={styles['info-container']}>
        <div className={styles['info-top']}>
          <div className={styles['label-section']}>
            <Text>선거 정보</Text>
          </div>
          <div className={styles['btn-section']} data-modify={isModify}>
            <div className={styles['btn-status']} data-visible={isModify}>
              <BaseButton
                type='button'
                kind='mini-chip'
                status={BASE_BUTTON_STATUS.OUTLINE}
              >
                삭제하기
              </BaseButton>
              <BaseButton
                type='button'
                kind='mini-chip'
                status={BASE_BUTTON_STATUS.OUTLINE}
                onClick={handleChangeModify}
              >
                수정하기
              </BaseButton>
            </div>
            <div className={styles['btn-status']} data-visible={!isModify}>
              <BaseButton
                type='button'
                kind='mini-chip'
                status={BASE_BUTTON_STATUS.OUTLINE}
              >
                수정취소
              </BaseButton>
              <BaseButton
                type='button'
                kind='mini-chip'
                status={BASE_BUTTON_STATUS.OUTLINE}
                onClick={handleChangeModify}
              >
                수정완료
              </BaseButton>
            </div>
          </div>
        </div>
        <div className={styles['info-bottom']}>
          <ElectionInfoSection
            data={state}
            dateData={dateState}
            onChangeLabel={handleChangeLabel}
            onChangeDate={handleChangeDate}
            onChangeWholeVoter={handleChangeWholeVoter}
            onChangeQuestion={handleChangeQuestion}
            onChangeAnswer={handleChangeAnswer}
            isModify={isModify}
          />
        </div>
      </div>
      <div className={styles['qr-container']}></div>
      <div className={styles['register-container']}></div>
    </div>
  );
}

export default ElectionDetailTemplate;
