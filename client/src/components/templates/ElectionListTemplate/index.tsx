import styles from './index.module.scss';
import { useState, useEffect } from 'react';
import ElectionListBox from '@/components/molecules/ElectionListBox';
import { ElectionList } from '@/types/election';
import { getElectionList } from '@/services/election';

function ElectionListTemplate() {
  const [electionList, setElectionList] = useState<ElectionList | null>(null);

  useEffect(() => {
    getElectionList().then((response) => {
      setElectionList(response);
    });
  }, []);

  if (!electionList) {
    return <div>Loading...</div>;
  }

  const participatedElections = electionList.involvedSessions;
  const createdElections = electionList.managedSessions;

  return (
    <div className={styles.list}>
      <ElectionListBox
        elections={participatedElections}
        status='participating'
      />
      <ElectionListBox elections={createdElections} status='created' />
    </div>
  );
}

export default ElectionListTemplate;
