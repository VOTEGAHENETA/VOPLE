import Footer from '@/components/molecules/Footer';
import styles from './index.module.scss';
import ElectionMainTemplate from '@/components/templates/ElectionMainTemplate';

function Main() {
  return (
    <div className={styles['election-main']}>
      <ElectionMainTemplate />
      <Footer />
    </div>
  );
}

export default Main;
