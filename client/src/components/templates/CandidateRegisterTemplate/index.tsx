import BaseButton from '@/components/atoms/BaseButton';
import styles from './index.module.scss';
import CandidateSelectedSection from '@/components/organisms/CandidateSelectedSection';
import CandidateSelectSection from '@/components/organisms/CandidateSelectSection';
import { useUserListGet } from '@/services/hooks/useUserList';
import { CandidateList, User } from '@/types/user';
import { useEffect, useState } from 'react';
import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';
import { usePostVoteTeam } from '@/services/hooks/usePostVoteTeam';
import { useCandidateStore } from '@/stores/candidateStore';

interface Props {
  sessionId: number;
  voteId: number;
  voteName: string;
}

function CandidateRegisterTemplate({ sessionId, voteId, voteName }: Props) {
  const { data, isLoading, isError } = useUserListGet(sessionId, voteId, 0);
  const { sendCandidates, setOpenCandidateModal } = useCandidateStore();
  const [userList, setUserList] = useState<User[] | undefined>();
  const [candidateList, setCandidateList] = useState<
    CandidateList | undefined
  >();

  useEffect(() => {
    if (data) {
      setUserList(data.userList);
      setCandidateList(data.candidateList);
    }
  }, [data]);

  if (isError) {
    return (
      <div>
        데이터를 불러오는 도중 오류가 발생했습니다. <br />
        창을 닫고 다시 접속해주세요.
      </div>
    );
  }

  function isCheckNoUserGroup() {
    return Object.values(sendCandidates).some((candidateList) =>
      Object.values(candidateList).every(
        (candidates) => candidates.length === 0
      )
    );
  }

  const postTeam = usePostVoteTeam();
  function handleSubmitTeam() {
    if (isCheckNoUserGroup()) {
      alert('모든 그룹에 후보자가 선택되어야 제출할 수 있습니다.');
      return;
    }

    postTeam.mutate({
      sessionId: sessionId,
      voteId: voteId,
      data: sendCandidates,
    });
    handleCloseModal();
  }

  function handleCloseModal() {
    setOpenCandidateModal(-1, '');
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
        <div className={styles['btn-section']}>
          <BaseButton
            type='reset'
            kind='base'
            status={BASE_BUTTON_STATUS.OUTLINE}
            onClick={handleCloseModal}
          >
            취소
          </BaseButton>
          <BaseButton
            type='submit'
            kind='base'
            status={BASE_BUTTON_STATUS.FILL}
            onClick={handleSubmitTeam}
          >
            지정 완료
          </BaseButton>
        </div>
      </div>
    </div>
  );
}

export default CandidateRegisterTemplate;
