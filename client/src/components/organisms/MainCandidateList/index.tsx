import styles from './index.module.scss';
import medal from '@/assets/icons/medal.svg';
import crown from '@/assets/icons/crown.svg';
import silverCrown from '@/assets/icons/silverCrown.svg';
import { VoteResult } from '@/types/election';
import Text from '@/components/atoms/Text';
import CandidateSection from '@/components/molecules/CandidateSection';

interface Props {
  vote: VoteResult;
}

function MainCandidateList({ vote }: Props) {
  return (
    <div className={styles['vote-main']}>
      <div className={styles['vote-title']}>
        {vote.voteId === 1 ? (
          <img src={crown} />
        ) : vote.voteId === 2 ? (
          <img src={silverCrown} />
        ) : (
          <img src={medal} />
        )}
        <Text weight='bold'>{vote.voteName} 후보</Text>
      </div>
      <div className={styles['vote-team-list']}>
        {vote.teamResults.map((team) => (
          <div key={team.teamId}>
            <CandidateSection team={team} />
          </div>
        ))}
      </div>
      <div className={styles['vote-dots']}>
        <Text size='xl'>.</Text>
      </div>
    </div>
  );
}

export default MainCandidateList;
