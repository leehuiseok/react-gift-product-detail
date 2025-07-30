import axios from 'axios';
import { API_BASE } from '@/constant/constant';

export async function fetchProductWish(productId: string) {
  const { data } = await axios.get(`${API_BASE}/api/products/${productId}/wish`);
  return data.data;
}
