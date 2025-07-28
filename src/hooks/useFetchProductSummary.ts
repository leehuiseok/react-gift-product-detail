import { useQuery } from '@tanstack/react-query';
import { fetchProductSummary } from '@/api/fetchProductSummary';

export function useFetchProductSummary(productId: string) {
  return useQuery({
    queryKey: ['productSummary', productId],
    queryFn: () => fetchProductSummary(productId),
    enabled: !!productId,
    retry: false,
  });
}
