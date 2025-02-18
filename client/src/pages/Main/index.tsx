import Footer from '@/components/molecules/Footer';
import styles from './index.module.scss';
import ElectionMainTemplate from '@/components/templates/ElectionMainTemplate';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useElectionSession } from '@/services/hooks/useElectionSession';
import { useElectionStore } from '@/stores/election';
import { useEffect } from 'react';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';

function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const { election_id } = useParams() as { election_id: string };
  const { data, isLoading } = useElectionSession(
    Number(election_id) || 0,
    location.search
  );

  const { setElection } = useElectionStore();

  // 자연수가 아닌 이상한 문자로 오는 경우 돌려보냄
  useEffect(() => {
    if (Number.isNaN(Number(election_id))) {
      navigate('/elections/list');
    }
  }, [election_id, navigate]);

  useEffect(() => {
    if (data) {
      const now = new Date();
      if (!data.isHost && now.getTime() > new Date(data.endTime).getTime()) {
        navigate(`/elections/${election_id}/final`);
      }
      if (data.hasVoted) {
        navigate('/elections/list');
      }
      setElection(data);
    }
  }, [data]);

  if (isLoading)
    return (
      <div className={styles.loading}>
        <LoadingSpinner />
      </div>
    );
  return (
    <div className={styles['election-main']}>
      <ElectionMainTemplate />
      <Footer />
    </div>
  );
}

export default Main;
