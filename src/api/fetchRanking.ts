import { useEffect, useState } from 'react';
import { type Product } from '@/types';
import axios from 'axios';
import { API_BASE } from '@/constant/constant';

// API 호출 함수 (내부에서만 사용)
async function fetchRanking(targetType: string, rankType: string): Promise<Product[]> {
  const { data } = await axios(`${API_BASE}/api/products/ranking`, {
    params: { targetType, rankType },
  });
  return data.data;
}

// 커스텀 훅
export function useRanking(targetType: string, rankType: string) {
  const [ranking, setRanking] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchRanking(targetType, rankType)
      .then(setRanking)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [targetType, rankType]);

  return { ranking, loading, error };
}
