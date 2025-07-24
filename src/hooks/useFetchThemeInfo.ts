import { useQuery } from '@tanstack/react-query';
import { fetchThemeInfo } from '@/api/fetchThemeInfo';

export const useFetchThemeInfo = (themeId: string) => {
  return useQuery({
    queryKey: ['themeInfo', themeId],
    queryFn: () => fetchThemeInfo(themeId),
    enabled: !!themeId,
    retry: false,
  });
};
