import error from '@/assets/imgs/error.svg';
import errorText from '@/assets/imgs/errorText.svg';
import styles from './index.module.scss';
import BaseButton from '@/components/atoms/BaseButton';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();
  const normalization = () => {
    navigate('/elections/list');
  };

  return (
    <div className={styles.container}>
      <div>
        <img src={error} className={styles.error} />
        <div className={styles.shadow}></div> {/* 그림자 추가 */}
      </div>
      <img src={errorText} className={styles.text} />
      <BaseButton
        type='button'
        kind='base'
        status='outline'
        customClass={styles.btn}
        onClick={normalization}
      >
        정상화
      </BaseButton>
    </div>
  );
};

export default Error;
