import styles from './index.module.scss';
import medal from '@/assets/icons/medal.svg';
import crown from '@/assets/icons/crown.svg';
import silverCrown from '@/assets/icons/silverCrown.svg';
import Text from '@/components/atoms/Text';

interface Props {
  id: number;
  voteName: string;
  username: string;
}

function RoleNameTag({ id, voteName, username }: Props) {
  return (
    <div className={styles.role}>
      <div className={styles.votename}>
        {id === 1 ? (
          <img src={crown} />
        ) : id === 2 ? (
          <img src={silverCrown} />
        ) : (
          <img src={medal} />
        )}

        <Text size='s' weight='bold' color='#000000'>
          {voteName}
        </Text>
      </div>
      <Text size='s' weight='bold' color='#000000' className={styles.username}>
        {username}
      </Text>
    </div>
  );
}

export default RoleNameTag;
