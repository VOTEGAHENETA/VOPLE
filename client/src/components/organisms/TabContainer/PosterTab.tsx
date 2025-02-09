import IconButton from '@/components/atoms/IconButton';
import styles from './index.module.scss';
import { useState } from 'react';

// Mock-Data
import Poster from '@/components/atoms/Poster';

interface PosterTabProps {
  imageSrc?: string; // 이미지 경로를 props로 받음
}

export default function PosterTab({ imageSrc }: PosterTabProps) {
  // 탭 변환 시 렌더링 확인용
  console.log('PosterTabProps Rendered');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.posterContainer}>
      <div className={styles.posterWrapper}>
        {imageSrc ? (
          <div>
            <Poster className={styles.poster} size='full' src={imageSrc} />
            <IconButton
              className={styles.zoomButton}
              onClick={handleImageClick}
              name='bigger'
            >
              확대보기
            </IconButton>
          </div>
        ) : (
          <div className={styles.emptyMessage}>
            아직 포스터가 등록되지 않았습니다.
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className={styles.modal} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <Poster
              className={styles.poster}
              size='full'
              src={imageSrc} // 모달에서도 같은 이미지 사용
            />
          </div>
        </div>
      )}
    </div>
  );
}
