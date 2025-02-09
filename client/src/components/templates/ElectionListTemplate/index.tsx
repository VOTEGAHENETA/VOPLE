import styles from './index.module.scss';
import ElectionListBox from '@/components/molecules/ElectionListBox';
import { mockElectionList } from '@/types/election';

function ElectionListTemplate() {
  const participaintedElections = mockElectionList.involvedSessions;
  const createdElesctions = mockElectionList.managedSessions;
  return (
    <div className={styles.list}>
      <ElectionListBox
        elections={participaintedElections}
        status='participating'
      />
      <ElectionListBox elections={createdElesctions} status='created' />
    </div>
  );
}

export default ElectionListTemplate;
