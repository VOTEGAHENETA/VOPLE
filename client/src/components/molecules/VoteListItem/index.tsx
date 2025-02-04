import React from 'react';
import styles from './index.module.scss';
import BaseButton from '@/components/atoms/BaseButton';
import xIcon from '@/assets/icons/xIcon.svg';

interface VoteListItemProps {
  id: bigint;
  sessionName: string; // 선거 이름
  voteName: string; // 투표 이름(진한 글씨)
  onListChange?: () => void;
}

export const VoteListItem: React.FC<VoteListItemProps> = ({
  id,
  sessionName,
  voteName,
  onListChange,
}) => {
  // 추후 모달 구현 시 반영 예정
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    // setIsModalOpen(true);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('이 투표를 삭제하시겠습니까?');

    if (confirmDelete) {
      try {
        // 추후 설정 예정
        //   const response = await fetch(`/api/votes/${id}`, {
        //     method: 'DELETE',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //   });

        //   if (!response.ok) {
        //     throw new Error('Failed to delete vote');
        //   }

        console.log(
          'id/sessionName/voteName : ' + id + '/' + sessionName + '/' + voteName
        );
        // 삭제 성공 시 부모 컴포넌트에 알림 (임시설정)
        onListChange?.();

        alert('투표가 삭제되었습니다.');
      } catch (error) {
        console.error('Error deleting vote:', error);
        alert('투표 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className={styles.voteListItem}>
      <div className={styles.content}>
        <div className={styles.title}>{sessionName}</div>
        <div className={styles.position}>{voteName}</div>
      </div>
      <div className={styles.actions}>
        <BaseButton
          type='button'
          kind='mini-chip'
          status='outline'
          onClick={handleModalOpen}
        >
          후보 지정
        </BaseButton>
        <button className={styles.close} onClick={handleDelete}>
          <img src={xIcon} alt='X 삭제 아이콘' />
        </button>
      </div>
    </div>
  );
};
