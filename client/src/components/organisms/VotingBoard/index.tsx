import RoleNameTag from '@/components/molecules/RoleNameTag';
import Text from '@/components/atoms/Text';
import styles from './index.module.scss';
import { CandidateSessionData } from '@/types/voteSession';

interface Props {
  info: CandidateSessionData;
  // 각 선거에 대해 선택된 후보 정보를 전달받습니다.
  selectedCandidates: {
    [voteId: number]: { candidateId: number; userName: string } | undefined;
  };
}

function VotingBoard({ info, selectedCandidates }: Props) {
  const voteData = info.voteFindDtos;
  // voteData를 voteId 기준 오름차순으로 정렬 (가장 낮은 아이디가 1위)
  const sortedVotes = [...voteData].sort((a, b) => a.voteId - b.voteId);

  return (
    <div className={styles.board}>
      <Text size='xs' weight='bold' color='#777777'>
        {info.sessionName}
      </Text>
      <div className={styles.title}>
        <Text size='lg' weight='bold' color='#000000' className={styles.text}>
          이번 선거의 주인공은 누구?!
        </Text>
      </div>
      <div className={styles.tag}>
        {voteData.map((vote) => {
          // 선택된 후보의 username 추출 (선택되지 않았다면 undefined)
          const candidateUserName = selectedCandidates[vote.voteId]
            ? selectedCandidates[vote.voteId]!.userName
            : undefined;
          // 정렬된 배열에서 해당 vote의 인덱스를 통해 순위를 산출 (1부터 시작)
          const rank =
            sortedVotes.findIndex((v) => v.voteId === vote.voteId) + 1;

          return (
            <div key={vote.voteId} className={styles.tag}>
              <RoleNameTag
                voteId={vote.voteId}
                voteName={vote.voteName}
                username={candidateUserName}
                showUsername={true}
                rank={rank}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VotingBoard;
