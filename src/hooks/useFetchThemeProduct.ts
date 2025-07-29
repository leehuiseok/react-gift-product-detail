import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { fetchThemeProduct } from '@/api/fetchThemeProduct';

export const useFetchThemeProduct = (themeId: string) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['themeProduct', themeId],
    queryFn: ({ pageParam = 0 }) => fetchThemeProduct(themeId, pageParam, 10),
    getNextPageParam: (lastPage) => (lastPage.hasMoreList ? lastPage.cursor : undefined),
    initialPageParam: 0,
  });
};
