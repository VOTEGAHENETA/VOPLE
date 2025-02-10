import Text from '@/components/atoms/Text';
import styles from './index.module.scss';
import { Vote } from '@/types/voteSession';
import X from '@/assets/icons/x.svg';
import CandidateTag from '@/components/molecules/CandidateTag';

interface Props {
  vote: Vote;
}

function CandidateSelectedSection({ vote }: Props) {
  return (
    <div className={styles['selected-container']}>
      <div className={styles['selected-text-section']}>
        <div className={styles['selected-text-title']}>
          <Text size='lg' weight='bold'>
            &apos;&nbsp;
            <Text size='lg' color='var(--color-main-orange)' weight='bold'>
              {vote.voteName}
            </Text>
            &nbsp;&apos; 후보 지정
          </Text>
          <div>
            <img src={X} alt='닫기' />
          </div>
        </div>
        <div className={styles['selected-text-description']}>
          <Text size='s'>아래에서 그룹 선택 후, 후보자를 추가해주세요.</Text>
          <Text size='s'>
            러닝메이트라면 후보자 그룹당 복수 선택이 가능합니다.
          </Text>
        </div>
      </div>
      <div className={styles['selected-box']}>
        <div className={styles['selected-wrapper']}>
          {vote.voteTeams.map((team, index) => (
            <div key={team.voteTeamId} className={styles['selected-item']}>
              <CandidateTag id={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CandidateSelectedSection;
