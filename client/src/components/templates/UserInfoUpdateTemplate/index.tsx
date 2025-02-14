import UserInfoSection from '@/components/organisms/UserInfoSection';
import styles from './index.module.scss';
import Text from '@/components/atoms/Text';
import { useUserInfoFormData } from '@/hooks/useUserInfoFormData';
import { useGetUserInfo } from '@/services/hooks/useGetUserInfo';
import React, { useEffect } from 'react';
import BaseButton from '@/components/atoms/BaseButton';
import { UserInfoRequest } from '@/types/user';
import { usePutUserInfo } from '@/services/hooks/usePostUserInfo';
import IconUsers from '@/assets/icons/IconUsers';

export function UserInfoUpdateTemplate() {
  // 후보자 기본 정보
  const { userInfoFormData, setUserInfoFormData, handleChange } =
    useUserInfoFormData({
      userId: 0,
      kakaoId: 0,
      nickname: '',
      username: '',
    });

  //================================
  // 사용자 정보 최초 폼 초기화
  //================================
  // Query : 쿼리 훅 사용하여 데이터 정보 받아옴 param에서 받아온 user_id (로그인 구현 전)
  const { data, error } = useGetUserInfo();
  useEffect(() => {
    if (data) {
      const { userId, kakaoId, nickname, username } = data;
      // formData 초기화
      setUserInfoFormData({
        userId: userId || 0,
        kakaoId: kakaoId || 0,
        nickname: nickname || '', // null 체크
        username: username || '', // null 체크
      });
    } else if (error) {
      console.error('사용자 정보 폼 초기화 에러 : ', error);
    }
  }, [data, error]);

  //================================
  // 사용자 정보 업데이트
  //================================
  const putUserInfo = usePutUserInfo();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userInfoRequest: UserInfoRequest = {
        userId: userInfoFormData.userId,
        kakaoId: userInfoFormData.kakaoId,
        nickname: userInfoFormData.nickname,
        username: userInfoFormData.username,
      };

      putUserInfo.mutate(userInfoRequest);
    } catch (error) {
      console.error('수정 실패:', error);
      alert('수정에 실패했습니다.');
    }
  };

  return (
    <form className={styles.content} onSubmit={handleSubmit}>
      <UserInfoSection
        nickname={userInfoFormData.nickname}
        username={userInfoFormData.username}
        handleChange={handleChange}
      />
      <BaseButton kind='base' type='submit' status='fill'>
        수정하기
      </BaseButton>
      <div className={styles.img__box}>
        <IconUsers size={180}></IconUsers>
        <Text
          className={styles.img__text}
          size='lg'
          color='var(--color-gray-light)'
        >
          즐거운 선거로
          <br /> 세상을 바꾸는 사람들
        </Text>
      </div>
    </form>
  );
}

export default UserInfoUpdateTemplate;
