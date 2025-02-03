import React from 'react';
import styles from './index.module.scss';
import IconButton from '@/components/atoms/IconButton';
import Text from '@/components/atoms/Text';

interface ElectionListItemProps {
  title: string;
  startDate?: string;
  endDate?: string;
  status?: 'participating' | 'created';
  isClosed?: boolean;
  onItemClick?: () => void;
  onResultClick?: () => void;
  onMenuClick?: () => void;
}

const ElectionListItem: React.FC<ElectionListItemProps> = ({
  title = '선거 제목입니다.',
  startDate = '2025.01.20',
  endDate = '2025.01.25',
  status = 'participating',
  isClosed = false,
  onItemClick,
  onResultClick,
  onMenuClick,
}) => {
  const formatPeriod = (start: string, end: string) => {
    return `${start} ~ ${end}`;
  };

  const renderContent = () => {
    const commonLeftContent = (
      <div className={styles.leftContent}>
        <div className={styles.title__wrap}>
          {isClosed && (
            <Text
              className={styles.closedBadge}
              size='sm'
              weight='bold'
              color='var(--color-main-pink)'
            >
              마감
            </Text>
          )}
          <Text
            className={styles.title}
            size='sm'
            weight='bold'
            color='var(--color-black)'
          >
            {title}
          </Text>
        </div>
        <p className={styles.period}>{formatPeriod(startDate, endDate)}</p>
      </div>
    );

    switch (status) {
      case 'created':
        return (
          <div className={styles.container}>
            {commonLeftContent}
            <IconButton
              className={styles.menuButton}
              name='dots'
              onClick={onMenuClick}
            />
          </div>
        );

      case 'participating':
        return (
          <div className={styles.container} onClick={onItemClick}>
            {commonLeftContent}
            {isClosed ? (
              <button
                className={styles.resultButton}
                onClick={(e) => {
                  e.stopPropagation();
                  onResultClick?.();
                }}
              >
                결과 확인
              </button>
            ) : (
              <IconButton className={styles.rotate} name='left' />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return renderContent();
};

export default ElectionListItem;
