import { type Product } from '@/types';
import axios from 'axios';
import { API_BASE } from '@/constant/constant';
import { useQuery } from '@tanstack/react-query';

// API 호출 함수 (내부에서만 사용)
async function fetchRanking(targetType: string, rankType: string): Promise<Product[]> {
  const { data } = await axios(`${API_BASE}/api/products/ranking`, {
    params: { targetType, rankType },
  });
  return data.data;
}

// 커스텀 훅
export function useRanking(targetType: string, rankType: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['ranking', targetType, rankType],
    queryFn: () => fetchRanking(targetType, rankType),
  });

  return { data, isLoading, error };
}
