import React from 'react';
import styles from './index.module.scss';

type TextSize = 'xs' | 's' | 'sm' | 'm' | 'lg' | 'xl';
type TextWeight = 'normal' | 'bold';

interface TextProps {
  size?: TextSize;
  weight?: TextWeight;
  color?: string;
  className?: string;
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({
  //폰트 사이즈 기본값 : 18px
  size = 'm',
  weight = 'normal',
  color = '',
  className = '',
  children,
}) => {
  const textClasses = [
    styles.text,
    styles[`text-size-${size}`],
    styles[`text-weight-${weight}`],
    // `text-color-${color}`,
    className,
  ].join(' ');

  const textColor = color ? { color } : undefined;

  // 사용 예시
  // <Text size='xs' weight='bold' color='#ffffff'>커스텀 테스트 </Text>

  return (
    <span className={textClasses} style={textColor}>
      {children}
    </span>
  );
};

export default Text;
