import styles from './index.module.scss';
import Text from '@/components/atoms/Text';
// import { useQuery } from '@tanstack/react-query';
// import { useParams } from 'react-router-dom';
// import { getElection } from '@/services/election';
import {
  TeamResult,
  VoteCandidate,
  VoteResult,
  VoteSession,
} from '@/types/election';
import sample from '@/assets/sample/sample.png';
import IconFlower from '@/assets/icons/IconFlower';
import MainCandidateList from '@/components/organisms/MainCandidateList';
import Turnout from './Turnout';

const candidates1: VoteCandidate[] = [
  {
    candidateId: 1,
    userId: 1,
    userName: '이은빈',
  },
  {
    candidateId: 1,
    userId: 2,
    userName: '이은빈',
  },
];
const candidates2: VoteCandidate[] = [
  {
    candidateId: 1,
    userId: 1,
    userName: '이은빈',
  },
];

const candidates3: VoteCandidate[] = [
  {
    candidateId: 1,
    userId: 1,
    userName: '이은빈',
  },
];

const teams: TeamResult[] = [
  {
    teamId: 1231,
    prefix: '신용 1등급',
    pollCnt: 123,
    voteCandidateDtos: candidates1,
    poster: sample,
    candidateStatement: `😎 ENFJ
❤️ 독서, 음악감상
👌 고민상담 환영
🎤 Youtube 채널명: 2은빈
sd
sd
sd
sd
@ leeeunbin`,
    teamVotePercent: 45,
  },
  {
    teamId: 1232,
    prefix: '신용 2등급',
    pollCnt: 123,
    voteCandidateDtos: candidates2,
    poster: '',
    candidateStatement: `😎 ENFJ
❤️ 독서, 음악감상
👌 고민상담 환영
🎤 Youtube 채널명: 1은빈
@ leeeunbi123n`,
    teamVotePercent: 45,
  },
  {
    teamId: 1233,
    prefix: '신용 3등급과 33등급',
    pollCnt: 123,
    voteCandidateDtos: candidates3,
    poster: '',
    candidateStatement: `😎 ENFJ
❤️ 독서, 음악감상
👌 고민상담 환영
🎤 Youtube 채널명: 3은빈
@ leeeu123nbin`,
    teamVotePercent: 45,
  },
];

const votes: VoteResult[] = [
  {
    voteId: 1,
    voteName: '회장',
    teamResults: teams,
  },
  {
    voteId: 2,
    voteName: '부회장',
    teamResults: teams,
  },
];

const electionData: VoteSession = {
  sessionId: 1,
  sessionName: '제 12대 학생회장 선거',
  voteStatus: 'isAfter',
  voteResults: votes,
  wholeVoterPercent: 67,
};

function ElectionMainTemplate() {
  //   const { election_id } = useParams();
  //   const { data, isLoading } = useQuery({
  //     queryKey: ['election', election_id],
  //     queryFn: () => getElection(election_id!),
  //   });

  //   if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles['election']}>
      <div className={styles['election-container']}>
        <div className={styles['main-title']}>
          <div className={styles['main-title-text']}>
            <Text size='sm' color='#7c7c7c'>
              나의 한 표로 바뀌는 우리 학교
            </Text>
            <Text size='xl' color='#333333' weight='bold'>
              {electionData.sessionName}
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
          {electionData.voteResults.map((vote) => {
            vote.teamResults.sort(() => Math.random() - 0.5);
            return <MainCandidateList key={vote.voteId} vote={vote} />;
          })}
        </div>
        <Turnout data={electionData} />
      </div>
    </div>
  );
}

export default ElectionMainTemplate;
