import VoteRanking from '@/components/molecules/VoteRanking';
import styles from './index.module.scss';
import Text from '@/components/atoms/Text';
import { VoteResult } from '@/types/voteSession';
import { useVoteResult } from '@/services/hooks/useVoteResult';

const Result = () => {
  const sessionId = 1;
  const { data = { wholeVoterPercent: 0, voteResults: [] } } =
    useVoteResult(sessionId);

  console.log(data);

  return (
    <div className={styles.main}>
      <div className={styles.percent}>
        <Text size='xs' weight='normal' color='#333333'>
          투표 참여율
        </Text>
        <Text size='xl' weight='bold' color='#555555'>
          {data.wholeVoterPercent}%
        </Text>
      </div>
      <div className={styles.result}>
        <div className={styles.ranking}>
          {data.voteResults.map((voteResult: VoteResult) =>
            voteResult.teamResults.map((team) => (
              <VoteRanking
                key={team.teamId}
                username={team.voteCandidateDtos[0]?.userName || '이름 없음'}
                votePercent={team.teamVotePercent}
                prefix={team.prefix}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
