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

export default function CandidateInfoUpdateTemplate() {
  const [imgPreview, setImgPreview] = useState<string>('');
  const { session_id, user_id } = useParams();
  console.log('params : ' + session_id + '/' + user_id);

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
  const { candidateInfoFormData, setCandidateInfoFormData, handleChange } =
    useCandidateInfoFormData({
      // nickname: '',
      // username: '',
      voteTeamId: 0,
      prefix: '',
      candidateStatement: '',
    });

  // 쿼리 훅 사용하여 데이터 정보 받아옴
  console.log('sessionId :' + session_id + '/' + 'voteTeamId : ' + user_id);

  // 값이 없는 경우 얼리 리턴
  if (!session_id || !user_id) {
    return <div>잘못된 접근입니다.</div>;
  }
  const { data, error } = useCandidateInfo(session_id, user_id);

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
        voteTeamId: Number(voteTeam.voteTeamId),
      });

      console.log('voteTeam.poster : ', voteTeam.poster);
      // 이미지 미리보기 초기화
      if (voteTeam.poster) {
        setImgPreview(voteTeam.poster);
      }
      console.log('imgPreview :', imgPreview);
      // 이미지 미리보기 초기화
      // poster 경로가 있는 경우에만 API_URL과 결합
      // if (voteTeam.poster) {
      //   // 1. URL이 이미 완전한 형태인지 확인
      //   if (voteTeam.poster.startsWith('http')) {
      //     setImgPreview(voteTeam.poster);
      //   } else {
      //     // 2. 상대 경로인 경우 API_URL과 결합
      //     // URL 끝에 '/'가 있는지 확인하고 적절히 처리
      //     const baseUrl = API_URL.endsWith('/') ? API_URL : `${API_URL}/`;
      //     const posterPath = voteTeam.poster.startsWith('/')
      //       ? voteTeam.poster.slice(1)
      //       : voteTeam.poster;
      //     console.log('baseUrl + posterPath', `${baseUrl}${posterPath}`);
      //     setImgPreview(`${baseUrl}${posterPath}`);
      //   }
      // }
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
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     // 전송할 데이터 묶음
  //     const formData = new FormData();

  //     // VoteTeamInfoRequest DTO 생성
  //     const voteTeamInfoRequest: VoteTeamInfoRequest = {
  //       voteTeam: {
  //         voteTeamId: candidateInfoFormData.voteTeamId, // voteTeamId 추가
  //         prefix: candidateInfoFormData.prefix,
  //         candidateStatement: candidateInfoFormData.candidateStatement,
  //       },
  //       pledges: pledges.map((pledge) => ({
  //         content: pledge,
  //       })),
  //     };

  //     // DTO를 FormData에 추가
  //     formData.append(
  //       'data',
  //       new Blob([JSON.stringify(voteTeamInfoRequest)], {
  //         type: 'application/json',
  //       })
  //     );

  //     // 파일이 있는 경우 추가
  //     if (fileData.file) {
  //       formData.append('file', fileData.file);
  //     }

  //     // FormData 내용 확인
  //     console.log('==== FormData 내용 확인 ====');
  //     for (const pair of formData.entries()) {
  //       if (pair[1] instanceof Blob) {
  //         console.log('Blob 데이터:', pair[0], {
  //           type: pair[1].type,
  //           size: pair[1].size,
  //         });

  //         // Blob 내용이 JSON인 경우 읽어서 출력
  //         if (pair[1].type === 'application/json') {
  //           const text = await pair[1].text();
  //           console.log('JSON 내용:', JSON.parse(text));
  //         }
  //       } else {
  //         console.log(pair[0], pair[1]);
  //       }
  //     }

  //     // 전송 데이터 확인
  //     console.log('==== 전송할 요청 정보 ====');
  //     console.log('URL:', `${API_URL}/candidate/${session_id}`);
  //     console.log('VoteTeamInfoRequest:', voteTeamInfoRequest);
  //     console.log('파일 존재 여부:', !!fileData.file);
  //     if (fileData.file) {
  //       console.log('파일 정보:', {
  //         name: fileData.file.name,
  //         type: fileData.file.type,
  //         size: fileData.file.size,
  //       });
  //     }

  //     const response = await axios.post(
  //       // `${API_URL}/candidate/${sessionId}/${voteTeamId}`,
  //       `${API_URL}/candidate/${session_id}`,
  //       formData,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       alert('수정이 완료되었습니다.');
  //     }
  //   } catch (error) {
  //     console.error('수정 실패:', error);
  //     alert('수정에 실패했습니다.');
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!session_id) {
        throw new Error('세션 ID가 없습니다.');
      }

      const formData = new FormData();
      const voteTeamInfoRequest: VoteTeamInfoRequest = {
        voteTeam: {
          voteTeamId: candidateInfoFormData.voteTeamId, // voteTeamId: 72,
          prefix: candidateInfoFormData.prefix,
          candidateStatement: candidateInfoFormData.candidateStatement,
        },
        pledges: pledges.map((pledge) => ({
          content: pledge,
        })),
      };

      // 전송 전 데이터 검증 로그
      console.log('=== 전송 데이터 검증 ===');
      console.log('voteTeamId:', candidateInfoFormData.voteTeamId);
      console.log('prefix:', candidateInfoFormData.prefix);
      console.log(
        'candidateStatement:',
        candidateInfoFormData.candidateStatement
      );
      console.log('pledges:', pledges);

      formData.append(
        'voteTeamInfoRequest',
        new Blob([JSON.stringify(voteTeamInfoRequest)], {
          type: 'application/json',
        })
      );

      if (fileData.file) {
        formData.append('file', fileData.file);
      }
      console.log(
        '##### voteTeamInfoRequest voteTeam',
        voteTeamInfoRequest.voteTeam.voteTeamId
      );
      const response = await axios.post(
        `${API_URL}/candidate/${session_id}`,
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
      if (axios.isAxiosError(error)) {
        // 에러 응답 상세 정보 출력
        console.error('API 에러 상세:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
          // 요청 정보도 함께 출력
          request: {
            url: error.config?.url,
            method: error.config?.method,
            data: error.config?.data,
          },
        });

        // 사용자에게 구체적인 에러 메시지 표시
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          '요청이 실패했습니다.';

        alert(`수정 실패: ${errorMessage}`);
      } else {
        console.error('알 수 없는 에러:', error);
        alert('알 수 없는 오류가 발생했습니다.');
      }
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
