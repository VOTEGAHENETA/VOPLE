import styles from './index.module.scss';
import crown from '@/assets/icons/crown.svg';
import twoFinger from '@/assets/icons/twoFinger.svg';
import threeFinger from '@/assets/icons/threeFinger.svg';
import Text from '@/components/atoms/Text';

interface Props {
  rank: number;
  prefix: string;
  username: string;
  teamVotePercent: number;
}

function CandidateResult({ rank, prefix, username, teamVotePercent }: Props) {
  // 랭크에 따라 렌더링 되는 Icon이 달라짐. 동영이가 Order by로 넘겨주기로 함
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return crown;
      case 2:
        return twoFinger;
      case 3:
        return threeFinger;
      default:
        return crown;
    }
  };

  return (
    <div className={styles.result}>
      <img src={getRankIcon(rank)} alt={`rank ${rank}`} />
      <div className={styles.wrap}>
        <div className={styles.user}>
          <Text size='s' weight='normal' color='#999999'>
            {prefix}
          </Text>
          <Text size='m' weight='bold' color='#555555'>
            {username}
          </Text>
        </div>
        <div className={styles.percent}>
          <Text size='xl' weight='bold' color='#555555'>
            {teamVotePercent}
          </Text>
          <Text size='xl' weight='bold' color='#555555'>
            %
          </Text>
        </div>
      </div>
    </div>
  );
}

// 테스트

/* <div>
  {candidates.map((team, index) => (
    <CandidateResult
      key={team.teamId}
      rank={index + 1}
      prefix={team.voteCandidateDtos[0].prefix}
      username={team.voteCandidateDtos[0].userName}
      teamVotePercent={team.teamVotePercent}
    />
  ))}
</div>; */

export default CandidateResult;
