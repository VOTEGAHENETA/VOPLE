import Text from '@/components/atoms/Text';
import InputField from '@/components/molecules/InputField';
import { ChangeEvent } from 'react';
import styles from './index.module.scss';
import { UserInfoFormData } from '@/types/candidate';

interface UserInfoSectionProps {
  nickname: string;
  username: string;
  onChangeField: <T extends HTMLInputElement | HTMLTextAreaElement>(
    fieldName: keyof UserInfoFormData,
    e: ChangeEvent<T>
  ) => void;
}

export default function UserInfoSection({
  nickname,
  username,
  onChangeField,
}: UserInfoSectionProps) {
  return (
    <section className={styles.section}>
      <Text className={styles.sectionTitle}>내 정보 수정</Text>
      <div className={styles.section__wrap}>
        <InputField
          value={nickname}
          onChange={(e) => onChangeField('nickname', e)}
          id='nickname-input'
          label='닉네임'
          placeholder='VOTE가해냈다'
          disabled={true}
        />
        <InputField
          value={username}
          onChange={(e) => onChangeField('username', e)}
          id='name-input'
          label='내 이름'
          placeholder='다른 투표자들에게 보여질 내 이름을 적어주세요🍀'
        />
      </div>
    </section>
  );
}
