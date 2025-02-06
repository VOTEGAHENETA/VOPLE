import styles from './index.module.scss';
import ElectionMainTemplate from '@/components/templates/ElectionMainTemplate';

function Main() {
  return (
    <div className={styles['election-main']}>
      <ElectionMainTemplate />
    </div>
  );
}

export default Main;
