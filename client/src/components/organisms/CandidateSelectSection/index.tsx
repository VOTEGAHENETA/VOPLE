import InputField from '@/components/molecules/InputField';
import styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import { useUserListGet } from '@/services/hooks/useUserList';
import { User } from '@/types/user';
import VoterNameCard from '@/components/molecules/VoterNameCard';

interface Props {
  sessionId: number;
  voteId: number;
}

const errMsgs = [
  '상단에서 그룹을 먼저 선택해주세요.',
  '일치하는 인원이 없어요.',
];

function CandidateSelectSection({ sessionId, voteId }: Props) {
  const { data, isLoading, isError } = useUserListGet(sessionId, voteId, 1);
  const [userList, setUserList] = useState<User[] | undefined>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');

  useEffect(() => {
    setUserList(data?.userList);
  }, [data]);

  function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);

    handleErrMessage();
  }

  function handleErrMessage() {
    setErrMsg(errMsgs[0]);
  }

  return (
    <div className={styles['select-container']}>
      <div>
        <InputField
          id='search-input'
          type='search'
          variant='search'
          value={searchValue}
          onChange={handleChangeSearch}
          errorMessage={errMsg}
        />
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {userList?.map((user) => (
            <div key={user.userId}>
              <VoterNameCard
                kakaoNickname={user.username}
                nickname={user.nickname}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CandidateSelectSection;
