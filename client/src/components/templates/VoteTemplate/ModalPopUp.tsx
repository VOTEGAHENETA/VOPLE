import { CandidateSessionData } from '@/types/voteSession';
import ConfirmModal from '@/components/molecules/ConfirmModal';
import stamp from '@/assets/icons/stamp.svg';
import styles from './index.module.scss';
import { useVoteStore } from '@/stores/voteStore';
import BaseButton from '@/components/atoms/BaseButton';
import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';
import RoleNameTag from '@/components/molecules/RoleNameTag';
import { useState } from 'react';
import Loading from './Loading';
import { useVoteMutation } from '@/services/hooks/useVote';
import Poster from '@/components/atoms/Poster';

interface ModalPopupProps {
  voteSession: CandidateSessionData;
  selectedCandidates: {
    [voteId: number]: { candidateId: number; userName: string };
  };
  voteComplete: () => void;
}

function ModalPopup({
  voteSession,
  selectedCandidates,
  voteComplete,
}: ModalPopupProps) {
  const { setModalOpen } = useVoteStore();
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useVoteMutation({
    voteSession,
    selectedCandidates,
    voteComplete: () => {
      setIsLoading(false);
      setModalOpen(false);
      voteComplete();
    },
  });

  const handleVoteSubmit = () => {
    setIsLoading(true);
    mutation.mutate();
  };

  if (isLoading) {
    return <Loading onComplete={() => voteComplete()} />;
  }

  // voteSession의 voteData를 voteId 기준으로 정렬하여 순위 계산에 사용
  const sortedVotes = [...voteSession.voteFindDtos].sort(
    (a, b) => a.voteId - b.voteId
  );

  return (
    <div className={styles.container}>
      <ConfirmModal imgSrc={stamp} label='당신이 선택한 국가권력 멤버!'>
        <div className={styles.selectedCandidates}>
          {voteSession.voteFindDtos.map((vote) => {
            const candidate = selectedCandidates[vote.voteId];
            if (!candidate) return null;
            // 후보자 정보와 일치하는 팀을 찾음
            const team = vote.voteTeams.find((team) =>
              team.candidates.some(
                (c) => c.candidateId === candidate.candidateId
              )
            );
            if (!team) return null;

            // sortedVotes에서 해당 vote의 순위를 계산 (1부터 시작)
            const rank =
              sortedVotes.findIndex((v) => v.voteId === vote.voteId) + 1;

            return (
              <div className={styles.confirm} key={vote.voteId}>
                <RoleNameTag
                  voteId={vote.voteId}
                  voteName={vote.voteName}
                  showUsername={false}
                  rank={rank}
                />
                <div className={styles.candidate}>
                  <Poster size='xs' src={team.poster} />
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.btn}>
          <BaseButton
            type='button'
            kind='base'
            status={BASE_BUTTON_STATUS.OUTLINE}
            onClick={() => setModalOpen(false)}
          >
            취소
          </BaseButton>
          <BaseButton
            type='submit'
            kind='base'
            status={BASE_BUTTON_STATUS.FILL}
            onClick={handleVoteSubmit}
          >
            투표
          </BaseButton>
        </div>
      </ConfirmModal>
    </div>
  );
}

export default ModalPopup;
