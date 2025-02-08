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
  const voteData = info.voteFindDto;

  return (
    <div className={styles.main}>
      {voteData.map((vote) => (
        <div key={vote.voteId} className={styles.tag}>
          <RoleNameTag
            voteId={vote.voteId}
            voteName={vote.voteName}
            showUsername={false}
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
      ))}
    </div>
  );
}

export default CandidateGallery;
