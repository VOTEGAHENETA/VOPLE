import Result from '@/components/organisms/Result';
import ResultChatContainer from '@/components/organisms/ResultChatContainer';
import styles from './index.module.scss';

const ResultCurrentTemplate = () => {
  return (
    <div className={styles.result__container}>
      <Result />
      <ResultChatContainer sessionId={1} userId={1} />
    </div>
  );
};

export default ResultCurrentTemplate;
