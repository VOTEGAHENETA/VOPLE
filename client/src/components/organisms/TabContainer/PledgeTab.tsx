import React from 'react';
import styles from './index.module.scss';

interface PledgeTabProps {
  isActive?: boolean;
}

const PledgeTab: React.FC<PledgeTabProps> = ({ isActive = false }) => {
  const pledges = [
    '사물함 시건장치를 지문인식으로 바꾸겠습니다!',
    '셔틀버스를 리무진 버스로 바꾸겠습니다!',
    '점심 메뉴에 비프 부르기뇽을 추가하겠습니다!',
    '운동장에 잔디를 깔겠습니다!',
    '매점을 CU 편의점으로 바꾸겠습니다!',
    '유연동과제를 실시하겠습니다!',
  ];

  if (!isActive) return null;

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {pledges.map((pledge, index) => (
          <li key={index} className={styles.item}>
            <span className={styles.bullet}>•</span>
            <span>{pledge}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PledgeTab;
