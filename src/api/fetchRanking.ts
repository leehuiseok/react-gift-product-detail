import { type Product } from '@/types';
import axios from 'axios';
import { API_BASE } from '@/constant/constant';

// API 호출 함수 (내부에서만 사용)
export async function fetchRanking(targetType: string, rankType: string): Promise<Product[]> {
  const { data } = await axios(`${API_BASE}/api/products/ranking`, {
    params: { targetType, rankType },
  });
  return data.data;
}
