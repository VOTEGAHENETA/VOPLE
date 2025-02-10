// components/organisms/ModalPopup/index.tsx
import { CandidateSessionData } from '@/types/voteSession';
import ConfirmModal from '@/components/molecules/ConfirmModal';
import stamp from '@/assets/icons/stamp.svg';
import styles from './index.module.scss';
import { useVoteStore } from '@/stores/voteStore';
import BaseButton from '@/components/atoms/BaseButton';
import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';
import RoleNameTag from '@/components/molecules/RoleNameTag';

interface ModalPopupProps {
  voteSession: CandidateSessionData;
  selectedCandidates: {
    [voteId: number]: { candidateId: number; userName: string };
  };
}

function ModalPopup({ voteSession, selectedCandidates }: ModalPopupProps) {
  const { setModalOpen } = useVoteStore();

  // voteSession이 없으면 렌더링하지 않음.
  if (!voteSession) return null;

  return (
    <ConfirmModal imgSrc={stamp} label='당신이 선택한 국가권력 멤버!'>
      <div className={styles.selectedCandidates}>
        {voteSession.voteFindDto.map((vote) => {
          const candidate = selectedCandidates[vote.voteId];
          if (!candidate) return null;

          // 후보자 정보와 일치하는 팀을 찾음
          const team = vote.voteTeams.find((team) =>
            team.candidates.some((c) => c.candidateId === candidate.candidateId)
          );
          if (!team || !team.poster) return null;

          return (
            <div className={styles.confirm} key={vote.voteId}>
              <RoleNameTag
                voteId={vote.voteId}
                voteName={vote.voteName}
                showUsername={false}
              />
              <div className={styles.candidate}>
                <img src={team.poster} alt='후보자 포스터' />
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
        <BaseButton type='submit' kind='base' status={BASE_BUTTON_STATUS.FILL}>
          투표
        </BaseButton>
      </div>
    </ConfirmModal>
  );
}

export default ModalPopup;
