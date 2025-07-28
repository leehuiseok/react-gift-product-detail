import { useQuery } from '@tanstack/react-query';
import { fetchProductHighlightReview } from '@/api/fetchProductHighlightReview';

type ProductHighlightReview = {
  reviews: {
    id: string;
    authorName: string;
    content: string;
  }[];
};
export function useProductHighlightReview(productId: string) {
  return useQuery<ProductHighlightReview>({
    queryKey: ['productHighlightReview', productId],
    queryFn: () => fetchProductHighlightReview(productId),
    enabled: !!productId,
  });
}
