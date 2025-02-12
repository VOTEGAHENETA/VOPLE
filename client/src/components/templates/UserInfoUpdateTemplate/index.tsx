import UserInfoSection from '@/components/organisms/UserInfoSection';
import styles from './index.module.scss';
import Text from '@/components/atoms/Text';
import Users from '@/assets/images/Users.png';
export function UserInfoUpdateTemplate() {
  return (
    <div className={styles.content}>
      <UserInfoSection
        nickname='nickname'
        username='username'
        onChangeField={() => console.log('UserInfoUpdateTemplate Rendered')}
      />
      <div className={styles.img__box}>
        <img src={Users} alt='사람들 아이콘' />
        <Text
          className={styles.img__text}
          size='lg'
          color='var(--color-gray-light)'
        >
          즐거운 선거로 <br /> 세상을 바꾸는 사람들
        </Text>
      </div>
    </div>
  );
}

export default UserInfoUpdateTemplate;
