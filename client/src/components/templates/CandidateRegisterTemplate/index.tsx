import styles from './index.module.scss';
import CandidateSelectedSection from '@/components/organisms/CandidateSelectedSection';
import CandidateSelectSection from '@/components/organisms/CandidateSelectSection';
import { info } from '@/types/voteSession';

interface Props {
  sessionId: number;
  voteId: number;
}

function CandidateRegisterTemplate({ sessionId, voteId }: Props) {
  return (
    <div className={styles['modal-register']}>
      <div className={styles['modal-wrapper']}>
        <CandidateSelectedSection vote={info.voteFindDto[0]} />
        <CandidateSelectSection sessionId={sessionId} voteId={voteId} />
      </div>
    </div>
  );
}

export default CandidateRegisterTemplate;
