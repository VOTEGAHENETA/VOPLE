import IconLogo from '@/assets/icons/IconLogo';
import styles from './index.module.scss';
import Text from '@/components/atoms/Text';
import kakao from '@/assets/icons/kakao.svg';

const Login = () => {
  const { VITE_PUBLIC_OAUTH_URL } = import.meta.env;
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <IconLogo width={262} height={57} />
        <div className={styles.intro}>
          <Text size='s' weight='normal' color='#999999'>
            즐거운 선거로
          </Text>
          <Text size='s' weight='normal' color='#999999'>
            세상을 바꾸는 사람들
          </Text>
          <a
            href={`${VITE_PUBLIC_OAUTH_URL}/authorization/kakao`}
            className={styles.a}
          >
            <img src={kakao} alt='' />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
