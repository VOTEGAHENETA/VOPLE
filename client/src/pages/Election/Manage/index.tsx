import ElectionDetailTemplate from '@/components/templates/ElectionDetailTemplate';
import styles from './index.module.scss';
import { useCandidateStore } from '@/stores/candidateStore';
import { useParams } from 'react-router-dom';
import CandidateRegisterTemplate from '@/components/templates/CandidateRegisterTemplate';

function Manage() {
  const { election_id } = useParams() as { election_id: string };
  const { openCandidateModal } = useCandidateStore();
  return (
    <div className={styles['detail-page']}>
      <ElectionDetailTemplate />
    </div>
  );
}

export default Manage;
