import VoteRanking from '@/components/molecules/VoteRanking';
import styles from './index.module.scss';
import Text from '@/components/atoms/Text';
import IconButton from '@/components/atoms/IconButton';
import { useState } from 'react';
import { VoteResultsResponse } from '@/types/voteSession';

interface Props {
  currentData: VoteResultsResponse;
}

const Result = ({ currentData }: Props) => {
  const [selectedVoteIndex, setSelectedVoteIndex] = useState(0);

  const handlePrevSession = () => {
    setSelectedVoteIndex((prev) =>
      prev > 0 ? prev - 1 : currentData.voteResults.length - 1
    );
  };

  const handleNextSession = () => {
    setSelectedVoteIndex((prev) =>
      prev < currentData.voteResults.length - 1 ? prev + 1 : 0
    );
  };

  const currentVote = currentData.voteResults[selectedVoteIndex] || {};
  // const hasMultipleVotes = data.voteResults.length > 1;

  return (
    <div className={styles.container}>
      <div className={styles.voteinfo}>
        <Text size='m' weight='normal' color='#555555'>
          {currentData.sessionName}
        </Text>
        <div className={styles.select}>
          <IconButton
            name='left'
            onClick={handlePrevSession}
            className={styles.left}
          />
          <Text size='lg' weight='bold' color='#F58420'>
            {currentVote.voteName}
          </Text>
          <IconButton
            name='left'
            onClick={handleNextSession}
            className={styles.right}
          />
        </div>
      </div>

      <VoteRanking
        teamResults={currentVote.teamResults || []}
        wholeVoterPercent={currentData.wholeVoterPercent}
      />
    </div>
  );
};

export default Result;
