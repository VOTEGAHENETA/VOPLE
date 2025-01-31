import React from 'react';
import styles from './index.module.scss';

type PosterSize = 'xs' | 's' | 'm' | 'lg';

interface PosterProps {
  size: PosterSize;
  className?: string;
  children: React.ReactNode;
  src?: string;
}

const Poster: React.FC<PosterProps> = ({
  size = 'm',
  className = '',
  children,
  src,
}) => {
  const PosterClasses = [
    styles.poster,
    styles[`poster-size-${size}`],
    className,
  ].join(' ');
  // 사용 예시:    <Poster size='xs' src={xsImage}></Poster>
  return (
    <div>
      {src && <img src={src} className={PosterClasses}/>}
      {children}
    </div>
  );
};

export default Poster;
