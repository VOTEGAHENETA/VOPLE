import styles from './index.module.scss';
import IconButton from '@/components/atoms/IconButton';
import { ICON_NAME } from '@/constants/ui.constants';
import CircleButton from '@/components/atoms/CircleButton';
import { useNavigate } from 'react-router-dom';

/** 메인 화면에서 보여질 Footer */
function Footer() {
  const navigate = useNavigate();

  function handleHome() {
    navigate('/elections');
  }

  function handleMyPage() {
    navigate('/mypage');
  }

  return (
    <nav id={styles.footer}>
      <IconButton name={ICON_NAME.HOME} onClick={handleHome} />
      <IconButton name={ICON_NAME.MYPAGE} onClick={handleMyPage} />
      <div className={styles['circle-section']}>
        <CircleButton type='button' />
      </div>
    </nav>
  );
}

export default Footer;
