// ProfileEdit.tsx
import BaseButton from '@/components/atoms/BaseButton';
import Poster from '@/components/atoms/Poster';
import Text from '@/components/atoms/Text';
import InputField from '@/components/molecules/InputField';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import styles from './index.module.scss';
import axios, { AxiosError } from 'axios';

interface ProfileResponse {
  httpStatus: number;
  message: string;
  data: {
    user: {
      userId: number;
      nickname: string;
      username: string;
    };
    voteTeam: {
      poster: string;
      prefix: string;
      candidateStatement: string;
    };
    pledges: Array<{
      content: string;
    }>;
  };
}

// interface ProfileFormData {
//   nickname: string;
//   username: string;
//   poster: string | File;
//   prefix: string;
//   candidateStatement: string;
//   pledges: string[];
// }

const fetchProfile = async ({
  sessionId,
  userId,
}: {
  sessionId: string;
  userId: string;
}) => {
  try {
    const { data } = await axios.get(`/api/candidate/${sessionId}/${userId}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch profile data'
      );
    }
    throw error;
  }
};

const updateProfile = async ({
  sessionId,
  userId,
  data,
}: {
  sessionId: string;
  userId: string;
  data: FormData;
}) => {
  try {
    const response = await axios.post(
      `/api/candidate/${sessionId}/${userId}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to update profile'
      );
    }
    throw error;
  }
};

export default function CandidateInfoUpdateTemplate() {
  const { sessionId = '', userId = '' } = useParams();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<ProfileResponse>({
    queryKey: ['profile', sessionId, userId],
    queryFn: () => fetchProfile({ sessionId, userId }),
  });

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profile', sessionId, userId],
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;

    const formData = new FormData();
    formData.append('nickname', data.data.user.nickname);
    formData.append('username', data.data.user.username);
    formData.append('prefix', data.data.voteTeam.prefix);
    formData.append(
      'candidateStatement',
      data.data.voteTeam.candidateStatement
    );

    // if (data.data.voteTeam.poster instanceof File) {
    //   formData.append('poster', data.data.voteTeam.poster);
    // }

    data.data.pledges.forEach((pledge, index) => {
      formData.append(`pledges[${index}]`, pledge.content);
    });

    mutation.mutate({ sessionId, userId, data: formData });
  };

  const handlePledgeAdd = () => {
    if (!data || data.data.pledges.length >= 5) return;

    const updatedPledges = [...data.data.pledges, { content: '' }];
    queryClient.setQueryData<ProfileResponse>(
      ['profile', sessionId, userId],
      (old) =>
        old
          ? {
              ...old,
              data: {
                ...old.data,
                pledges: updatedPledges,
              },
            }
          : undefined
    );
  };

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!data) return null;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* 내 정보 수정 섹션 */}
      <section className={styles.section}>
        <Text className={styles.sectionTitle}>내 정보 수정</Text>
        <div className={styles.inputGroup}>
          <InputField
            id='nickname-input'
            label='닉네임'
            value={data.data.user.nickname}
            onChange={() => console.log('닉네임 InputField chaged')}
            placeholder='실한 원년조'
          />
          <InputField
            id='name-input'
            label='내 이름'
            value={data.data.user.username}
            onChange={() => console.log('내 이름 InputField chaged')}
            placeholder='실한 원년조'
          />
        </div>
      </section>

      {/* 선거 채널 정보 수정 섹션 */}
      <section className={styles.section}>
        <Text className={styles.sectionTitle}>선거 채널 정보 수정</Text>
        <Poster
          size='lg'
          className={styles.poster}
          src={
            typeof data.data.voteTeam.poster === 'string'
              ? data.data.voteTeam.poster
              : undefined
          }
          // onChange={() => console.log('Poster chaged')}
        />
        <BaseButton kind='base' status='fill' type='button'>
          포스터 업로드
        </BaseButton>
      </section>

      {/* 칭호 입력 */}
      <section className={styles.section}>
        <InputField
          id='prefix-input'
          label='칭호'
          value={data.data.voteTeam.prefix}
          onChange={() => console.log('칭호 변경')}
          placeholder='태호'
        />
      </section>

      {/* 상태 메세지 */}
      <section className={styles.section}>
        <InputField
          id='candidateStatement-input'
          label='상태 메세지'
          value={data.data.voteTeam.candidateStatement}
          onChange={() => console.log('candidateStatement changed')}
          placeholder='자신을 자유롭게 소개해보세요!'
        />
        <div className={styles.charCount}>
          {data.data.voteTeam.candidateStatement.length} / 100
        </div>
      </section>

      {/* 공약 입력 */}
      <section className={styles.section}>
        <div className={styles.pledgeHeader}>
          <Text>공약</Text>
          <Text className={styles.pledgeCount}>
            {data.data.pledges.length} / 5
          </Text>
        </div>
        {data.data.pledges.map((pledge, index) => (
          <InputField
            id='pledge-input'
            key={index}
            value={pledge.content}
            onChange={() => console.log('공약 InputField Changed')}
            placeholder='매력적인 공약을 작성해보세요! (개당 100자)'
          />
        ))}
        {data.data.pledges.length < 5 && (
          <BaseButton
            type='button'
            kind='base'
            status='fill'
            onClick={handlePledgeAdd}
          >
            + 추가
          </BaseButton>
        )}
      </section>

      {/* 수정하기 버튼 */}
      <BaseButton
        kind='base'
        status='fill'
        type='submit'
        // disabled={mutation.isPending}
      >
        {mutation.isPending ? '수정 중...' : '수정하기'}
      </BaseButton>
    </form>
  );
}
