import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchProductSummary } from '@/api/fetchProductSummary';

export function useFetchProductSummary(productId: string) {
  return useSuspenseQuery({
    queryKey: ['productSummary', productId],
    queryFn: () => fetchProductSummary(productId),
    retry: false,
  });
}
