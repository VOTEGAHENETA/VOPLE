import UserInfoSection from '@/components/organisms/UserInfoSection';
import styles from './index.module.scss';

export function UserInfoUpdateTemplate() {
  return (
    <div className={styles.content}>
      <UserInfoSection
        nickname='nickname'
        username='username'
        onChangeField={() => console.log('UserInfoUpdateTemplate Rendered')}
      />
    </div>
  );
}

export default UserInfoUpdateTemplate;
