import { useEffect, useRef } from 'react';
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
  closeMenu: () => void;
}

function Menu({ items, isOpen, closeMenu }: Props) {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClickOutSide(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    }

    document.addEventListener('mousedown', handleClickOutSide);

    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  });

  function handleRoute(path: string) {
    navigate(path);
    closeMenu();
  }

  const popupClasses = [styles.popup, styles[`is-open-${isOpen}`]].join(' ');

  return (
    <ul className={popupClasses} ref={menuRef}>
      {items.map((item) => (
        <li key={item.id} onClick={() => handleRoute(item.path)}>
          {item.label}
        </li>
      ))}
    </ul>
  );
}

export default Menu;
