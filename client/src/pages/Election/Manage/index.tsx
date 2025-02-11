import ElectionDetailTemplate from '@/components/templates/ElectionDetailTemplate';
import styles from './index.module.scss';

function Manage() {
  return (
    <div className={styles['detail-page']}>
      <ElectionDetailTemplate />
    </div>
  );
}

export default Manage;
