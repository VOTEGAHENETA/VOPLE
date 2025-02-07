import styles from './index.module.scss';
import Text from '@/components/atoms/Text';

interface Props {
  candidateStatement: string;
}

function Introduction({ candidateStatement }: Props) {
  return (
    <div className={styles.introduction}>
      <Text size='xs' weight='normal' color='#000000'>
        {candidateStatement}
      </Text>
    </div>
  );
}

export default Introduction;
