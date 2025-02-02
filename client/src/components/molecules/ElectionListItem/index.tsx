// ElectionListItem.tsx
import React from 'react';
import styles from './index.module.scss';
import IconButton from '@/components/atoms/IconButton';
import Text from '@/components/atoms/Text';

interface ElectionListItemProps {
  title: string;
  startDate: string;
  endDate: string;
  status?: 'participating' | 'closed' | 'created';
  onItemClick?: () => void;
  onResultClick?: () => void;
  onMenuClick?: () => void;
}

const ElectionListItem: React.FC<ElectionListItemProps> = ({
  title,
  startDate = '2025.01.20',
  endDate = '2025.01.25',
  status = 'participating',
  onItemClick,
  onResultClick,
  onMenuClick,
}) => {
  const formatPeriod = (start: string, end: string) => {
    return `${start} ~ ${end}`;
  };

  const renderContent = () => {
    switch (status) {
      case 'closed':
        return (
          <div className={styles.container} onClick={onItemClick}>
            <div className={styles.leftContent}>
              <div className={styles.title__wrap}>
                <Text
                  className={styles.closedBadge}
                  size='m'
                  weight='bold'
                  color='var(--color-main-pink)'
                >
                  마감
                </Text>
                <Text
                  className={styles.title}
                  size='m'
                  weight='bold'
                  color='var(--color-black)'
                >
                  {title}
                </Text>
              </div>
              <p className={styles.period}>
                {formatPeriod(startDate, endDate)}
              </p>
            </div>
            <button
              className={styles.resultButton}
              onClick={(e) => {
                e.stopPropagation();
                onResultClick?.();
              }}
            >
              결과 확인
            </button>
          </div>
        );

      case 'created':
        return (
          <div className={styles.container}>
            <div className={styles.leftContent}>
              <Text
                className={styles.title}
                size='m'
                weight='bold'
                color='var(--color-black)'
              >
                {title}
              </Text>
              <p className={styles.period}>
                {formatPeriod(startDate, endDate)}
              </p>
            </div>
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
            <div className={styles.leftContent}>
              <Text
                className={styles.title}
                size='m'
                weight='bold'
                color='var(--color-black)'
              >
                {title}
              </Text>
              <p className={styles.period}>
                {formatPeriod(startDate, endDate)}
              </p>
            </div>
            <IconButton className={styles.rotate} name='left' />
          </div>
        );
    }
  };

  return renderContent();
};

export default ElectionListItem;
