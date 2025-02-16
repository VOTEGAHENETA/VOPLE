import ElectionInfoSection from '@/components/organisms/ElectionInfoSection';
import { TCreateElection } from '@/types/election';
import React, { useState } from 'react';
import styles from './index.module.scss';
import BaseButton from '@/components/atoms/BaseButton';
import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';
import Text from '@/components/atoms/Text';
import { useNavigate } from 'react-router-dom';
import { useCreateElection } from '@/services/hooks/useCreateElection';
import { combineDateAndTime } from '@/utils/date';

function ElectionCreateTemplate() {
  const navigate = useNavigate();
  const [state, setState] = useState<TCreateElection>({
    hostId: 1,
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
