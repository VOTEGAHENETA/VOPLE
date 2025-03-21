import { useState } from 'react';
import styles from './index.module.scss';
import IconButton from '@/components/atoms/IconButton';
import Menu from '@/components/molecules/Menu';
import { useNavigate } from 'react-router-dom';
import { ElectionListDetail } from '@/types/election';
import CommonLeftContent from '@/components/molecules/ElectionListItem/CommonLeftContent';
import { useElectionStore } from '@/stores/election';

interface ElectionListItemProps extends ElectionListDetail {
  status: 'created' | 'participating';
}

const ElectionListItem = ({
  id,
  sessionName,
  startTime,
  endTime,
  status,
  isClosed,
  hasVoted,
}: ElectionListItemProps) => {
  const { setIsHost } = useElectionStore();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  // 참여 중인 선거 클릭 시, 해당 선거 isClosed에 따라 라우팅
  const handleItemClick = () => {
    setIsHost(false);

    if (isClosed) {
      navigate(`/elections/${id}/final`);
    } else if (hasVoted) {
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

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  // dots 버튼 Menu 구성 목록
  const menuItems = [
    {
      id: 1,
      label: '선거 관리',
      path: `/elections/${id}/manage`,
    },
    {
      id: 2,
      label: '메인 화면',
      path: `/elections/${id}`,
    },
    {
      id: 3,
      label: '투표 현황',
      path: `/elections/${id}/result`,
    },
    {
      id: 4,
      label: '투표 결과',
      path: `/elections/${id}/final`,
    },
  ];

  const renderRightContent = () => {
    if (status === 'created') {
      return (
        <>
          <IconButton
            className={styles.menuButton}
            name='dots'
            onClick={handleMenuToggle}
          />
          <Menu
            items={menuItems}
            isOpen={isMenuOpen}
            closeMenu={handleCloseMenu}
          />
        </>
      );
    }

    if (status === 'participating') {
      return (
        <div className={styles.right}>
          {isClosed ? (
            <button className={styles.resultButton} onClick={handleResultClick}>
              결과 확인
            </button>
          ) : (
            <IconButton className={styles.rotate} name='left' />
          )}
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
        sessionName={sessionName}
        startTime={startTime}
        endTime={endTime}
        isClosed={isClosed}
      />
      {renderRightContent()}
    </div>
  );
};

export default ElectionListItem;
