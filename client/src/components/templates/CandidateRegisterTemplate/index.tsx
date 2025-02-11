import styles from './index.module.scss';
import CandidateSelectedSection from '@/components/organisms/CandidateSelectedSection';
import CandidateSelectSection from '@/components/organisms/CandidateSelectSection';
import { useUserListGet } from '@/services/hooks/useUserList';
import { CandidateList, User } from '@/types/user';
import { useEffect, useState } from 'react';

interface Props {
  sessionId: number;
  voteId: number;
  voteName: string;
}

function CandidateRegisterTemplate({ sessionId, voteId, voteName }: Props) {
  const { data, isLoading, isError } = useUserListGet(sessionId, voteId, 0);
  const [userList, setUserList] = useState<User[] | undefined>();
  const [candidateList, setCandidateList] = useState<
    CandidateList | undefined
  >();

  useEffect(() => {
    if (data) {
      setUserList(data.userList);
      setCandidateList(data.candidateList);
    }
    console.log('List:', data);
  }, [data]);

  if (isError) {
    return (
      <div>
        데이터를 불러오는 도중 오류가 발생했습니다. 창을 닫고 다시 접속해주세요.
      </div>
    );
  }

  if (isLoading) <div>데이터 로드에 실패했습니다. 다시 접속해주세요</div>;

  return (
    <div className={styles['modal-register']}>
      <div className={styles['modal-wrapper']}>
        <CandidateSelectedSection
          voteName={voteName}
          candidateList={candidateList}
        />
        <CandidateSelectSection
          sessionId={sessionId}
          voteId={voteId}
          initialUserList={userList}
        />
      </div>
    </div>
  );
}

export default CandidateRegisterTemplate;
