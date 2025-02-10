import Text from '@/components/atoms/Text';
import styles from './index.module.scss';
import InputField from '@/components/molecules/InputField';
import BaseButton from '@/components/atoms/BaseButton';
import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';
import React, { useEffect, useState } from 'react';
import { VoteListItem } from '@/components/molecules/VoteListItem';
import { useCreateVote } from '@/services/hooks/useCreateVote';
import { TVoteEdit } from '@/types/election';

interface Props {
  sessionId: number;
  sessionName: string;
  votes: TVoteEdit[];
}

function VoteReginster({ sessionId, sessionName, votes }: Props) {
  const [voteName, setVoteName] = useState<string>('');
  const [voteList, setVoteList] = useState<TVoteEdit[]>(votes);
  let lastId = voteList[voteList.length - 1].voteId + 1;

  useEffect(() => {
    setVoteList(votes);
  }, [votes]);

  function handleChangeVoteName(e: React.ChangeEvent<HTMLInputElement>) {
    setVoteName(e.target.value);
  }

  function handleDeleteVote(voteId: number) {
    setVoteList(voteList.filter((vote) => vote.voteId !== voteId));
  }

  const mutation = useCreateVote();

  function handleVoteRegister() {
    mutation.mutate({ sessionId: sessionId, voteName: voteName });
    const newVote = {
      sessionName: sessionName,
      voteId: lastId++,
      voteName: voteName,
    };
    setVoteList([...voteList, newVote]);
    console.log(voteName);
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
          <div className={styles['candidate-register']}>
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
