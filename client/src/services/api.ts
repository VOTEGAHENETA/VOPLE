import axios from 'axios';

const { VITE_PUBLIC_API_URL } = import.meta.env;

const instance = axios.create({
  baseURL: VITE_PUBLIC_API_URL,
  timeout: 5_000,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    return response.data.data;
  },
  (error) => {
    console.log('API 요청 에러:', error);

    // 에러로 응답이 발생한 경우
    if (error.response) {
      const { status, data } = error.response;
      console.error('에러 발생', data);

      if (status === 401) {
        console.log('인증이 필요합니다.');
      } else if (status === 403) {
        console.log('접근 권한이 없습니다.');
        const currentPath = window.location.pathname;
        const regex = /^\/elections\/(\d+)(?:\/(\d+))?$/;
        const match = currentPath.match(regex);

        let newPath;
        if (match) {
          const electionId = match[1];
          const voteId = match[2];

          if (voteId) {
            // 투표 접근 권한
            newPath = `/elections/${electionId}`;
          } else {
            // 선거 접근 권한
            newPath = `/elections/${electionId}/question`;
          }
        } else {
          // 예상치 못한 URL 구조일 경우
          newPath = '/elections';
        }
        window.location.href = newPath;
      } else if (status === 404) {
        console.log('리소스를 찾을 수 없습니다.');
      } else if (status === 500) {
        console.log('서버에 에러가 있습니다.');
      }
    } else if (error.request) {
      // 응답이 없는 경우
      console.log('네트워크 에러가 발생했습니다.');
    } else {
      console.log('알 수 없는 에러가 발생했습니다.');
    }
    return Promise.reject(error);
  }
);

export default instance;
