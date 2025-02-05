import styles from './index.module.scss';
import Poster from '@/components/atoms/Poster';
import Text from '@/components/atoms/Text';
import Information from './Information';
import Introduction from './Introduction';
import BaseButton from '@/components/atoms/BaseButton';
import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';
import { TeamResult } from '@/types/election';

interface Props {
  team: TeamResult;
}

function CandidateSection({ team }: Props) {
  return (
    <div className={styles.candidate}>
      <div className={styles['candidate-all']}>
        <Poster
          size='xs'
          src={team.poster}
          className={styles['candidate-poster']}
        />
        <div className={styles['candidate-content']}>
          {team.voteCandidateDtos.map((candi) => (
            <div key={candi.userId}>
              <Information perfix={team.prefix} username={candi.userName} />
            </div>
          ))}
          {team.candidateStatement ? (
            <Introduction candidateStatement={team.candidateStatement} />
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
    </div>
  );
}

export default CandidateSection;
