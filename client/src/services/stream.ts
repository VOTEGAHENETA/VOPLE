import axios from 'axios';
const { VITE_RTMP_API_URL } = import.meta.env;

export const sendStreamData = async (data: Blob) => {
  const formData = new FormData();
  formData.append('stream', data);

  try {
    const response = await axios.post(VITE_RTMP_API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Stream data sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending stream data:', error);
  }
};
