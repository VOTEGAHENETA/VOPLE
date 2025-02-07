import styles from './index.module.scss';
import VotingBoard from '@/components/organisms/VotingBoard';
import CandidateGallery from '@/components/organisms/CandidateGallery';
import BaseButton from '@/components/atoms/BaseButton';
import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';
import { useVoteStore } from '@/stores/voteStore';
import ModalPopup from './ModalPopUp';
import { info } from '@/types/voteSession';

function VoteTemplate() {
  const { selectedCandidates, isModalOpen, chooseCandidate, setModalOpen } =
    useVoteStore();

  return (
    <div className={styles.vote}>
      {/* VotingBoard에 선택된 후보 정보를 전달 */}
      <VotingBoard info={info} selectedCandidates={selectedCandidates} />
      <div className={styles.gallery}>
        {/* CandidateGallery에 선택 함수와 선택 상태 전달 */}
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
            status={BASE_BUTTON_STATUS.FILL}
            type='button'
            onClick={() => setModalOpen(true)}
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
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default VoteTemplate;
