import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchRanking } from '@/api/fetchRanking';

export function useRanking(targetType: string, rankType: string) {
  return useSuspenseQuery({
    queryKey: ['ranking', targetType, rankType],
    queryFn: () => fetchRanking(targetType, rankType),
  });
}
