import Text from '@/components/atoms/Text';
import x from '@/assets/icons/x.svg';
import styles from '@/components/molecules/CandidateTag/index.module.scss';
import IconMiniCheck from '@/assets/icons/IconMiniCheck';
import React, { useState } from 'react';

interface Candidate {
  id: number;
  name: string;
  image: string;
}

interface CandidateProps {
  checkCandidate?: () => void;
  deleteCandidate?: () => void;
  clearSection?: () => void;
  id: number;
}

const mockCandidate: Candidate[] = [
  { id: 1, name: '강성엽', image: x },
  { id: 2, name: '김선명', image: x },
  { id: 3, name: '황연주', image: x },
];

const CandidateTag: React.FC<CandidateProps> = ({
  id,
  checkCandidate,
  deleteCandidate,
  clearSection,
}) => {
  const [checked, setChecked] = useState(false);

  // molecules에서도 동작하고, organism에서도 동작하는 checked
  const handlerCheckCandidate = () => {
    if (checkCandidate) {
      checkCandidate();
    } else {
      setChecked((prev) => !prev);
    }
  };

  return (
    <div className={styles['tag-all']}>
      <div className={styles['tag-title']}>
        {/* 후보자 태그 영역 선택 ex) 후보1 or 후보2 */}
        <div className={styles['tag-subtitle']} onClick={handlerCheckCandidate}>
          <div
            className={`${styles['tag-mini-check']} ${checked ? styles.checked : ''}`}
          >
            {checked && <IconMiniCheck />}
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
        <div onClick={clearSection}>
          <Text size='s' weight='normal' color='#000000'>
            삭제
          </Text>
        </div>
      </div>

      {/* 후보자 목데이터 출력 및 제거 */}
      <div className={styles['tag-list']}>
        {mockCandidate.map((candidate) => (
          <div key={candidate.id}>
            <Text
              size='xs'
              weight='normal'
              color='#000000'
              className={styles['tag-name']}
            >
              {candidate.name}
              <img src={candidate.image} onClick={deleteCandidate} />
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateTag;
