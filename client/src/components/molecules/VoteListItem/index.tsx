import React from 'react';
import styles from './index.module.scss';

interface VoteListItemProps {
  title: string;
  position: string;
  status: '후보지정' | '투표진행중' | '투표완료';
  onClose?: () => void;
  onClick?: () => void;
}

export const VoteListItem: React.FC<VoteListItemProps> = ({
  title,
  position,
  status,
  onClose,
  onClick,
}) => {
  return (
    <div className={styles.voteListItem} onClick={onClick}>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.position}>{position}</div>
      </div>
      <div className={styles.actions}>
        <div className={styles.status}>{status}</div>
        {onClose && (
          <button
            className={styles.close}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            X
          </button>
        )}
      </div>
    </div>
  );
};
