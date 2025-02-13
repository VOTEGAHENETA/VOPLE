import UserInfoSection from '@/components/organisms/UserInfoSection';
import styles from './index.module.scss';
import Text from '@/components/atoms/Text';
import Users from '@/assets/images/Users.png';
import { useParams } from 'react-router-dom';
import { useUserInfoFormData } from '@/hooks/useUserInfoFormData';
import { useUserInfo } from '@/services/hooks/useUserInfo';
import React, { useEffect } from 'react';
import axios from 'axios';
import BaseButton from '@/components/atoms/BaseButton';

const API_URL = import.meta.env.VITE_PUBLIC_API_URL;

// ============
// 타입 정의
// ============
interface UserInfoRequest {
  userId: number;
  kakaoId: number;
  nickname: string;
  username: string;
}

export function UserInfoUpdateTemplate() {
  const { user_id = '' } = useParams();

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

  // Query : 쿼리 훅 사용하여 데이터 정보 받아옴
  const { data, error } = useUserInfo(user_id);
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 전송할 데이터 묶음
      const formData = new FormData();

      // VoteTeamInfoRequest DTO 생성
      const userInfoRequest: UserInfoRequest = {
        userId: userInfoFormData.userId,
        kakaoId: userInfoFormData.kakaoId,
        nickname: userInfoFormData.nickname,
        username: userInfoFormData.username,
      };

      console.log('userInfoRequest : ', userInfoRequest);
      // DTO를 FormData에 추가
      formData.append(
        'data',
        new Blob([JSON.stringify(userInfoRequest)], {
          type: 'application/json',
        })
      );

      console.log('userInfoRequest ::::: ', userInfoRequest);
      const response = await axios.put(
        `${API_URL}/user/${user_id}`,
        userInfoRequest, // FormData 대신 JSON 직접 전송
        {
          headers: {
            'Content-Type': 'application/json', // JSON 형식으로 변경
          },
        }
      );

      if (response.status === 200) {
        alert('수정이 완료되었습니다.');
      }
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
        <img src={Users} alt='사람들 아이콘' />
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
