import styles from './index.module.scss';
import Text from '@/components/atoms/Text';
import { mockCandidate } from './mockData';

function Information() {
  return (
    <div className={styles.information}>
      <Text
        size='m'
        weight='bold'
        color='#333333'
        className={styles['information-perfix']}
      >
        {mockCandidate.perfix}
      </Text>
      <Text size='lg' weight='bold' color='#000000'>
        {mockCandidate.username}
      </Text>
    </div>
  );
}

export default Information;
