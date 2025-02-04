import { useState } from 'react';
import styles from './index.module.scss';
import IconButton from '@/components/atoms/IconButton';
import Menu from '@/components/molecules/Menu';
import { useNavigate } from 'react-router-dom';
import { ElectionListProps } from '@/types/election';
import CommonLeftContent from '@/components/molecules/ElectionListItem/';

const ElectionListItem = ({
  id,
  title = '선거 제목입니다.',
  startDate = '2025.01.20',
  endDate = '2025.01.25',
  status = 'participating',
  isClosed = false,
}: ElectionListProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const renderRightContent = () => {
    if (status === 'created') {
      return (
        <>
          <IconButton
            aria-label='메뉴 열기'
            className={styles.menuButton}
            name='dots'
            onClick={handleMenuToggle}
          />
          <Menu items={menuItems} isOpen={isMenuOpen} />
        </>
      );
    }

    if (status === 'participating') {
      return (
        <div>
          <button className={styles.resultButton} onClick={handleResultClick}>
            결과 확인
          </button>
          <IconButton className={styles.rotate} name='left' />
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={styles.container}
      onClick={status === 'participating' ? handleItemClick : undefined}
    >
      <CommonLeftContent
        id={id}
        title={title}
        startDate={startDate}
        endDate={endDate}
        isClosed={isClosed}
      />
      {renderRightContent()}
    </div>
  );
};

export default ElectionListItem;
