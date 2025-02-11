import React from 'react';
import styles from './index.module.scss';

import mypage from '@/assets/icons/mypage.svg';
import doodleback from '@/assets/icons/doodleback.svg';
import home from '@/assets/icons/home.svg';
import heart from '@/assets/icons/heart.svg';
import send from '@/assets/icons/send.svg';
import back from '@/assets/icons/back.svg';
import bigger from '@/assets/icons/bigger.svg';
import orangebigger from '@/assets/icons/orangebigger.svg';
import dots from '@/assets/icons/dots.svg';
import left from '@/assets/icons/left.svg';
import leftLongWhite from '@/assets/icons/leftLongWhite.svg';
import leftLongBlack from '@/assets/icons/leftLongBlack.svg';

type IconName =
  | 'mypage'
  | 'doodleback'
  | 'home'
  | 'heart'
  | 'send'
  | 'back'
  | 'bigger'
  | 'orangebigger'
  | 'dots'
  | 'left'
  | 'leftLongWhite'
  | 'leftLongBlack';

const ICON_MAPPING = {
  mypage,
  doodleback,
  home,
  heart,
  send,
  back,
  bigger,
  orangebigger,
  dots,
  left,
  leftLongWhite,
  leftLongBlack,
};

interface IconProps {
  name: IconName;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  src?: string;
}

const IconButton: React.FC<IconProps> = ({
  name,
  className = '',
  children,
  onClick,
}) => {
  const IconClasses = [
    styles.icon,
    styles[`icon-name-${name}`],
    className,
  ].join(' ');
  // 사용 예시: <Icon name='mypage' src={mypage}></Icon>
  return (
    <div className={IconClasses} onClick={onClick}>
      <img src={ICON_MAPPING[name]} />
      {children}
    </div>
  );
};

export default IconButton;
