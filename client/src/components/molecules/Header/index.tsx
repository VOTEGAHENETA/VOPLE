import styles from './index.module.scss';
import IconButton from '@/components/atoms/IconButton';
import { ICON_NAME } from '@/constants/ui.constants';
import IconLogo from '@/assets/icons/IconLogo';

function Header() {
  return (
    <nav id={styles.header}>
      <IconButton name={ICON_NAME.DOODLEBACK} />
      <IconLogo />
      <IconButton name={ICON_NAME.MYPAGE} />
    </nav>
  );
}

export default Header;
