import styles from './index.module.scss';
import medal from '@/assets/icons/medal.svg';
import crown from '@/assets/icons/crown.svg';
import silverCrown from '@/assets/icons/silverCrown.svg';
import Text from '@/components/atoms/Text';

interface Props {
  voteId?: number;
  voteName?: string;
  // 단일 후보자 이름을 전달받습니다.
  username?: string;
  showUsername?: boolean;
}

function RoleNameTag({
  voteId,
  voteName,
  username,
  showUsername = true,
}: Props) {
  return (
    <div className={styles.role}>
      <div className={styles.votename}>
        {voteId === 1 ? (
          <img src={crown} alt='crown' />
        ) : voteId === 2 ? (
          <img src={silverCrown} alt='silver crown' />
        ) : (
          <img src={medal} alt='medal' />
        )}
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
