import Text from '../Text';
import styles from './index.module.scss';

export interface TextCounterProps {
  currentLength: number;
  maxLength: number;
}

export function TextCounter({ currentLength, maxLength }: TextCounterProps) {
  return (
    <div className={styles.textCounter}>
      <Text size='xs' color='var(--color-gray-main)'>
        {currentLength}/{maxLength}
      </Text>
    </div>
  );
}

export default TextCounter;
