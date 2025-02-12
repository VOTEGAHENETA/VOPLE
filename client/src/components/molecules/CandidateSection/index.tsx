import styles from './index.module.scss';
import Poster from '@/components/atoms/Poster';
import Text from '@/components/atoms/Text';
import Introduction from './Introduction';
import BaseButton from '@/components/atoms/BaseButton';
import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';
import { TeamResult } from '@/types/voteSession';

interface Props {
  team: TeamResult;
  onClick?: () => void;
}

function CandidateSection({ team, onClick }: Props) {
  return (
    <div className={styles.candidate} onClick={onClick}>
      <div className={styles['candidate-poster']}>
        <Poster size='xs' src={team.poster} />
      </div>
      <div className={styles['candidate-content']}>
        <div className={styles['candidate-information']}>
          <div className={styles['candidate-information-prefix']}>
            <Text size='sm'>{team.prefix}</Text>
          </div>
          <div
            className={
              styles[
                `candidate-name-${team.voteCandidateDtos.length > 1 ? 'single' : 'multi'}`
              ]
            }
          >
            {team.voteCandidateDtos.map((candi, index) => (
              <div key={candi.userId} className={styles['candidate-name']}>
                {index > 0 && '&'}
                <Text
                  weight='bold'
                  size={team.voteCandidateDtos.length > 1 ? 's' : 'm'}
                >
                  {candi.userName}
                </Text>
              </div>
            ))}
          </div>
        </div>
        {team.candidate_statement ? (
          <Introduction candidateStatement={team.candidate_statement} />
        ) : (
          <Text
            size='xs'
            weight='normal'
            color='#999999'
            className={styles['candidate-none-intro']}
          >
            아직 소개를 안 넣었어요
          </Text>
        )}
        {/* <Introduction /> */}

        <BaseButton
          kind='chip'
          status={BASE_BUTTON_STATUS.OUTLINE}
          type='button'
        >
          채널바로가기
        </BaseButton>
      </div>
    </div>
  );
}

export default CandidateSection;
