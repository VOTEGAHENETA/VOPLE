import styles from './index.module.scss';
import Text from '@/components/atoms/Text';

interface Props {
  perfix: string;
  username: string;
}

function Information({ perfix, username }: Props) {
  return (
    <div className={styles.information}>
      <Text
        size='m'
        weight='bold'
        color='#333333'
        className={styles['information-perfix']}
      >
        {perfix}
      </Text>
      <Text size='lg' weight='bold' color='#000000'>
        {username}
      </Text>
    </div>
  );
}

export default Information;
