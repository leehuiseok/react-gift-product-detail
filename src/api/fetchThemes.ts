import type { CategoryTheme } from '@/types';
import axios from 'axios';
import { API_BASE } from '@/constant/constant';

export const fetchThemes = async () => {
  const { data } = await axios.get<{ data: CategoryTheme[] }>(`${API_BASE}/api/themes`);
  return data.data;
};
