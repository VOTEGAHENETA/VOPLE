import styles from './index.module.scss';
import VotingBoard from '@/components/organisms/VotingBoard';
import CandidateGallery from '@/components/organisms/CandidateGallery';
import BaseButton from '@/components/atoms/BaseButton';
import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';
import { useVoteStore } from '@/stores/voteStore';
import ModalPopup from './ModalPopUp';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVoteDetail } from '@/services/hooks/useVoteDetail';

function VoteTemplate() {
  const { selectedCandidates, isModalOpen, chooseCandidate, setModalOpen } =
    useVoteStore();
  const [isVoting, setIsVoting] = useState(true);
  const navigate = useNavigate();
  const sessionId = 3;
  const { data: voteData } = useVoteDetail(sessionId);

  // 네비게이션 처리
  useEffect(() => {
    if (!isVoting && voteData?.sessionId) {
      navigate(`/elections/${voteData.sessionId}/result/`);
    }
  }, [isVoting, voteData?.sessionId, navigate]);

  // 투표 가능 여부 계산
  const totalCandidates = voteData?.voteFindDtos.length || 0;
  const selectedCount = Object.keys(selectedCandidates).length;
  const allCandidatesSelected = selectedCount === totalCandidates;

  const voteComplete = () => setIsVoting(false);

  if (!isVoting) return null;
  if (!voteData)
    return <div className={styles.loading}>투표 정보 불러오는 중...</div>;

  return (
    <div className={styles.vote}>
      <VotingBoard info={voteData} selectedCandidates={selectedCandidates} />

      <div className={styles.gallery}>
        <CandidateGallery
          info={voteData}
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
            onClick={() => allCandidatesSelected && setModalOpen(true)}
          >
            소중한 한표
          </BaseButton>
        </div>
      </div>

      <div className={styles.realmodal}>
        {isModalOpen && (
          <div className={styles.modalBackdrop}>
            <ModalPopup
              voteSession={voteData}
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
