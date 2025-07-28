import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchProductDetail } from '@/api/fetchProductDetail';

export const useProductDetail = (productId: string) => {
  return useSuspenseQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => fetchProductDetail(productId),
  });
};
