import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';

interface item {
  /** 메뉴의 고유 id */
  id: number;
  /** 메뉴에 넣을 라벨 */
  label: string;
  /** 메뉴 클릭 시 이동할 경로 */
  path: string;
}

interface Props {
  items: item[];
  isOpen: boolean;
}

function Menu({ items, isOpen }: Props) {
  const navigate = useNavigate();
  function handleRoute(path: string) {
    navigate(path);
  }

  const popupClasses = [styles.popup, styles[`is-open-${isOpen}`]].join(' ');

  return (
    <ul className={popupClasses}>
      {items.map((item) => (
        <li key={item.id} onClick={() => handleRoute(item.path)}>
          {item.label}
        </li>
      ))}
    </ul>
  );
}

export default Menu;
