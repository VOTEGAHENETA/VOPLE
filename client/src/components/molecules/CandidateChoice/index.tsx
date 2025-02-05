import { useState } from 'react';
import styles from './index.module.scss';
import Poster from '@/components/atoms/Poster';
import Text from '@/components/atoms/Text';
import { mockCandidate } from '../CandidateSection/mockData';
import check from '@/assets/icons/check.svg';

function CandidateChoice() {
  const [choice, setChoice] = useState(false);

  const chooseCandidate = () => {
    setChoice((prev) => !prev);
  };

  return (
    <div className={styles.choice}>
      <div className={styles['choice-poster']} onClick={chooseCandidate}>
        <Poster size='s' src={mockCandidate.poster} />
        {choice && (
          <img src={check} alt='' className={styles['choice-check']} />
        )}
      </div>
      <Text size='s' weight='bold' color='#000000'>
        {mockCandidate.username}
      </Text>
    </div>
  );
}

export default CandidateChoice;
