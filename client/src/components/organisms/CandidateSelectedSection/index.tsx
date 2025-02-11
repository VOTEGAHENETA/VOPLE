import Text from '@/components/atoms/Text';
import styles from './index.module.scss';
import X from '@/assets/icons/x.svg';
import CandidateTag from '@/components/molecules/CandidateTag';
import { useCandidateStore } from '@/stores/candidateStore';
import { CandidateList } from '@/types/user';
import { useEffect } from 'react';

interface Props {
  voteName: string;
  candidateList: CandidateList | undefined;
}

function CandidateSelectedSection({ voteName, candidateList }: Props) {
  const {
    sendCandidates,
    setSendCandidates,
    setOpenCandidateModal,
    setActiveTeamId,
  } = useCandidateStore();

  function handleCloseModal() {
    setOpenCandidateModal(-1, '');
  }

  useEffect(() => {
    if (candidateList) {
      setSendCandidates(candidateList);
    }
  }, [candidateList]);

  return (
    <div className={styles['selected-container']}>
      <div className={styles['selected-text-section']}>
        <div className={styles['selected-text-title']}>
          <Text size='lg' weight='bold'>
            &apos;&nbsp;
            <Text size='lg' color='var(--color-main-orange)' weight='bold'>
              {voteName}
            </Text>
            &nbsp;&apos; 후보 지정
          </Text>
          <div onClick={handleCloseModal}>
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
          {candidateList &&
            Object.entries(sendCandidates).map(([teamId, candidateList]) =>
              Object.entries(candidateList).map(([groupKey, candidates]) => (
                <div
                  key={`${teamId}-${groupKey}`}
                  className={styles['selected-item']}
                  onClick={() => setActiveTeamId(Number(teamId))}
                >
                  <CandidateTag id={Number(teamId)} candidates={candidates} />
                </div>
              ))
            )}
        </div>
      </div>
    </div>
  );
}

export default CandidateSelectedSection;
