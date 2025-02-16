import styles from './index.module.scss';
import medal from '@/assets/icons/medal.svg';
import crown from '@/assets/icons/crown.svg';
import silverCrown from '@/assets/icons/silverCrown.svg';
import Text from '@/components/atoms/Text';

interface Props {
  voteId?: number;
  voteName?: string;
  username?: string;
  showUsername?: boolean;
  // 부모에서 계산한 순위를 1부터 전달 (예: 1, 2, 3, …)
  rank: number;
}

function RoleNameTag({ voteName, username, showUsername = true, rank }: Props) {
  let iconSrc;

  if (rank === 1) {
    iconSrc = crown; // voteId가 가장 낮은 후보 (순위 1)
  } else if (rank === 2) {
    iconSrc = silverCrown; // 두번째로 낮은 후보 (순위 2)
  } else {
    iconSrc = medal; // 그 외 또는 가장 높은 후보
  }

  return (
    <div className={styles.role}>
      <div className={styles.votename}>
        <img src={iconSrc} alt='icon' />
        <Text size='s' weight='bold' color='#000000'>
          {voteName}
        </Text>
      </div>
      {showUsername && (
        <Text
          size='s'
          weight='bold'
          color='#000000'
          className={styles.username}
        >
          {username}
        </Text>
      )}
    </div>
  );
}

export default RoleNameTag;
