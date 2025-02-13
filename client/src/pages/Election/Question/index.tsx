import QuestionSection from '@/components/organisms/QuestionSection';
import styles from './index.module.scss';

function Question() {
  return (
    <div className={styles['question-background']}>
      <QuestionSection />
    </div>
  );
}

export default Question;
