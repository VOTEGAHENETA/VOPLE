import React from 'react';
import Text from '../Text';
import styles from './index.module.scss';

type PosterSize = 'xs' | 's' | 'm' | 'lg' | 'full';

interface PosterProps {
  size: PosterSize;
  className?: string;
  src?: string;
}

const Poster: React.FC<PosterProps> = ({ size = 'm', className = '', src }) => {
  const PosterClasses = [
    styles.poster,
    styles[`poster-size-${size}`],
    className,
  ].join(' ');
  // 사용 예시:    <Poster size='xs' src={xsImage}></Poster>

  return (
    <div className={src ? PosterClasses : styles.none}>
      {src ? (
        <img src={src} className={PosterClasses} />
      ) : (
        <Text size='xs' weight='normal' color='#999999'>
          아직 포스터가 <br />
          없어요.
        </Text>
      )}
    </div>
  );
};

export default Poster;
