import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './index.module.scss';
import BaseButton from '@/components/atoms/BaseButton';
import CandidateInfoSection from '@/components/organisms/CandidateInfoSection';
import { VoteTeamInfoRequest } from '@/types/user';
import { usePledges } from '@/hooks/usePledges';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useVoteTeamInfoFormData } from '@/hooks/useVoteTeamInfoFormData';
import { useCandidateInfo } from '@/services/hooks/useCandidateInfo';
import { useUpdateCandidateInfo } from '@/services/hooks/useUpdateCandidateInfo';

export default function CandidateInfoUpdateTemplate() {
  const [imgPreview, setImgPreview] = useState<string>('');
  const { session_id, user_id } = useParams();

  // 공약 usePledges
  const {
    pledges,
    setPledges,
    handlePledgeChange,
    handleAddPledge,
    handleDeletePledge,
  } = usePledges();

  // 파일 useFileUpload
  const { fileInputRef, handleUploadClick, handleFileChange, fileData } =
    useFileUpload({
      maxSize: 5,
      acceptedTypes: ['image/jpeg', 'image/png'],
      onSuccess: (file, preview) => {
        setImgPreview(preview);
      },
      onError: (message) => {
        alert(message);
      },
    });

  // 후보자 기본 정보
  const { voteTeamInfoFormData, setVoteTeamInfoFormData, handleChange } =
    useVoteTeamInfoFormData({
      voteTeamId: 0,
      prefix: '',
      candidateStatement: '',
    });

  // 값이 없는 경우 얼리 리턴
  if (!session_id || !user_id) {
    return <div>잘못된 접근입니다.</div>;
  }

  // 쿼리 훅
  const { data, error } = useCandidateInfo(session_id, user_id);

  //================================
  // 후보자 정보 최초 폼 초기화
  //================================
  useEffect(() => {
    if (data?.voteTeam) {
      const { voteTeam, pledges } = data;
      // formData 초기화
      setVoteTeamInfoFormData({
        prefix: voteTeam.prefix || '',
        candidateStatement: voteTeam.candidateStatement || '',
        voteTeamId: Number(voteTeam.voteTeamId),
      });

      // 이미지 미리보기 초기화
      if (voteTeam.poster) {
        setImgPreview(voteTeam.poster);
      }

      const initialPledges = pledges.map((pledge) => pledge.content);
      setPledges(initialPledges);
    } else if (error) {
      console.error('후보자 정보 폼 초기화 에러 : ', error);
    }
  }, [data, error]);

  //================================
  // 후보자 정보 업데이트
  //================================
  const updateMutation = useUpdateCandidateInfo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const voteTeamInfoRequest: VoteTeamInfoRequest = {
        voteTeam: {
          voteTeamId: voteTeamInfoFormData.voteTeamId,
          prefix: voteTeamInfoFormData.prefix,
          candidateStatement: voteTeamInfoFormData.candidateStatement,
        },
        pledges: pledges.map((pledge) => ({
          content: pledge,
        })),
      };
      updateMutation.mutate({
        sessionId: session_id,
        voteTeamInfoRequest,
        file: fileData.file,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('API 에러 상세:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
          request: {
            url: error.config?.url,
            method: error.config?.method,
            data: error.config?.data,
          },
        });

        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          '요청이 실패했습니다.';

        alert(`수정 실패: ${errorMessage}`);
      } else {
        console.error('알 수 없는 에러:', error);
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <CandidateInfoSection
        prefix={voteTeamInfoFormData.prefix}
        candidateStatement={voteTeamInfoFormData.candidateStatement}
        pledges={pledges}
        posterSrc={imgPreview}
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
