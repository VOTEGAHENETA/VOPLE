import { useFinalResult } from '@/services/hooks/useFinalResult';
import styles from './index.module.scss';
import Text from '@/components/atoms/Text';
import Poster from '@/components/atoms/Poster';

const FinalResult = () => {
  const sessionId = 1;
  const {
    data = {
      electedList: [],
    },
  } = useFinalResult(sessionId);

  console.log(data);
  return (
    <div className={styles.container}>
      <div className={styles.celebrate}>
        <Text size='s' weight='bold' color='#F58420'>
          대망의 당선자
        </Text>
        <Text size='lg' weight='bold' color='#333333'>
          당선을 축하합니다~🎉
        </Text>
      </div>
      <div className={styles.userInfo}>
        {data.electedList.map((result, outerIdx) =>
          result.candidateResults.map((candidate, innerIdx) => (
            <div key={`${outerIdx}-${innerIdx}`} className={styles.candidate}>
              <Poster size='xs' src={result.poster} />
              {candidate.userName}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FinalResult;
