import axios from 'axios';
import type { Product } from '@/types';
import { API_BASE } from '@/constant/constant';

export async function fetchProductSummary(productId: string): Promise<Product> {
  const { data } = await axios.get(`${API_BASE}/api/products/${productId}`);
  return data.data;
}
