import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../api';

const useApiInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = instance.interceptors.response.use(
      (response) => response.data.data,
      (error) => {
        console.log('API 요청 에러:', error);

        if (error.response) {
          const { status, data } = error.response;
          console.error('에러 발생', data);

          if (status === 401) {
            navigate('/login');
            console.log('인증이 필요합니다.');
          } else if (status === 403) {
            console.log('접근 권한이 없습니다.');
            const currentPath = window.location.pathname;
            const regex = /^\/elections\/(\d+)$/;
            const match = currentPath.match(regex);

            let newPath = '/elections/list';
            if (match) {
              const electionId = match[1];
              newPath = `/elections/${electionId}/question`;
            }
            navigate(newPath);
          } else if (status === 404) {
            console.log('리소스를 찾을 수 없습니다.');
          } else if (status === 500) {
            console.log('서버에 에러가 있습니다.');
          }
        } else if (error.request) {
          console.log('네트워크 에러가 발생했습니다.');
        } else {
          console.log('알 수 없는 에러가 발생했습니다.');
        }

        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);
};

export default useApiInterceptor;
