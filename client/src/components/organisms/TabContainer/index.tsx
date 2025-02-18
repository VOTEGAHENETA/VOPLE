import { useState, memo, useEffect } from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
import BaseButton from '@/components/atoms/BaseButton';
import ChatBoard from '../ChatBoard';
import PledgeTab from './PledgeTab';
import PosterTab from './PosterTab';
import { getVoteTeamInfo } from '@/services/candidate';
import { LiveTeamInfoResponse } from '@/types/user';

//  Mock-Data (samplePoster, MOCK_PLEDGES)
// import { useCandidateInfo } from '@/services/hooks/useCandidateInfo';
// import { useParams } from 'react-router-dom';
// import IconButton from '@/components/atoms/IconButton';

// import SAMPLE_POSTER from '@/assets/sample/sample.png';
// const MOCK_PLEDGES = [
//   '학생 자치회 예산 50% 증액 및 투명한 예산 사용 보고 시스템 도입',
//   '교내 카페테리아 운영시간 연장 및 메뉴 다양화 추진',
//   '분기별 학생-교사 간담회 정례화로 소통 강화',
//   '동아리실 시설 개선 및 신규 동아리 설립 지원 확대',
//   '교내 휴게공간 확충 및 현대화 사업 추진',
// ];

type TabType = 'chat' | 'notice' | 'poster';

interface TabInfo {
  type: TabType;
  label: string;
}

const TABS: TabInfo[] = [
  { type: 'chat', label: '채팅방' },
  { type: 'notice', label: '공약' },
  { type: 'poster', label: '포스터' },
];

type ThemeType = 'dark' | 'light';
type ChatType = 'session' | 'team';

type TabContainerProps = {
  type: ChatType;
  theme: ThemeType;
  sessionId: number;
  voteTeamId?: number;
};

const MemoizedChatBoard = memo(ChatBoard);

export default function TabContainer({
  type = 'team',
  theme = 'dark',
  sessionId,
  voteTeamId,
}: TabContainerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [teamInfo, setTeamInfo] = useState<LiveTeamInfoResponse | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('chat');

  useEffect(() => {
    const fetchTeamInfo = async () => {
      if (!voteTeamId) return;

      setIsLoading(true);
      try {
        const response = await getVoteTeamInfo(voteTeamId);

        // API 응답 구조에 맞게 데이터 처리
        setTeamInfo({
          pledges: response.pledges || [],
          poster: response.poster || '',
          // 기타 필요한 데이터 매핑
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : '팀 정보를 불러오는데 실패했습니다.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamInfo();
  }, [voteTeamId]);

  // 슬라이드 상태 추가
  // const [isSlideDown, setIsSlideDown] = useState(false);

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  // 슬라이드 토글 함수 추가
  // const toggleSlide = () => {
  //   setIsSlideDown((prev) => !prev);
  // };

  // 쿼리 훅
  // const { session_id, user_id } = useParams();
  // const { session_id, user_id } = useParams();

  // const { data, error } = useCandidateInfo(sessionId, userId);

  // 로딩 상태 처리
  if (isLoading) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  // 에러 상태 처리
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div
      className={clsx(
        styles.container,
        'global-container'
        //   {
        //   [styles.slideDown]: isSlideDown,
        // }
      )}
    >
      {/* <IconButton
        name='leftLongWhite'
        className={styles.slideButton}
        onClick={toggleSlide}
      /> */}
      <div className={styles.tabNavigator}>
        <div className={styles.tabMenu}>
          {TABS.map(({ type, label }) => (
            <BaseButton
              key={type}
              kind='chip'
              status='fill'
              type='button'
              customClass={clsx(styles.tabButton, {
                [styles.active]: activeTab === type,
              })}
              onClick={() => handleTabClick(type)}
            >
              {label}
            </BaseButton>
          ))}
        </div>
      </div>
      <div className={styles.tabContent}>
        {/* 탭 변경 시 채팅만 리렌더링 되지 않도록 설정*/}
        <div style={{ display: activeTab === 'chat' ? 'block' : 'none' }}>
          <MemoizedChatBoard
            sessionId={sessionId}
            theme={theme}
            type={type}
            voteTeamId={voteTeamId}
          />
        </div>
        {activeTab === 'notice' && <PledgeTab pledges={teamInfo?.pledges} />}
        {activeTab === 'poster' && <PosterTab imageSrc={teamInfo?.poster} />}
      </div>
    </div>
  );
}
