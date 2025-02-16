import RoleNameTag from '@/components/molecules/RoleNameTag';
import styles from './index.module.scss';
import CandidateChoice from '@/components/molecules/CandidateChoice';
import { CandidateSessionData } from '@/types/voteSession';

interface Props {
  info: CandidateSessionData;
  chooseCandidate: (
    voteId: number,
    candidate: { candidateId: number; userName: string }
  ) => void;
  selectedCandidates: {
    [voteId: number]: { candidateId: number; userName: string } | undefined;
  };
}

function CandidateGallery({
  info,
  chooseCandidate,
  selectedCandidates,
}: Props) {
  const voteData = info.voteFindDtos;
  // voteData를 voteId 기준으로 오름차순 정렬
  const sortedVotes = [...voteData].sort((a, b) => a.voteId - b.voteId);

  return (
    <div className={styles.main}>
      {voteData.map((vote) => {
        // 정렬된 배열에서 해당 vote의 인덱스를 찾아 순위(1부터 시작)로 설정
        const rank = sortedVotes.findIndex((v) => v.voteId === vote.voteId) + 1;

        return (
          <div key={vote.voteId} className={styles.tag}>
            <RoleNameTag
              voteId={vote.voteId}
              voteName={vote.voteName}
              showUsername={false}
              rank={rank}
            />
            <div className={styles.candidateList}>
              {vote.voteTeams.map((team) =>
                team.candidates.map((candidate) => (
                  <CandidateChoice
                    key={`${team.voteTeamId}-${candidate.candidateId}`}
                    username={candidate.userName}
                    poster={team.poster}
                    selected={
                      selectedCandidates[vote.voteId]?.candidateId ===
                      candidate.candidateId
                    }
                    onClick={() => chooseCandidate(vote.voteId, candidate)}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CandidateGallery;
