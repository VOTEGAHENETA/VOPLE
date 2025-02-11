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

  interface VoteTeamInfoRequest {
    user: {
      userId: number;
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
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // VoteTeamInfoRequest DTO 생성
      const voteTeamInfoRequest: VoteTeamInfoRequest = {
        user: {
          userId: 1,
          username: UserInfoFormData.username,
        },
        voteTeam: {
          poster: 'poster-url',
          prefix: UserInfoFormData.prefix,
          candidateStatement: UserInfoFormData.candidateStatement,
        },
        pledges: pledges.map((pledge) => ({
          content: pledge,
        })),
      };

      // DTO를 FormData에 추가
      formData.append(
        'voteTeamInfoRequest',
        new Blob([JSON.stringify(voteTeamInfoRequest)], {
          type: 'application/json',
        })
      );

      // 파일이 있는 경우 추가
      if (fileData.file) {
        formData.append('file', fileData.file);
      }

      // FormData 내용 확인을 위한 로깅
      console.log('=== FormData 상세 내용 ===');
      for (let [key, value] of formData.entries()) {
        if (key === 'voteTeamInfoRequest') {
          // Blob 데이터는 텍스트로 변환해서 확인
          const blobText = await new Response(value as Blob).text();
          console.log(`${key}:`, JSON.parse(blobText));
        } else if (key === 'file') {
          console.log('파일 정보:', {
            이름: (value as File).name,
            크기: (value as File).size,
            타입: (value as File).type,
            최종수정: new Date((value as File).lastModified).toLocaleString(),
          });
        } else {
          console.log(`${key}:`, value);
        }
      }

      // 전체 키 목록 확인
      console.log('=== FormData 키 목록 ===');
      for (let key of formData.keys()) {
        console.log('키:', key);
      }

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
