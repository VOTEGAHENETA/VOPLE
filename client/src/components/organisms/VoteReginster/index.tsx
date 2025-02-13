import Text from '@/components/atoms/Text';
import styles from './index.module.scss';
import InputField from '@/components/molecules/InputField';
import BaseButton from '@/components/atoms/BaseButton';
import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';
import React, { useEffect, useState } from 'react';
import { VoteListItem } from '@/components/molecules/VoteListItem';
import { useCreateVote } from '@/services/hooks/useCreateVote';
import { TVoteEdit } from '@/types/election';
import { useElectionDetailDelete } from '@/services/hooks/useElectionDetail';

interface Props {
  sessionId: number;
  sessionName: string;
  votes: TVoteEdit[];
}

function VoteReginster({ sessionId, sessionName, votes }: Props) {
  const [voteName, setVoteName] = useState<string>('');
  const [voteList, setVoteList] = useState<TVoteEdit[]>(votes);
  const [errMsg, setErrMsg] = useState<string>('');
  let lastId = 0;

  useEffect(() => {
    setVoteList(votes);
    lastId = voteList[voteList.length - 1].voteId + 1;
  }, [votes]);

  function handleChangeVoteName(e: React.ChangeEvent<HTMLInputElement>) {
    setVoteName(e.target.value);
    setErrMsg('');
  }

  const deleteVoteMutation = useElectionDetailDelete();
  function handleDeleteVote(voteId: number) {
    setVoteList(voteList.filter((vote) => vote.voteId !== voteId));
    deleteVoteMutation.mutate({ sessionId: sessionId, voteId: voteId });
  }

  const createVoteMutation = useCreateVote();

  function handleVoteRegister() {
    if (!voteName) {
      setErrMsg('투표 이름을 정해주세요.');
      return;
    }
    createVoteMutation.mutate({ sessionId: sessionId, voteName: voteName });
    const newVote = {
      sessionName: sessionName,
      voteId: lastId++,
      voteName: voteName,
    };
    setVoteList([...voteList, newVote]);
    setVoteName('');
  }

  return (
    <div className={styles['register-container']}>
      <div className={styles['register-section-top']}>
        <Text size='sm' weight='bold'>
          투표 등록하기
        </Text>
      </div>
      <div className={styles['register-section-bottom']}>
        <div className={styles['register-section-bottom-wrapper']}>
          <div className={styles['candidate-register-section']}>
            <div className={styles['candidate-register-add']}>
              <div className={styles['register-input']}>
                <InputField
                  id='vote-name'
                  label='투표명'
                  placeholder='예) 회장'
                  value={voteName}
                  onChange={handleChangeVoteName}
                />
              </div>
              <div className={styles['register-btn']}>
                <BaseButton
                  type='button'
                  kind='base'
                  status={BASE_BUTTON_STATUS.OUTLINE}
                  onClick={handleVoteRegister}
                >
                  <Text size='s'>투표 추가하기</Text>
                </BaseButton>
              </div>
            </div>
            <div className={styles['candidate-register-err']}>
              <Text size='xs' color='var(--color-error)'>
                {errMsg}
              </Text>
            </div>
          </div>
          <div className={styles['candidate-list']}>
            <div className={styles['candidate-list-wrapper']}>
              {voteList.map((vote) => (
                <div
                  key={vote.voteId}
                  className={styles['candidate-list-item']}
                >
                  <VoteListItem
                    id={vote.voteId}
                    sessionName={sessionName}
                    voteName={vote.voteName}
                    onDelete={() => handleDeleteVote(vote.voteId)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoteReginster;
