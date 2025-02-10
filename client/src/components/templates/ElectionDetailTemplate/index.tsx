import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import ElectionInfoSection from '@/components/organisms/ElectionInfoSection';
import { TSession, TVoteEdit } from '@/types/election';
import BaseButton from '@/components/atoms/BaseButton';
import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';
import Text from '@/components/atoms/Text';
import QRContainer from './QRContainer';
import VoteReginster from '@/components/organisms/VoteReginster';
import { useParams } from 'react-router-dom';
import { useElectionDetail } from '@/services/hooks/useElectionDetail';

function ElectionDetailTemplate() {
  const { election_id } = useParams() as { election_id: string };
  const { data, isLoading, isError } = useElectionDetail(Number(election_id));

  const [state, setState] = useState<TSession>({
    id: 0,
    hostId: 0,
    sessionName: '',
    wholeVoter: 0,
    startTime: new Date(),
    endTime: new Date(),
    entranceQuestion: '',
    entranceAnswer: '',
  });
  const [dateState, setDateState] = useState({
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
  });
  const [voteState, setVoteState] = useState<TVoteEdit[]>([
    {
      voteId: 0,
      sessionName: '',
      voteName: '',
    },
  ]);
  const [isModify, setIsModify] = useState<boolean>(true);

  useEffect(() => {
    if (isLoading) {
      console.log('데이터 로딩 중...');
    }

    if (isError) {
      console.log('데이터 로드 에러');
    }

    if (data?.data) {
      setState(data.data.sessionDto);
      setVoteState(data.data.voteEditInfos);

      setDateState({
        startDate: new Date(state.startTime).toISOString().split('T')[0],
        startTime: new Date(state.startTime).toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
        }),
        endDate: new Date(state.endTime).toISOString().split('T')[0],
        endTime: new Date(state.endTime).toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
        }),
      });
    }
  }, [data]);

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

  if (isLoading) {
    return <div>로딩중</div>;
  }

  return (
    <div className={styles['detail-container']}>
      <div className={styles['info-container']}>
        <div className={styles['info-top']}>
          <div className={styles['label-section']}>
            <Text size='sm' weight='bold'>
              선거 정보
            </Text>
          </div>
          <div className={styles['btn-section']} data-modify={isModify}>
            <div className={styles['btn-status']} data-visible={isModify}>
              <BaseButton
                type='button'
                kind='mini-chip'
                status={BASE_BUTTON_STATUS.OUTLINE}
              >
                <Text size='xs'>삭제하기</Text>
              </BaseButton>
              <BaseButton
                type='button'
                kind='mini-chip'
                status={BASE_BUTTON_STATUS.OUTLINE}
                onClick={handleChangeModify}
              >
                <Text size='xs'>수정하기</Text>
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
          <div className={styles['info-wrapper']}>
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
      </div>
      <QRContainer param={election_id} />
      <VoteReginster
        sessionId={state.id}
        sessionName={state.sessionName}
        votes={voteState}
      />
    </div>
  );
}

export default ElectionDetailTemplate;
