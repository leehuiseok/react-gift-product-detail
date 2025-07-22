import axios, { AxiosError } from 'axios';
import { API_BASE } from '@/constant/constant';

export async function fetchLogin(email: string, password: string) {
  try {
    const { data } = await axios.post(`${API_BASE}/api/login`, { email, password });
    return data.data; // { authToken, email, name }
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    // 4XX 에러 메시지 추출
    if (err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message); // 401 에러 메시지 추출
    }
    throw new Error('로그인에 실패했습니다.');
  }
}
