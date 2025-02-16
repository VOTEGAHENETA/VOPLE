import crown from '@/assets/icons/crown.svg';
import twoFiger from '@/assets/icons/twoFinger.svg';
import threeFinger from '@/assets/icons/threeFinger.svg';
import Text from '@/components/atoms/Text';
import styles from './index.module.scss';
import { TeamResult } from '@/types/voteSession';

interface Props {
  teamResults: TeamResult[];
  wholeVoterPercent: number;
}

function VoteRanking({ teamResults = [], wholeVoterPercent = 0 }: Props) {
  const topThree = teamResults.slice(0, 3);

  return (
    <div className={styles.container}>
      {/* 투표 참여율 표시 */}
      <div className={styles.participation}>
        <Text size='xs' weight='normal' color='#333333'>
          투표 참여율
        </Text>
        <Text size='xl' weight='bold' color='#555555'>
          {wholeVoterPercent}%
        </Text>
      </div>

      {/* 상위 3개 팀 렌더링 */}
      <div className={styles.ranking}>
        {topThree.map((team, index) => (
          <div key={team.teamId} className={styles.team}>
            {/* 순위별 아이콘 */}
            <div className={styles.team_info}>
              <img
                src={index === 0 ? crown : index === 1 ? twoFiger : threeFinger}
                alt='rank'
              />

              {/* 팀 정보 */}
              <div className={styles.candidate_info}>
                <Text size='s' weight='normal' color='#999999'>
                  {team.prefix}
                </Text>
                <Text size='m' weight='bold' color='#555555'>
                  {team.voteCandidateDtos[0]?.userName || '이름 없음'}
                </Text>
              </div>
            </div>

            {/* 득표율 */}
            <Text
              size='xl'
              weight='bold'
              color='#555555'
              className={styles.text}
            >
              {team.teamVotePercent}%
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VoteRanking;
