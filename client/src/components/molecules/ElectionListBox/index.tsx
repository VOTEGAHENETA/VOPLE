import styles from './index.module.scss';
import ElectionListItem from '@/components/molecules/ElectionListItem';
import { useNavigate } from 'react-router-dom';
import { ElectionListProps } from '@/types/election';

/**
 * # ElectionListProps
    id: number;
    title: string;
    startDate?: string;
    endDate?: string;
    status?: 'participating' | 'created';
    isClosed?: boolean;
    onMenuClick?: () => void;
 */

interface ElectionListBoxProps {
  status: 'created' | 'participating';
  elections: ElectionListProps[];
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
  status,
  elections, // user_type(CANDIDATE or VOTER)에 따라 분류되어 부모에서 받음
}: ElectionListBoxProps) {
  // CONTENT 타입 정의에 따른 headerStyle, title, emptyText
  const navigate = useNavigate();
  const contentConfig = CONTENT_CONFIG[status];

  const onCreateClick = () => {
    navigate('/elections/create');
  };
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
        {status === 'created' && (
          <button onClick={onCreateClick} className={styles.createButton}>
            선거 만들기 →
          </button>
        )}
      </div>
    </div>
  );
}

export default ElectionListBox;
