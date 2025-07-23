import axios from 'axios';
import { API_BASE } from '@/constant/constant';
import type { Product } from '@/types';

export async function fetchThemeProduct(
  themeId: string,
  cursor?: number,
  limit: number = 10,
): Promise<ThemeProductResponse> {
  const params = new URLSearchParams();
  if (cursor !== undefined) {
    params.append('cursor', cursor.toString());
  }
  params.append('limit', limit.toString());

  const { data } = await axios.get<{ data: ThemeProductResponse }>(
    `${API_BASE}/api/themes/${themeId}/products?${params}`,
  );
  return data.data;
}

interface ThemeProductResponse {
  list: Product[];
  cursor: number;
  hasMoreList: boolean;
}
