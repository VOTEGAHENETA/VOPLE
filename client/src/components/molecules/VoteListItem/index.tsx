import styles from './index.module.scss';
import BaseButton from '@/components/atoms/BaseButton';
import xLg from '@/assets/icons/xLg.svg';

interface VoteListItemProps {
  id: number; // 투표 id
  voteName: string; // 투표 이름(진한 글씨)
  sessionName: string; // 선거 이름
  onDelete: (id: number) => void;
}

export const VoteListItem = ({
  id,
  voteName,
  sessionName,
  onDelete,
}: VoteListItemProps) => {
  // 추후 모달 구현 시 반영 예정
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    // setIsModalOpen(true);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('이 투표를 삭제하시겠습니까?');
    if (confirmDelete) {
      onDelete(id);
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
          <img src={xLg} alt='X 삭제 아이콘' />
        </button>
      </div>
    </div>
  );
};
