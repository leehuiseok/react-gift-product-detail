import axios from 'axios';
import { API_BASE } from '@/constant/constant';

export async function fetchToggleProductWish(productId: string, authToken: string) {
  const { data } = await axios.post(
    `${API_BASE}/api/products/${productId}/wish`,
    {},
    {
      headers: {
        Authorization: authToken,
        'Content-Type': 'application/json',
      },
    },
  );
  return data.data;
}
