import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import ElectionInfoSection from '@/components/organisms/ElectionInfoSection';
import { TSession, TVoteEdit } from '@/types/election';
import BaseButton from '@/components/atoms/BaseButton';
import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';
import Text from '@/components/atoms/Text';
import QRContainer from './QRContainer';
import VoteReginster from '@/components/organisms/VoteReginster';
import { useParams } from 'react-router-dom';
import { useElectionDetailGet } from '@/services/hooks/useElectionDetail';
import QRModal from './QRModal';
import CandidateRegisterTemplate from '../CandidateRegisterTemplate';
import { useCandidateStore } from '@/stores/candidateStore';
import {
  useElectionDelete,
  useElectionModify,
} from '@/services/hooks/useElectionSession';
import { combineDateAndTimePut } from '@/utils/date';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';

function ElectionDetailTemplate() {
  const { election_id } = useParams() as { election_id: string };
  const { data, isLoading } = useElectionDetailGet(Number(election_id));
  const { openCandidateModal } = useCandidateStore();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [state, setState] = useState<TSession>({
    id: Number(election_id),
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
  const [voteState, setVoteState] = useState<TVoteEdit[]>([]);
  const [isModify, setIsModify] = useState<boolean>(true);
  const originalState = useRef<{
    session: TSession;
    date: typeof dateState;
  } | null>(null);
  const putMutation = useElectionModify();
  const deleteMutation = useElectionDelete();

  useEffect(() => {
    if (data?.sessionDto) {
      setState((prevState) => ({
        ...prevState,
        ...data.sessionDto,
        startTime: new Date(data.sessionDto.startTime),
        endTime: new Date(data.sessionDto.endTime),
      }));
      setVoteState(data.voteEditInfos);

      const startTime = new Date(data.sessionDto.startTime);
      const endTime = new Date(data.sessionDto.endTime);
      setDateState(() => ({
        startDate: startTime
          .toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'Asia/Seoul',
          })
          .replace(/\. /g, '-')
          .replace('.', ''), // YYYY-MM-DD 형식으로 변환
        startTime: startTime.toLocaleTimeString('ko-KR', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Seoul',
        }),
        endDate: endTime
          .toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'Asia/Seoul',
          })
          .replace(/\. /g, '-')
          .replace('.', ''), // YYYY-MM-DD 형식으로 변환
        endTime: endTime.toLocaleTimeString('ko-KR', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Seoul',
        }),
      }));
    }
  }, [data]);

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

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
    originalState.current = {
      session: {
        ...state,
        startTime: new Date(state.startTime),
        endTime: new Date(state.endTime),
      },
      date: { ...dateState },
    };
    setIsModify(false);
  }

  function handleCancelModify() {
    if (originalState.current) {
      setState(originalState.current.session);
      setDateState(originalState.current.date);
    }
    setIsModify(true);
  }

  function handleDeleteElection() {
    deleteMutation.mutate(Number(election_id));
  }

  function handleModifyElection() {
    const startTime = combineDateAndTimePut(
      dateState.startDate,
      dateState.startTime
    );
    const endTime = combineDateAndTimePut(dateState.endDate, dateState.endTime);
    const updateState = {
      ...state,
      startTime,
      endTime,
    };

    putMutation.mutate({ sessionId: Number(election_id), data: updateState });
    setIsModify(true);
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
                onClick={handleDeleteElection}
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
                onClick={handleCancelModify}
              >
                수정취소
              </BaseButton>
              <BaseButton
                type='button'
                kind='mini-chip'
                status={BASE_BUTTON_STATUS.OUTLINE}
                onClick={handleModifyElection}
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
      <QRContainer setIsOpen={setIsOpen} />
      <VoteReginster
        sessionId={state.id}
        sessionName={state.sessionName}
        votes={voteState}
      />
      <QRModal isOpen={isOpen} setIsOpen={setIsOpen} param={election_id} />
      {openCandidateModal && (
        <CandidateRegisterTemplate
          sessionId={Number(election_id)}
          voteId={openCandidateModal.voteId}
          voteName={openCandidateModal.voteName}
        />
      )}
    </div>
  );
}

export default ElectionDetailTemplate;
