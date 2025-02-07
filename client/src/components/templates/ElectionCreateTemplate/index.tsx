import ElectionInfoSection from '@/components/organisms/ElectionInfoSection';
import { TCreateElection } from '@/types/election';
import React, { useState } from 'react';
import styles from './index.module.scss';
import BaseButton from '@/components/atoms/BaseButton';
import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';
import Text from '@/components/atoms/Text';
import { useMutation } from '@tanstack/react-query';
import { postElection } from '@/services/election';

function ElectionCreateTemplate() {
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

  const mutation = useMutation({
    mutationFn: postElection,
    onSuccess: (data) => {
      console.log('등록 성공:', data);
      alert('선거 등록 성공!');
    },
    onError: (error) => {
      console.log('등록 실패:', error);
      alert('선거 등록 실패!');
    },
  });

  function handleSubmit() {
    console.log('제출 데이터:', state);
    mutation.mutate(state);
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
