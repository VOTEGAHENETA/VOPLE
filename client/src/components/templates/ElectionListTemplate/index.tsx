import styles from './index.module.scss';
import { useState, useEffect } from 'react';
import ElectionListBox from '@/components/molecules/ElectionListBox';
import { ElectionList } from '@/types/election';
import { getElectionList } from '@/services/election';

function ElectionListTemplate() {
  const [electionList, setElectionList] = useState<ElectionList>({
    involvedSessions: [],
    managedSessions: [],
  });

  useEffect(() => {
    getElectionList().then((response) => {
      if (response) {
        setElectionList(response);
      }
    });
  }, []);

  return (
    <div className={styles.list}>
      <ElectionListBox
        elections={electionList?.involvedSessions || []}
        status='participating'
      />
      <ElectionListBox
        elections={electionList?.managedSessions || []}
        status='created'
      />
    </div>
  );
}

export default ElectionListTemplate;
