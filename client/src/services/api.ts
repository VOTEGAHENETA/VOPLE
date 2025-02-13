import axios from 'axios';

const { VITE_PUBLIC_API_URL } = import.meta.env;

const instance = axios.create({
  baseURL: VITE_PUBLIC_API_URL,
  timeout: 5_000,
});

axios.defaults.withCredentials = true;

instance.interceptors.response.use(
  (response) => {
    return response.data.data;
  },
  (error) => {
    console.error('API 요청 에러:', error);

    // 에러로 응답이 발생한 경우
    if (error.response) {
      const { status, data } = error.response;
      console.error('에러 발생', data);

      if (status === 401) {
        console.log('인증이 필요합니다.');
      } else if (status === 403) {
        console.log('접근 권한이 없습니다.');
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
