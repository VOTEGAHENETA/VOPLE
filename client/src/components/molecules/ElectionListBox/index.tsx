import styles from './index.module.scss';
import ElectionListItem from '@/components/molecules/ElectionListItem';

interface Election {
  id: string;
  title: string;
  startDate?: string;
  endDate?: string;
  status?: 'participating' | 'created';
  isClosed?: boolean;
  onItemClick?: () => void;
  onResultClick?: () => void;
  onMenuClick?: () => void;
}

interface ElectionListBoxProps {
  type: 'created' | 'participating';
  elections: Election[];
  onCreateElection?: () => void;
  emptyText?: string;
}

export function ElectionListBox({
  type,
  elections,
  onCreateElection,
  emptyText = '현재 선거가 없습니다.',
}: ElectionListBoxProps) {
  const getHeaderStyle = () => {
    return type === 'created'
      ? styles.headerCreated
      : styles.headerParticipating;
  };

  const getHeaderText = () => {
    return type === 'created' ? '내가 만든 선거' : '참여하고 있는 선거';
  };

  return (
    <div className={styles.container}>
      <div className={getHeaderStyle()}>
        <h2 className={styles.title}>{getHeaderText()}</h2>
      </div>

      <div className={styles.content}>
        {elections.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>{emptyText}</p>
            {type === 'created' && onCreateElection && (
              <button
                onClick={onCreateElection}
                className={styles.createButton}
              >
                선거 만들기 →
              </button>
            )}
          </div>
        ) : (
          <div className={styles.listContainer}>
            {elections.map((election) => (
              <ElectionListItem key={election.id} title={election.title} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ElectionListBox;
