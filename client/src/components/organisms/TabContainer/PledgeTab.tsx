import Text from '@/components/atoms/Text';
import styles from './index.module.scss';

console.log('PledgeTab Rendered');

interface PledgeTabProps {
  pledges?: string[];
}

const PledgeTab = ({ pledges = [] }: PledgeTabProps) => {
  // 탭 변환 시 렌더링 확인용
  console.log('PledgeTabProps Rendered');

  return (
    <div className={styles.pledgeContainer}>
      <Text
        size='lg'
        weight='bold'
        color='var(--color-white)'
        className={styles.title}
      >
        후보자 공약
      </Text>
      <ul className={styles.list}>
        {pledges.length > 0 ? (
          pledges.map((pledge, index) => (
            <li key={index} className={styles.item}>
              <span className={styles.bullet}>•</span>
              <span>{pledge}</span>
            </li>
          ))
        ) : (
          <li className={styles.emptyMessage}>
            <Text size='m' className={styles.emptyText}>
              추가된 공약이 없습니다.
            </Text>
          </li>
        )}
      </ul>
    </div>
  );
};

export default PledgeTab;
