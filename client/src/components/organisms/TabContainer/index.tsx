import { useState, memo } from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
import BaseButton from '@/components/atoms/BaseButton';
import ChatBoard from '../ChatBoard';
import PledgeTab from './PledgeTab';
import PosterTab from './PosterTab';

//  Mock-Data (samplePoster, MOCK_PLEDGES)
import SAMPLE_POSTER from '@/assets/sample/sample.png';
// import { useCandidateInfo } from '@/services/hooks/useCandidateInfo';
// import { useParams } from 'react-router-dom';
// import IconButton from '@/components/atoms/IconButton';

const MOCK_PLEDGES = [
  '학생 자치회 예산 50% 증액 및 투명한 예산 사용 보고 시스템 도입',
  '교내 카페테리아 운영시간 연장 및 메뉴 다양화 추진',
  '분기별 학생-교사 간담회 정례화로 소통 강화',
  '동아리실 시설 개선 및 신규 동아리 설립 지원 확대',
  '교내 휴게공간 확충 및 현대화 사업 추진',
];

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
  userId: number;
  sessionId: number;
  voteTeamId?: number;
};
const MemoizedChatBoard = memo(ChatBoard);

export default function TabContainer({
  type = 'team',
  theme = 'dark',
  userId,
  sessionId,
  voteTeamId,
}: TabContainerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('chat');
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
            userId={userId}
            voteTeamId={voteTeamId}
          />
        </div>
        {activeTab === 'notice' && <PledgeTab pledges={MOCK_PLEDGES} />}
        {activeTab === 'poster' && <PosterTab imageSrc={SAMPLE_POSTER} />}
      </div>
    </div>
  );
}
