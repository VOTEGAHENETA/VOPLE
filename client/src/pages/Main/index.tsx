import Footer from '@/components/molecules/Footer';
import styles from './index.module.scss';
import ElectionMainTemplate from '@/components/templates/ElectionMainTemplate';
import { useParams } from 'react-router-dom';
import { useElectionSession } from '@/services/hooks/useElectionSession';
import { useElectionStore } from '@/stores/election';
import { useEffect } from 'react';

function Main() {
  const { election_id } = useParams() as { election_id: string };
  const { data, isLoading } = useElectionSession(Number(election_id));
  const { setElection } = useElectionStore();
  useEffect(() => {
    if (data) setElection(data);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className={styles['election-main']}>
      <ElectionMainTemplate />
      <Footer />
    </div>
  );
}

export default Main;
