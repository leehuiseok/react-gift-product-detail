import { useQuery } from '@tanstack/react-query';
import { fetchThemes } from '@/api/fetchThemes';
import type { CategoryTheme } from '@/types';

export const useFetchThemes = () => {
  return useQuery<CategoryTheme[]>({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  });
};
