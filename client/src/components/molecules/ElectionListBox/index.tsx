import styles from './index.module.scss';
import ElectionListItem from '@/components/molecules/ElectionListItem';
// import { useNavigate } from 'react-router-dom';

interface Election {
  // id: bigint; // 서버에서 long type으로 넘어오므로, 추후 전반 수정 필요
  id: string;
  title: string;
  startDate?: string;
  endDate?: string;
  status?: 'participating' | 'created';
  isClosed?: boolean;
  // onItemClick?: () => void;
  // onResultClick?: () => void;
  onMenuClick?: () => void;
}

interface ElectionListBoxProps {
  type: 'created' | 'participating';
  elections: Election[];
  onCreateClick?: () => void; // 임시(스토리북 오류 해결, 추후 Router로 변경 필요)
}

const CONTENT_CONFIG = {
  created: {
    headerStyle: styles.headerCreated,
    title: '내가 만든 선거',
    emptyText: '참여 중인 선거가 없습니다.',
  },
  participating: {
    headerStyle: styles.headerParticipating,
    title: '참여하고 있는 선거',
    emptyText: '만든 선거가 없습니다.',
  },
} as const;

export function ElectionListBox({
  type,
  elections, // user_type(CANDIDATE or VOTER)에 따라 분류되어 부모에서 받음
  onCreateClick, // 임시(스토리북 오류 해결, 추후 Router로로 변경 필요)
}: ElectionListBoxProps) {
  // CONTENT 타입 정의에 따른 headerStyle, title, emptyText
  // const navigate = useNavigate();
  const contentConfig = CONTENT_CONFIG[type];

  // const handleCreateClick = () => {
  //   navigate('/elections/create');
  // };
  return (
    <div className={styles.container}>
      <div className={contentConfig.headerStyle}>
        <h2 className={styles.title}>{contentConfig.title}</h2>
      </div>

      <div className={styles.content}>
        {elections.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>{contentConfig.emptyText}</p>
          </div>
        ) : (
          <div className={styles.listContainer}>
            {elections.map((election) => (
              <ElectionListItem
                key={election.id}
                id={election.id}
                title={election.title}
              />
            ))}
          </div>
        )}
        {type === 'created' && (
          <button onClick={onCreateClick} className={styles.createButton}>
            선거 만들기 →
          </button>
        )}
      </div>
    </div>
  );
}

export default ElectionListBox;
