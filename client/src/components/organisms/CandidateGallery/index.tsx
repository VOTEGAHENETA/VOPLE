import RoleNameTag from '@/components/molecules/RoleNameTag';
import styles from './index.module.scss';
import CandidateChoice from '@/components/molecules/CandidateChoice';
import { useState } from 'react';
import { CandidateSessionData } from '@/types/voteSession';

interface Props {
  info: CandidateSessionData;
  onClick?: (isSelected: boolean) => void;
}

function CandidateGallery({ info, onClick }: Props) {
  // 선거별로 후보자가 선택될 때 마다 변경되는 state, 초기 값 = null
  const [selectedCandidate, setSelectedCandidate] = useState<{
    [voteId: number]: number | null;
  }>({});

  const chooseCandidate = (votedId: number, candidateId: number) => {
    // onClick event 발생 시 voteId 객체에 단일 value candidateId를 mapping
    setSelectedCandidate((prev) => ({ ...prev, [votedId]: candidateId }));
    onClick?.(true);
    console.log(votedId);
  };

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
            {vote.voteTeams[0].candidates.map((candidate) => (
              <CandidateChoice
                key={candidate.candidateId}
                username={candidate.userName}
                poster={candidate.poster}
                // UI적으로 데이터를 넘겨주기 위한 props 추가
                selected={
                  selectedCandidate[vote.voteId] === candidate.candidateId
                }
                onClick={() =>
                  chooseCandidate(vote.voteId, candidate.candidateId)
                }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CandidateGallery;
