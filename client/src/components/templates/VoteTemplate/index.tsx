import styles from './index.module.scss';
import VotingBoard from '@/components/organisms/VotingBoard';
import CandidateGallery from '@/components/organisms/CandidateGallery';
import BaseButton from '@/components/atoms/BaseButton';
import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';
import { useVoteStore } from '@/stores/voteStore';
import ModalPopup from './ModalPopUp';
import { info } from '@/mocks/data/candidateInfo';
import { useState } from 'react';

function VoteTemplate() {
  const { selectedCandidates, isModalOpen, chooseCandidate, setModalOpen } =
    useVoteStore();
  const [isVoting, setIsVoting] = useState(true);

  // 투표 수
  const totalCandidates = info.voteFindDto.length;

  // 객체의 key(예: voteTeamId)를 기준으로 선택된 후보 수 계산
  const selectedCount = Object.keys(selectedCandidates).length;
  const allCandidatesSelected = selectedCount === totalCandidates;

  const voteComplete = () => {
    setIsVoting(false);
  };

  // 투표 완료 후 VoteTemplate 페이지 언마운트
  if (!isVoting) {
    return null;
  }

  return (
    <div className={styles.vote}>
      <VotingBoard info={info} selectedCandidates={selectedCandidates} />
      <div className={styles.gallery}>
        <CandidateGallery
          info={info}
          chooseCandidate={chooseCandidate}
          selectedCandidates={selectedCandidates}
        />
      </div>
      <div className={styles.btn}>
        <div className={styles.canceled}>
          <BaseButton
            kind='base'
            status={BASE_BUTTON_STATUS.OUTLINE}
            type='button'
          >
            취소
          </BaseButton>
        </div>
        <div className={styles.one}>
          <BaseButton
            kind='base'
            status={
              allCandidatesSelected
                ? BASE_BUTTON_STATUS.FILL
                : BASE_BUTTON_STATUS.DISABLE
            }
            type='button'
            onClick={() => {
              if (!allCandidatesSelected) return;
              setModalOpen(true);
            }}
          >
            소중한 한표
          </BaseButton>
        </div>
      </div>

      <div className={styles.realmodal}>
        {isModalOpen && (
          <div className={styles.modalBackdrop}>
            <ModalPopup
              voteSession={info}
              selectedCandidates={selectedCandidates}
              voteComplete={voteComplete}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default VoteTemplate;
