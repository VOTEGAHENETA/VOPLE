import React, { useEffect } from 'react';
import axios from 'axios';
import styles from './index.module.scss';
import BaseButton from '@/components/atoms/BaseButton';
import samplePoster from '@/assets/sample/sample.png';
import UserInfoSection from '@/components/organisms/UserInfoSection';
import CandidateInfoSection from '@/components/organisms/CandidateInfoSection';
import { useUserInfoFormData } from '@/hooks/useUserInfoFormData';
import { usePledges } from '@/hooks/usePledges';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useParams } from 'react-router-dom';
import { useGetCandidateInfo } from '@/services/hooks/useCandidateInfo';

const API_URL = import.meta.env.VITE_PUBLIC_API_URL;

// const fetchCandidateInfo = async (sessionId: string, userId: string) => {
//   const response = await axios.get(
//     `${API_URL}/candidate/${sessionId}/${userId}`
//   );
//   return response.data;
// };

export default function CandidateInfoUpdateTemplate() {
  const { sessionId = '', userId = '' } = useParams();
  const {
    pledges,
    setPledges,
    handlePledgeChange,
    handleAddPledge,
    handleDeletePledge,
  } = usePledges();
  const { fileInputRef, handleUploadClick, handleFileChange, fileData } =
    useFileUpload({
      maxSize: 5,
      acceptedTypes: ['image/jpeg', 'image/png'],
      onSuccess: (file, preview) => {
        // 파일 업로드 성공 시 처리
        console.log('File upload success:', file);
        console.log('File upload success preview:', preview);
      },
      onError: (message) => {
        alert(message);
      },
    });

  const { UserInfoFormData, setUserInfoFormData, handleChange } =
    useUserInfoFormData({
      nickname: '',
      username: '',
      prefix: '',
      candidateStatement: '',
    });

  // 쿼리 훅 사용
  const { data, error } = useGetCandidateInfo(sessionId, userId);

  // 데이터가 변경될 때마다 폼 초기화
  useEffect(() => {
    console.log('Candidate useEffect');
    console.error('Candidate Data : ', data);
    if (data?.data) {
      const { user, voteTeam, pledges: fetchedPledges } = data.data;
      // formData 초기화
      setUserInfoFormData({
        nickname: user.nickname,
        username: user.username,
        prefix: voteTeam.prefix,
        candidateStatement: voteTeam.candidateStatement,
      });

      // pledges 초기화
      const initialPledges = fetchedPledges.map((pledge) => pledge.content);
      setPledges(initialPledges);
    } else if (error) {
      console.error(error);
    }
  }, [data, error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // FormData 생성
      const formData = new FormData();

      // 파일이 있는 경우에만 추가
      if (fileData.file) {
        formData.append('poster', fileData.file);
      }

      // JSON 데이터를 문자열로 변환하여 추가
      const jsonData = {
        user: {
          userId: userId,
          username: UserInfoFormData.username,
        },
        voteTeam: {
          prefix: UserInfoFormData.prefix,
          candidateStatement: UserInfoFormData.candidateStatement,
        },
        pledges: pledges.map((pledge) => ({
          content: pledge,
        })),
      };

      formData.append(
        'data',
        new Blob([JSON.stringify(jsonData)], {
          type: 'application/json',
        })
      );

      // 방법 1: FormData의 모든 key-value 쌍 출력
      console.log('=== FormData 내용 확인 ===');
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      // 방법 2: JSON 데이터 내용 확인
      console.log('=== JSON 데이터 확인 ===');
      console.log('전송할 JSON 데이터:', jsonData);

      // 방법 3: FormData에서 특정 키의 값 확인
      console.log('=== 개별 필드 확인 ===');
      console.log('poster:', formData.get('poster'));
      console.log('data:', formData.get('data'));

      const response = await axios.post(
        `${API_URL}/candidate/${sessionId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
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
    <form className={styles.form} onSubmit={handleSubmit}>
      <UserInfoSection
        nickname={UserInfoFormData.nickname}
        username={UserInfoFormData.username}
        onChangeField={handleChange}
      />

      <CandidateInfoSection
        prefix={UserInfoFormData.prefix}
        candidateStatement={UserInfoFormData.candidateStatement}
        pledges={pledges}
        posterSrc={samplePoster}
        fileInputRef={fileInputRef}
        onChangeField={handleChange}
        onUploadClick={handleUploadClick}
        onFileChange={handleFileChange}
        handlePledgeChange={handlePledgeChange}
        handleAddPledge={handleAddPledge}
        handleDeletePledge={handleDeletePledge}
      />

      <BaseButton kind='base' status='fill' type='submit'>
        수정하기
      </BaseButton>
    </form>
  );
}
