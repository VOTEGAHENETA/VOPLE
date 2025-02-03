import React from 'react';
import styles from './index.module.scss';
import Text from '@/components/atoms/Text';
import { mockCandidate } from './mockData';

function Introduction() {
  return (
    <div className={styles.introduction}>
      <Text size='s' weight='normal' color='#000000'>
        {mockCandidate.candidate_statement}
      </Text>
    </div>
  );
}

export default Introduction;
