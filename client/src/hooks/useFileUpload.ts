import { useRef, useState } from 'react';

interface UseFileUploadProps {
  maxSize?: number; // MB 단위
  acceptedTypes?: string[]; // 허용할 파일 타입 배열
  onSuccess?: (file: File, preview: string) => void;
  onError?: (message: string) => void;
}

interface FileData {
  file: File | null;
  preview: string;
}

export const useFileUpload = ({
  maxSize = 5, // 기본 5MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/gif'], // 기본 이미지 타입
  onSuccess,
  onError,
}: UseFileUploadProps = {}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 파일 데이터 상태 추가
  const [fileData, setFileData] = useState<FileData>({
    file: null,
    preview: '',
  });

  // 업로드 버튼 클릭 시, 파일 선택창 뜸
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const validateFile = (file: File): string | null => {
    // 파일 타입 검사
    if (!acceptedTypes.includes(file.type)) {
      return `허용된 파일 형식이 아닙니다. (${acceptedTypes.join(', ')})`;
    }

    // 파일 크기 검사 (MB -> Bytes 변환)
    const maxBytes = maxSize * 1024 * 1024;
    if (file.size > maxBytes) {
      return `파일 크기는 ${maxSize}MB 이하여야 합니다.`;
    }

    return null;
  };

  // 파일이 선택될 때 저장됨
  // const handleFileChange = async (file: File) => {
  //   try {
  //     setIsLoading(true);
  //     // const file = e.target.files?.[0];

  //     if (!file) {
  //       throw new Error('파일이 선택되지 않았습니다.');
  //     }

  //     // 파일 유효성 검사
  //     const errorMessage = validateFile(file);
  //     if (errorMessage) {
  //       throw new Error(errorMessage);
  //     }

  //     // 이미지 프리뷰 생성
  //     const preview = await new Promise<string>((resolve, reject) => {
  //       const reader = new FileReader();

  //       reader.onload = () => {
  //         resolve(reader.result as string);
  //       };

  //       reader.onerror = () => {
  //         reject(new Error('파일 읽기에 실패했습니다.'));
  //       };

  //       reader.readAsDataURL(file);
  //     });

  //     // 성공 콜백 실행
  //     onSuccess?.(file, preview);
  //   } catch (error) {
  //     // 에러 처리
  //     const message =
  //       error instanceof Error
  //         ? error.message
  //         : '파일 업로드 중 오류가 발생했습니다.';
  //     onError?.(message);

  //     // 파일 인풋 초기화
  //     if (fileInputRef.current) {
  //       fileInputRef.current.value = '';
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleFileChange = async (file: File) => {
    try {
      setIsLoading(true);
      // const file = e.target.files?.[0];

      if (!file) {
        throw new Error('파일이 선택되지 않았습니다.');
      }

      const errorMessage = validateFile(file);
      if (errorMessage) {
        throw new Error(errorMessage);
      }

      const preview = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('파일 읽기에 실패했습니다.'));
        reader.readAsDataURL(file);
      });

      // 파일 데이터 상태 업데이트
      setFileData({ file, preview });

      // 성공 콜백 실행 - 부모 컴포넌트에서 추가 처리가 필요한 경우
      onSuccess?.(file, preview);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : '파일 업로드 중 오류가 발생했습니다.';
      onError?.(message);
      setFileData({ file: null, preview: '' });

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fileInputRef,
    handleUploadClick,
    handleFileChange,
    isLoading,
    fileData, // 파일 데이터 반환
  };
};
