import { useState } from 'react';
import styles from './index.module.scss';
import VotingBoard from '@/components/organisms/VotingBoard';
import CandidateGallery from '@/components/organisms/CandidateGallery';
import { CandidateSessionData } from '@/types/voteSession';
import sample from '@/assets/sample/sample.png';
import BaseButton from '@/components/atoms/BaseButton';
import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';

const info: CandidateSessionData = {
  sessionId: 12,
  sessionName: '제 12대 싸피 회장선거',
  voteFindDto: [
    {
      voteId: 1,
      voteName: '회장 선거',
      voteTeams: [
        {
          voteTeamId: 1,
          poster: sample,
          candidates: [
            {
              candidateId: 101,
              userId: 1001,
              userName: '홍길동',
            },
          ],
        },
        {
          voteTeamId: 2,
          poster: sample,
          candidates: [
            {
              candidateId: 102,
              userId: 1002,
              userName: '김민희',
            },
          ],
        },
        {
          voteTeamId: 3,
          poster: sample,
          candidates: [
            {
              candidateId: 103,
              userId: 1003,
              userName: '이영희',
            },
          ],
        },
        {
          voteTeamId: 4,
          poster: sample,
          candidates: [
            {
              candidateId: 104,
              userId: 1004,
              userName: '박지훈',
            },
          ],
        },
      ],
    },
    {
      voteId: 2,
      voteName: '부회장 선거',
      voteTeams: [
        {
          voteTeamId: 1,
          poster: sample,
          candidates: [
            {
              candidateId: 201,
              userId: 2001,
              userName: '김준호',
            },
          ],
        },
        {
          voteTeamId: 2,
          poster: sample,
          candidates: [
            {
              candidateId: 202,
              userId: 2002,
              userName: '이수민',
            },
          ],
        },
        {
          voteTeamId: 3,
          poster: sample,
          candidates: [
            {
              candidateId: 203,
              userId: 2003,
              userName: '유지민민',
            },
          ],
        },
        {
          voteTeamId: 4,
          poster: sample,
          candidates: [
            {
              candidateId: 204,
              userId: 2004,
              userName: '박지은',
            },
          ],
        },
      ],
    },
  ],
};

function VoteTemplate() {
  // 각 선거에 대해 선택된 후보 정보를 저장.
  const [selectedCandidates, setSelectedCandidates] = useState<{
    [voteId: number]: { candidateId: number; userName: string } | undefined;
  }>({});

  // 후보 선택 시 호출되는 함수
  const chooseCandidate = (
    voteId: number,
    candidate: { candidateId: number; userName: string }
  ) => {
    setSelectedCandidates((prev) => ({ ...prev, [voteId]: candidate }));
  };

  return (
    <div className={styles.vote}>
      {/* VotingBoard에 선택된 후보 정보를 전달 */}
      <VotingBoard info={info} selectedCandidates={selectedCandidates} />
      <div className={styles.gallery}>
        {/* CandidateGallery에 선택 함수와 선택 상태 전달 */}
        <CandidateGallery
          info={info}
          chooseCandidate={chooseCandidate}
          selectedCandidates={selectedCandidates}
        />
      </div>
      <div className={styles.btn}>
        <div className={styles.canceled}>
          <BaseButton
            kind='base'
            status={BASE_BUTTON_STATUS.OUTLINE}
            type='button'
          >
            취소
          </BaseButton>
        </div>
        <div className={styles.one}>
          <BaseButton
            kind='base'
            status={BASE_BUTTON_STATUS.FILL}
            type='button'
          >
            소중한 한표
          </BaseButton>
        </div>
      </div>
    </div>
  );
}

export default VoteTemplate;
