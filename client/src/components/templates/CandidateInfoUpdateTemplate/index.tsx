import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './index.module.scss';
import BaseButton from '@/components/atoms/BaseButton';
// import samplePoster from '@/assets/sample/sample.png';

import CandidateInfoSection from '@/components/organisms/CandidateInfoSection';
import { usePledges } from '@/hooks/usePledges';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useParams } from 'react-router-dom';
import { useCandidateInfo } from '@/services/hooks/useCandidateInfo';
import { useCandidateInfoFormData } from '@/hooks/useCandidateInfoFormData';

const API_URL = import.meta.env.VITE_PUBLIC_API_URL;

// ============
// 타입 정의
// ============
interface VoteTeamInfoRequest {
  voteTeam: {
    voteTeamId: number;
    prefix: string;
    candidateStatement: string;
  };
  pledges: Array<{
    content: string;
  }>;
}

// const fetchCandidateInfo = async (sessionId: string, userId: string) => {
//   const response = await axios.get(
//     `${API_URL}/candidate/${sessionId}/${userId}`
//   );
//   return response.data;
// };

export default function CandidateInfoUpdateTemplate() {
  const [imgPreview, setImgPreview] = useState<string>('');
  const { sessionId = '1', voteTeamId = '57' } = useParams();

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
        //file, preview
        // 파일 업로드 성공 시 처리
        alert('파일 업로드 성공! ');
      },
      onError: (message) => {
        alert(message);
      },
    });

  // 후보자 기본 정보
  const { candidateInfoFormData, setCandidateInfoFormData, handleChange } =
    useCandidateInfoFormData({
      // nickname: '',
      // username: '',
      prefix: '',
      candidateStatement: '',
    });

  // 사용자 기본 정보
  // const { UserInfoFormData, setUserInfoFormData, handleChange } =
  //   useUserInfoFormData({
  //     nickname: '',
  //     username: '',
  //     // prefix: '',
  //     // candidateStatement: '',
  //   });

  // 쿼리 훅 사용하여 데이터 정보 받아옴

  console.log('sessionId :' + sessionId + '/' + 'voteTeamId : ' + voteTeamId);
  const { data, error } = useCandidateInfo(sessionId, voteTeamId);

  //================================
  // 후보자 정보 최초 폼 초기화
  //================================
  useEffect(() => {
    if (data?.voteTeam) {
      const { voteTeam, pledges } = data;
      // formData 초기화
      setCandidateInfoFormData({
        prefix: voteTeam.prefix || '',
        candidateStatement: voteTeam.candidateStatement || '',
      });

      // 이미지 미리보기 초기화
      if (voteTeam.poster) {
        setImgPreview(voteTeam.poster);
      }
      // setImgPreview(voteTeam.poster || '');

      // pledges 초기화
      const initialPledges = pledges.map((pledge) => pledge.content);
      setPledges(initialPledges);
    } else if (error) {
      console.error('후보자 정보 폼 초기화 에러 : ', error);
    }
  }, [data, error]);

  //================================
  // 후보자 정보 업데이트
  //================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 전송할 데이터 묶음
      const formData = new FormData();

      // VoteTeamInfoRequest DTO 생성
      const voteTeamInfoRequest: VoteTeamInfoRequest = {
        voteTeam: {
          voteTeamId: 57, // voteTeamId 추가
          prefix: candidateInfoFormData.prefix,
          candidateStatement: candidateInfoFormData.candidateStatement,
        },
        pledges: pledges.map((pledge) => ({
          content: pledge,
        })),
      };

      // DTO를 FormData에 추가
      formData.append(
        'data',
        new Blob([JSON.stringify(voteTeamInfoRequest)], {
          type: 'application/json',
        })
      );

      // 파일이 있는 경우 추가
      if (fileData.file) {
        formData.append('file', fileData.file);
      }

      // FormData 내용 확인
      console.log('==== FormData 내용 확인 ====');
      for (const pair of formData.entries()) {
        if (pair[1] instanceof Blob) {
          console.log('Blob 데이터:', pair[0], {
            type: pair[1].type,
            size: pair[1].size,
          });

          // Blob 내용이 JSON인 경우 읽어서 출력
          if (pair[1].type === 'application/json') {
            const text = await pair[1].text();
            console.log('JSON 내용:', JSON.parse(text));
          }
        } else {
          console.log(pair[0], pair[1]);
        }
      }

      // 전송 데이터 확인
      console.log('==== 전송할 요청 정보 ====');
      console.log('URL:', `${API_URL}/candidate/${sessionId}/${voteTeamId}`);
      console.log('VoteTeamInfoRequest:', voteTeamInfoRequest);
      console.log('파일 존재 여부:', !!fileData.file);
      if (fileData.file) {
        console.log('파일 정보:', {
          name: fileData.file.name,
          type: fileData.file.type,
          size: fileData.file.size,
        });
      }

      const response = await axios.post(
        // `${API_URL}/candidate/${sessionId}/${voteTeamId}`,
        `${API_URL}/candidate/${sessionId}/${voteTeamId}`,
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
      {/* <UserInfoSection
        nickname={UserInfoFormData.nickname}
        username={UserInfoFormData.username}
        onChangeField={handleChange}
      /> */}

      <CandidateInfoSection
        prefix={candidateInfoFormData.prefix}
        candidateStatement={candidateInfoFormData.candidateStatement}
        pledges={pledges}
        // posterSrc={samplePoster}
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
