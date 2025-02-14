import VoteRanking from '@/components/molecules/VoteRanking';
import styles from './index.module.scss';
import Text from '@/components/atoms/Text';
import IconButton from '@/components/atoms/IconButton';
import { useState, useEffect } from 'react';
import { VoteResultsResponse } from '@/types/voteSession';
import useLiveVote from '@/hooks/useLiveVote';

interface Props {
  currentData: VoteResultsResponse;
  sessionId: number;
}

const Result = ({ currentData, sessionId }: Props) => {
  const [voteData, setVoteData] = useState<VoteResultsResponse>(currentData);
  const [selectedVoteIndex, setSelectedVoteIndex] = useState(0);

  // currentData의 sessionId로 useLiveVote hook 호출
  const { liveVote } = useLiveVote({
    sessionId: sessionId,
  });

  // liveVote가 업데이트되면 최신 투표 데이터로 voteData를 갱신
  useEffect(() => {
    if (liveVote.length > 0) {
      setVoteData(liveVote[liveVote.length - 1]);
    }
  }, [liveVote]);

  const handlePrevSession = () => {
    setSelectedVoteIndex((prev) =>
      prev > 0 ? prev - 1 : voteData.voteResults.length - 1
    );
  };

  const handleNextSession = () => {
    setSelectedVoteIndex((prev) =>
      prev < voteData.voteResults.length - 1 ? prev + 1 : 0
    );
  };

  const currentVote = voteData.voteResults[selectedVoteIndex] || {};

  useEffect(() => {
    console.log('voteData가 변경되었습니다:', voteData);
  }, [voteData]);

  return (
    <div className={styles.container}>
      <div className={styles.voteinfo}>
        <Text size='m' weight='normal' color='#555555'>
          {voteData.sessionName}
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
        wholeVoterPercent={voteData.wholeVoterPercent}
      />
    </div>
  );
};

export default Result;
