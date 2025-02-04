import React, { useState } from 'react';
import styles from './index.module.scss';
import IconButton from '@/components/atoms/IconButton';
import Text from '@/components/atoms/Text';
import Menu from '@/components/molecules/Menu';
import { useNavigate } from 'react-router-dom';

interface ElectionListItemProps {
  id: number;
  title: string;
  startDate?: string;
  endDate?: string;
  status?: 'participating' | 'created';
  isClosed?: boolean;
  onMenuClick?: () => void; // ... 메뉴 버튼 클릭 시
}

const ElectionListItem: React.FC<ElectionListItemProps> = ({
  id,
  title = '선거 제목입니다.',
  startDate = '2025.01.20',
  endDate = '2025.01.25',
  status = 'participating',
  isClosed = false,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const formatPeriod = (start: string, end: string) => {
    return `${start} ~ ${end}`;
  };
  const navigate = useNavigate();

  // 참여 중인 선거 클릭 시, 해당 선거 isClosed에 따라 라우팅
  const handleItemClick = () => {
    if (isClosed) {
      navigate(`/elections/${id}/result`);
    } else {
      navigate(`/elections/${id}`);
    }
  };

  // 결과보기 버튼 클릭 시
  const handleResultClick = () => {
    navigate(`/elections/${id}/result`);
  };

  // dots 버튼 클릭 시
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // dots 버튼 Menu 구성 목록
  const menuItems = [
    {
      id: 1,
      label: '선거 관리',
      path: `/elections/${id}/register`,
    },
    {
      id: 2,
      label: '메인화면',
      path: `/elections/${id}`,
    },
    {
      id: 3,
      label: '투표현황/결과',
      path: `/elections/${id}/result`,
    },
  ];

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
              onClick={handleMenuToggle}
            />
            <Menu items={menuItems} isOpen={isMenuOpen} />
          </div>
        );

      case 'participating':
        return (
          <div className={styles.container} onClick={handleItemClick}>
            {commonLeftContent}
            {isClosed ? (
              <button
                className={styles.resultButton}
                onClick={handleResultClick}
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
