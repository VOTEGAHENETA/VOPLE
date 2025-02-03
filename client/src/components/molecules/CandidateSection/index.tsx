import React from 'react';
import styles from './index.module.scss';
import Poster from '@/components/atoms/Poster';
import Information from './Information';
import Introduction from './Introduction';
import { mockCandidate } from './mockData';
import BaseButton from '@/components/atoms/BaseButton';
import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';

function CandidateSection() {
  return (
    <div className={styles.candidate}>
      <div className={styles['candidate-all']}>
        <Poster
          size='xs'
          src={mockCandidate.poster}
          className={styles['candidate-poster']}
        />
        <div className={styles['candidate-content']}>
          <Information />
          <Introduction />
          <BaseButton
            kind='chip'
            status={BASE_BUTTON_STATUS.OUTLINE}
            type='button'
          >
            채널바로가기
          </BaseButton>
        </div>
      </div>
    </div>
  );
}

export default CandidateSection;
