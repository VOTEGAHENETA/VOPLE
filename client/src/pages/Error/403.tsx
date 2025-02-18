import errorText from '@/assets/imgs/error403Text.svg';
import error from '@/assets/imgs/error403.svg';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import BaseButton from '@/components/atoms/BaseButton';

const AuthError = () => {
  const navigate = useNavigate();
  const normalization = () => {
    navigate('/elections/list');
  };
  return (
    <div className={styles.container}>
      <div className={styles.realerror}>
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

export default AuthError;
