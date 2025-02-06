import Text from '@/components/atoms/Text';
import styles from './index.module.scss';
import Poster from '@/components/atoms/Poster';
import check from '@/assets/icons/check.svg';

interface Props {
  username?: string;
  poster?: string;
  selected?: boolean;
  onClick?: () => void;
}

function CandidateChoice({ username, poster, selected, onClick }: Props) {
  return (
    <div className={styles.choice}>
      <div
        // 부모로부터 발생한 onClick에 따라 selected 상태 값 변환 => false -> true
        className={`${styles['choice-poster']} ${selected ? '' : styles.darkPoster}`}
        onClick={onClick}
      >
        <Poster size='s' src={poster} />
        {/* // 포스터 선택 시 selected 상태 값 변환 => false -> true */}
        {selected && (
          <img src={check} alt='' className={styles['choice-check']} />
        )}
        <Text size='xs' weight='normal' color='#000000' className={styles.text}>
          {username}
        </Text>
      </div>
    </div>
  );
}

export default CandidateChoice;
