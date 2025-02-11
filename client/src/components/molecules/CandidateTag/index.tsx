import Text from '@/components/atoms/Text';
import x from '@/assets/icons/x.svg';
import styles from '@/components/molecules/CandidateTag/index.module.scss';
import IconMiniCheck from '@/assets/icons/IconMiniCheck';
import BaseButton from '@/components/atoms/BaseButton';
import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';
import clsx from 'clsx';
import { useCandidateStore } from '@/stores/candidateStore';
import { Candidate } from '@/types/user';

interface Props {
  id: number;
  candidates: Candidate[];
}

function CandidateTag({ id, candidates }: Props) {
  const {
    sendCandidates,
    activeTeamId,
    setActiveTeamId,
    removeCandidate,
    resetCandidate,
  } = useCandidateStore();
  const isChecked = activeTeamId === id;
  console.log('send:', sendCandidates);

  const handlerCheckCandidate = () => {
    setActiveTeamId(id);
  };

  const handleDeleteCandidate = (userId: number) => {
    console.log('개별 삭제');
    removeCandidate(userId);
  };

  const handleClearSection = () => {
    console.log('후보 삭제');
    resetCandidate();
  };

  return (
    <div className={clsx(styles['tag-all'], styles[`tag-select-${isChecked}`])}>
      <div className={styles['tag-title']} onClick={handlerCheckCandidate}>
        <div className={styles['tag-subtitle']}>
          <div
            className={`${styles['tag-mini-check']} ${isChecked ? styles.checked : ''}`}
          >
            {isChecked && <IconMiniCheck />}
          </div>
          <Text
            size='s'
            weight='bold'
            color='#111111'
            className={styles['tag-candidate']}
          >
            후보{id}
          </Text>
        </div>
        <div onClick={handleClearSection}>
          <Text size='s' weight='normal' color='#000000'>
            삭제
          </Text>
        </div>
      </div>

      <div className={styles['tag-list']}>
        {candidates.map((candidate) => (
          <div
            key={candidate.userId}
            onClick={() => handleDeleteCandidate(candidate.userId)}
          >
            <BaseButton
              type='button'
              kind='mini-chip'
              status={BASE_BUTTON_STATUS.OUTLINE}
            >
              <div className={styles['tag-name']}>
                {candidate.username}
                <img src={x} className={styles['tag-img']} />
              </div>
            </BaseButton>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CandidateTag;
