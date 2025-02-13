import Text from '@/components/atoms/Text';
import InputField from '@/components/molecules/InputField';
// import { ChangeEvent } from 'react';
import styles from './index.module.scss';
import { UserInfoFormData } from '@/types/user';

interface UserInfoSectionProps {
  nickname: string;
  username: string;
  handleChange: (field: keyof UserInfoFormData, value: string) => void;
}

export default function UserInfoSection({
  nickname,
  username,
  handleChange,
}: UserInfoSectionProps) {
  return (
    <section className={styles.section}>
      <Text className={styles.sectionTitle}>내 정보 수정</Text>
      <div className={styles.section__wrap}>
        <InputField
          value={nickname || ''} // null 체크
          onChange={(e) => handleChange('nickname', e.target.value)}
          id='nickname-input'
          label='닉네임'
          placeholder='VOTE가해냈다'
          disabled={true}
        />
        <InputField
          value={username || ''} // null 체크
          onChange={(e) => handleChange('username', e.target.value)}
          id='name-input'
          label='내 이름'
          placeholder='다른 투표자들에게 보여질 내 이름을 적어주세요🍀'
        />
      </div>
    </section>
  );
}
