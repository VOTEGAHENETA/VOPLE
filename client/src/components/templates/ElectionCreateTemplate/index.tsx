import ElectionInfoSection from '@/components/organisms/ElectionInfoSection';
import { TCreateElection } from '@/types/election';
import React, { useState } from 'react';
import styles from './index.module.scss';
import BaseButton from '@/components/atoms/BaseButton';
import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';
import Text from '@/components/atoms/Text';
import { useNavigate } from 'react-router-dom';
import { useCreateElection } from '@/services/hooks/useCreateElection';
import {
  combineDateAndTime,
  getFormattedDate,
  getFormattedTime,
} from '@/utils/date';

function ElectionCreateTemplate() {
  const navigate = useNavigate();
  const [state, setState] = useState<TCreateElection>({
    hostId: 1,
    entranceQuestion: '',
    entranceAnswer: '',
    startTime: new Date(),
    endTime: new Date(),
    wholeVoter: 1,
    sessionName: '',
  });
  const [dateState, setDateState] = useState({
    startDate: getFormattedDate(),
    startTime: getFormattedTime(),
    endDate: getFormattedDate(
      new Date(new Date().setDate(new Date().getDate() + 1))
    ),
    endTime: getFormattedTime(),
  });

  function handleChangeLabel(e: React.ChangeEvent<HTMLInputElement>) {
    setState((prev) => ({
      ...prev,
      sessionName: e.target.value,
    }));
  }

  function handleChangeWholeVoter(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.valueAsNumber < 1) {
      alert('인원을 다시 입력해주세요.');
      return;
    }
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
    setDateState((prev) => {
      const newState = {
        ...prev,
        [`${type}${field.charAt(0).toUpperCase() + field.slice(1)}`]: value,
      };

      // startDate와 endDate가 같고, endTime이 startTime보다 이전인 경우 조정
      if (
        newState.startDate === newState.endDate &&
        newState.endTime < newState.startTime
      ) {
        const [hours, minutes] = newState.startTime.split(':').map(Number);
        let newMinutes = minutes + 1;
        let newHours = hours;
        if (newMinutes >= 60) {
          newHours = (newHours + 1) % 24;
          newMinutes = 0;
        }
        newState.endTime = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
      }

      return newState;
    });
  }

  const mutation = useCreateElection();
  function handleSubmit() {
    const startTime = combineDateAndTime(
      dateState.startDate,
      dateState.startTime
    );
    const endTime = combineDateAndTime(dateState.endDate, dateState.endTime);
    const updateState = {
      ...state,
      startTime,
      endTime,
    };

    function isEmpty(s: string | number | Date) {
      switch (typeof s) {
        case 'string':
          return s === '';
        case 'number':
          return Number.isNaN(s);
      }
    }

    const a = Object.values(state).some(isEmpty);
    console.log(state);
    if (a) {
      alert('필요한 정보를 모두 입력해주세요.');
      return;
    }

    mutation.mutate(updateState);
    if (mutation.isSuccess) {
      navigate(`/elections/${mutation.data}`);
    }
  }

  function onClose() {
    navigate('/');
  }

  return (
    <div className={styles['create-container']}>
      <div className={styles['create-title']}>
        <Text size='m' weight='bold'>
          선거 만들기
        </Text>
      </div>
      <div className={styles['create-form']}>
        <ElectionInfoSection
          data={state}
          dateData={dateState}
          onChangeLabel={handleChangeLabel}
          onChangeWholeVoter={handleChangeWholeVoter}
          onChangeQuestion={handleChangeQuestion}
          onChangeAnswer={handleChangeAnswer}
          onChangeDate={handleChangeDate}
          isModify={false}
        />
      </div>
      <div className={styles['btn-section']}>
        <div className={styles['btn-cancel']}>
          <BaseButton
            type='reset'
            kind='base'
            status={BASE_BUTTON_STATUS.OUTLINE}
            onClick={onClose}
          >
            취소
          </BaseButton>
        </div>
        <div className={styles['btn-create']}>
          <BaseButton
            type='submit'
            kind='base'
            status={BASE_BUTTON_STATUS.FILL}
            onClick={handleSubmit}
          >
            등록하기
          </BaseButton>
        </div>
      </div>
    </div>
  );
}

export default ElectionCreateTemplate;
