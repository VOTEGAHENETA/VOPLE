import styles from './index.module.scss';
import Result from '@/components/organisms/WaitResult';
import FinalResult from '@/components/organisms/FinalResult';
import people from '@/assets/icons/people.svg';
import crown from '@/assets/icons/3dcrown.svg';
import Text from '@/components/atoms/Text';
import { getFinalResult } from '@/services/election';
import { useEffect, useState } from 'react';
import { ElectionResult } from '@/types/final';
import { useParams } from 'react-router-dom';
import { convertUTCToKST } from '@/utils/date';
import { VoteResultsResponse } from '@/types/voteSession';

function FinalTemplate() {
  const { election_id } = useParams<{ election_id: string }>();
  const sessionId = Number(election_id);
  const [finalData, setFinalData] = useState<ElectionResult | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const finalResponse = await getFinalResult(sessionId);
        setFinalData(finalResponse);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [sessionId]);

  const formatDateTime = (isoString: string): string => {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  if (!finalData) {
    return null;
  }

  const transformToCurrentData = (
    finalData: ElectionResult
  ): VoteResultsResponse => {
    return {
      sessionName: finalData.electionSessionDto.sessionName,
      wholeVoterPercent: finalData.wholeVoterPercent,
      endDate: convertUTCToKST(
        new Date(finalData.electionSessionDto.voteEndTime)
      ),
      voteResults: finalData.voteFinalResults.map((voteFinalResult) => ({
        voteId: voteFinalResult.voteId,
        voteName: voteFinalResult.voteName,
        teamResults: voteFinalResult.teamResults.map((teamResult) => ({
          teamId: teamResult.teamId,
          prefix: teamResult.prefix,
          pollCnt: teamResult.pollCnt,
          voteCandidateDtos: teamResult.voteCandidateDtos,
          poster: teamResult.poster,
          candidate_statement: teamResult.candidate_statement,
          teamVotePercent: teamResult.teamVotePercent,
          isStreaming: false,
        })),
      })),
    };
  };

  const currentData = transformToCurrentData(finalData);

  return (
    <div className={styles.container}>
      <div className={styles.background} />
      <div className={styles.main}>
        <div className={styles.head}>
          <div className={styles.voteInfo}>
            <img src={people} alt='' />
            <div className={styles.sessionInfo}>
              <Text size='m' weight='bold' color='#111111'>
                {finalData.electionSessionDto?.sessionName}
              </Text>
              <Text size='s' weight='normal' color='#333333'>
                {formatDateTime(finalData.electionSessionDto?.voteStartTime)} ~{' '}
                {formatDateTime(finalData.electionSessionDto?.voteEndTime)}
              </Text>
            </div>
          </div>
          <div className={styles.result}>
            <div className={styles.text}>
              <Text size='sm' weight='bold' color='#F58420'>
                투표 결과
              </Text>
              <Text size='lg' weight='bold' color='#333333'>
                모두의 한표, 과연 결과는?!
              </Text>
            </div>
          </div>
          <div className={styles.content}>
            <img src={crown} className={styles.crown} />
            <FinalResult finalData={finalData} />
            <Result
              currentData={currentData}
              sessionId={sessionId}
              showSessionName={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinalTemplate;
