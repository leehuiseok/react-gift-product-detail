import axios from 'axios';
import { API_BASE } from '@/constant/constant';

type ProductHighlightReview = {
  reviews: {
    id: string;
    authorName: string;
    content: string;
  }[];
};

export async function fetchProductHighlightReview(
  productId: string,
): Promise<ProductHighlightReview> {
  const { data } = await axios.get(`${API_BASE}/api/products/${productId}/highlight-review`);
  return data.data;
}
