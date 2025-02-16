import styles from './index.module.scss';
import IconButton from '@/components/atoms/IconButton';
import { ICON_NAME } from '@/constants/ui.constants';
import IconLogo from '@/assets/icons/IconLogo';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const isElectionDetailPage = /^\/elections\/\d+$/.test(pathname);
    setIsHidden(isElectionDetailPage);
  }, [pathname]);

  function handleBack() {
    navigate(-1);
  }

  function handleMyPage() {
    navigate('/mypage');
    window.location.reload();
  }

  function handleHome() {
    navigate('/elections/list');
  }

  return (
    <header id={styles.header}>
      <div className={isHidden || pathname === '/list' ? styles.hide : ''}>
        <IconButton name={ICON_NAME.DOODLEBACK} onClick={handleBack} />
      </div>
      <div onClick={handleHome}>
        <IconLogo />
      </div>
      <div
        className={
          isHidden || pathname === '/mypage' || pathname === '/home'
            ? styles.hide
            : ''
        }
      >
        <IconButton name={ICON_NAME.MYPAGE} onClick={handleMyPage} />
      </div>
    </header>
  );
}

export default Header;
