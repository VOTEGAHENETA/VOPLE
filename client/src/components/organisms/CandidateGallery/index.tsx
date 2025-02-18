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
              {vote.voteTeams.map((team) => {
                // 러닝 메이트 여부 확인 - 후보자가 2명 이상인 경우
                const isRunningMate =
                  team.candidates && team.candidates.length > 1;

                if (isRunningMate) {
                  // 러닝 메이트인 경우 - 모든 후보자의 이름을 표시하되 포스터는 하나만 사용
                  return (
                    <div
                      key={team.voteTeamId}
                      className={styles.runningMateContainer}
                    >
                      <CandidateChoice
                        key={`${team.voteTeamId}-poster`}
                        username={team.candidates
                          .map((c) => c.userName)
                          .join(' & ')}
                        poster={team.poster}
                        selected={
                          selectedCandidates[vote.voteId] &&
                          team.candidates.some(
                            (c) =>
                              c.candidateId ===
                              selectedCandidates[vote.voteId]?.candidateId
                          )
                        }
                        onClick={() => {
                          // 첫 번째 후보자를 대표로 선택
                          if (team.candidates.length > 0) {
                            chooseCandidate(vote.voteId, team.candidates[0]);
                          }
                        }}
                      />
                    </div>
                  );
                } else {
                  // 러닝 메이트가 아닌 경우 - 한 명의 후보자만 표시
                  const singleCandidate =
                    team.candidates && team.candidates.length > 0
                      ? team.candidates[0]
                      : null;

                  return singleCandidate ? (
                    <CandidateChoice
                      key={`${team.voteTeamId}-${singleCandidate.candidateId}`}
                      username={singleCandidate.userName}
                      poster={team.poster}
                      selected={
                        selectedCandidates[vote.voteId]?.candidateId ===
                        singleCandidate.candidateId
                      }
                      onClick={() =>
                        chooseCandidate(vote.voteId, singleCandidate)
                      }
                    />
                  ) : null;
                }
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CandidateGallery;
