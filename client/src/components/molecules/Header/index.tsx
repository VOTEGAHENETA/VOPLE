import styles from './index.module.scss';
import IconButton from '@/components/atoms/IconButton';
import { ICON_NAME } from '@/constants/ui.constants';
import IconLogo from '@/assets/icons/IconLogo';
import { useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const nonDoodleBack = ['/list', '/elections/:election_id'];
  const nonMyPage = ['/mypage', '/elections/:election_id', '/home'];

  function handleBack() {
    navigate(-1);
  }

  function handleMyPage() {
    navigate('/mypage');
  }

  function handleHome() {
    navigate('/elections');
  }

  return (
    <nav id={styles.header}>
      <div
        className={
          nonDoodleBack.some((path) => path === pathname) ? styles.hide : ''
        }
      >
        <IconButton name={ICON_NAME.DOODLEBACK} onClick={handleBack} />
      </div>
      <div onClick={handleHome}>
        <IconLogo />
      </div>
      <div
        className={
          nonMyPage.some((path) => path === pathname) ? styles.hide : ''
        }
      >
        <IconButton name={ICON_NAME.MYPAGE} onClick={handleMyPage} />
      </div>
    </nav>
  );
}

export default Header;
