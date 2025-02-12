import crown from '@/assets/icons/crown.svg';
import Text from '@/components/atoms/Text';
import styles from './index.module.scss';
// import twoFiger from '@/assets/icons/twoFinger.svg';
// import threeFinger from '@/assets/icons/twoFinger.svg';

interface Props {
  votePercent: number;
  prefix?: string;
  username: string;
}

function VoteRanking({ votePercent, prefix, username }: Props) {
  return (
    <div className={styles.ranking}>
      <div className={styles.user}>
        <img src={crown} />
        <div className={styles.userinfo}>
          <Text size='s' weight='normal' color='#999999'>
            {prefix}
          </Text>
          <Text size='m' weight='bold' color='#555555'>
            {username}
          </Text>
        </div>
      </div>
      <div className={styles.percent}>
        <Text size='xl' weight='bold' color='#555555'>
          {votePercent}%
        </Text>
      </div>
    </div>
  );
}

export default VoteRanking;
