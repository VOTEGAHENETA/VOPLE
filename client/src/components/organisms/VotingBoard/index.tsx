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
  const voteData = info.voteFindDto;
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
          // 해당 선거에서 후보가 선택되었으면 선택된 후보의 userName을 사용하고,
          // 선택되지 않았다면 기본값(예: voteTeams[0].candidates[0]의 userName)을 사용
          const candidateUserName = selectedCandidates[vote.voteId]
            ? selectedCandidates[vote.voteId]!.userName
            : undefined;
          return (
            <div key={vote.voteId} className={styles.tag}>
              <RoleNameTag
                voteId={vote.voteId}
                voteName={vote.voteName}
                username={candidateUserName}
                showUsername={true}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VotingBoard;
