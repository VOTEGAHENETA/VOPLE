import InputField from '@/components/molecules/InputField';
import styles from './index.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { User } from '@/types/user';
import VoterNameCard from '@/components/molecules/VoterNameCard';
import { useCandidateStore } from '@/stores/candidateStore';
import { useInfiniteUserList } from '@/services/hooks/useUserList';

interface Props {
  sessionId: number;
  voteId: number;
  initialUserList: User[] | undefined;
}

const errMsgs = [
  '상단에서 그룹을 먼저 선택해주세요.',
  '일치하는 인원이 없어요.',
];

function CandidateSelectSection({ sessionId, voteId }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteUserList(sessionId, voteId);
  const { activeTeamId, addCandidate, removeCandidate, selectedCandidates } =
    useCandidateStore();
  const [searchValue, setSearchValue] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log('현재 선택된 팀:', activeTeamId);
  }, [activeTeamId]);

  useEffect(() => {
    if (data) {
      const newUsers = data.pages.flatMap((page) => page.userList);
      setAllUsers((prevUsers) => {
        const uniqueUsers = new Map(prevUsers.map((u) => [u.userId, u]));
        newUsers.forEach((user) => uniqueUsers.set(user.userId, user));
        return Array.from(uniqueUsers.values());
      });
    }
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleCandidateClick = (user: User) => {
    if (activeTeamId === null) {
      setErrMsg(errMsgs[0]);
      return;
    }

    const isAlreadySelected = selectedCandidates[activeTeamId]?.some(
      (candidate) => candidate.userId === user.userId
    );

    if (isAlreadySelected) {
      removeCandidate(voteId, user.userId);
    } else {
      addCandidate(voteId, user);
    }
  };

  function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
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
      <div className={styles['select-wrapper']}>
        {allUsers.map((user) => (
          <div key={user.userId} onClick={() => handleCandidateClick(user)}>
            <VoterNameCard
              kakaoNickname={user.username}
              nickname={user.nickname}
            />
          </div>
        ))}
        <div ref={observerRef} style={{ height: '20px' }}>
          {isFetchingNextPage && <span>Loading...</span>}
        </div>
      </div>
    </div>
  );
}

export default CandidateSelectSection;
