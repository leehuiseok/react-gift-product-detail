import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchThemeInfo } from '@/api/fetchThemeInfo';

export const useFetchThemeInfo = (themeId: string) => {
  return useSuspenseQuery({
    queryKey: ['themeInfo', themeId],
    queryFn: () => fetchThemeInfo(themeId),
    retry: false,
  });
};
