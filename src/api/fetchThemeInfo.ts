import { API_BASE } from '@/constant/constant';
import axios from 'axios';

type ThemeInfo = {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
};

export async function fetchThemeInfo(themeId: string): Promise<ThemeInfo> {
  const { data } = await axios.get(`${API_BASE}/api/themes/${themeId}/info`);
  return data.data;
}
