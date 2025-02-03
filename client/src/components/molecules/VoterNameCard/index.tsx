import Text from '@/components/atoms/Text';
import clsx from 'clsx';
import styles from './index.module.scss';
import IconMiniCheck from '@/assets/icons/IconMiniCheck';

interface Props {
  // response data가 정해지면 수정 예정
  status?: boolean;
  kakaoNickname: string;
  nickname: string;
}

function VoterNameCard({ status = false, kakaoNickname, nickname }: Props) {
  const getFirstNickname = kakaoNickname.charAt(0);

  return (
    <div className={styles.card}>
      <div className={styles['left-section']}>
        <div className={clsx(styles.profile, styles[`profile-${status}`])}>
          <Text size='m' weight='bold' color='#ffffff'>
            {getFirstNickname}
          </Text>
        </div>
        <div className={styles.info}>
          <Text size='s' weight={status ? 'bold' : 'normal'}>
            {status ? '후보자' : '투표자'}
          </Text>
          <div className={styles.nickname}>
            <Text size='m' weight='bold'>
              {kakaoNickname}
            </Text>
            <Text size='s' color='#999999'>
              {nickname}
            </Text>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          styles['right-section'],
          styles[`is-select`],
          styles[`is-select-${status}`]
        )}
      >
        <IconMiniCheck />
      </div>
    </div>
  );
}

export default VoterNameCard;
