import styles from './index.module.scss';
import Text from '@/components/atoms/Text';
import IconFlower from '@/assets/icons/IconFlower';
import MainCandidateList from '@/components/organisms/MainCandidateList';
import Turnout from './Turnout';
import { useElectionStore } from '@/stores/election';

function ElectionMainTemplate() {
  const { election } = useElectionStore();

  return (
    <div className={styles['election']}>
      <div className={styles['election-container']}>
        <div className={styles['main-title']}>
          <div className={styles['main-title-text']}>
            <Text size='sm' color='#7c7c7c'>
              나의 한 표로 바뀌는 우리 학교
            </Text>
            <Text size='xl' color='#333333' weight='bold'>
              {election?.sessionName || '선거 정보를 불러오는 중...'}
            </Text>
          </div>
          <div className={styles['main-title-img']}>
            <IconFlower size={80} color='#F2B705' />
            <IconFlower size={30} color='#04BFAD' />
          </div>
        </div>
        <div className={styles['main-contents']}>
          <div className={styles['main-contents-text']}>
            <Text size='m' color='var(--color-main-orange)' weight='bold'>
              후보 리스트
            </Text>
            <Text size='xl' color='var(--color-black)' weight='bold'>
              내가 선택할 후보는?
            </Text>
          </div>
          {election?.voteResults?.map((vote, index) => {
            vote.teamResults.sort(() => Math.random() - 0.5);
            return (
              <MainCandidateList
                key={vote.voteId}
                sessionId={election.sessionId}
                vote={vote}
                index={index}
              />
            );
          })}
        </div>
        {election?.voteResults && election?.voteResults.length > 0 && (
          <Turnout election={election} />
        )}
      </div>
    </div>
  );
}

export default ElectionMainTemplate;
