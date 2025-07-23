import type { CategoryTheme } from '@/types';
import axios from 'axios';
import { API_BASE } from '@/constant/constant';
import { useQuery } from '@tanstack/react-query';

const fetchThemes = async () => {
  const { data } = await axios.get<{ data: CategoryTheme[] }>(`${API_BASE}/api/themes`);
  return data.data;
};

export const useFetchThemes = () => {
  const { data, isLoading, error } = useQuery<CategoryTheme[]>({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  });

  return { data, isLoading, error };
};
