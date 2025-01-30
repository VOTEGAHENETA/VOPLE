// src/components/atoms/icons/types/index.ts
export interface IconProps {
  name: 'search' | 'close' | 'arrow' | 'plus'; // 사용할 아이콘 이름들 정의
  size?: number;
  color?: string;
}

// src/components/atoms/icons/index.tsx
import searchIcon from '@/assets/images/icons/search-icon.svg';
// import closeIcon from '@/assets/images/icons/close-icon.svg';
// import arrowIcon from '@/assets/images/icons/arrow-icon.svg';
// import plusIcon from '@/assets/images/icons/plus-icon.svg';

const iconMap = {
  search: searchIcon,
  // close: closeIcon,
  // arrow: arrowIcon,
  // plus: plusIcon,
};

export function Icon({ name, size = 18, color = '#ccc', ...props }: IconProps) {
  return (
    <img
      src={iconMap[name]}
      width={size}
      height={size}
      color={color}
      className={`icon ${iconMap[name]}`}
      alt={`${name} icon`}
      {...props}
    />
  );
}
