import axios, { AxiosError } from 'axios';
import { API_BASE } from '@/constant/constant';
import { useEffect, useState } from 'react';

type ThemeInfo = {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
};

export async function fetchThemeInfo(themeId: string): Promise<ThemeInfo> {
  const { data } = await axios.get(`${API_BASE}/api/themes/${themeId}/info`);
  return data.data;
}

export const useFetchThemeInfo = (themeId: string) => {
  const [themeInfo, setThemeInfo] = useState<ThemeInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [is404Error, setIs404Error] = useState(false);

  useEffect(() => {
    if (!themeId) return;

    setLoading(true);
    setError(false);
    setIs404Error(false);

    fetchThemeInfo(themeId)
      .then(setThemeInfo)
      .catch((err: AxiosError) => {
        if (err.response?.status === 404) {
          setIs404Error(true);
        } else {
          setError(true);
        }
      })
      .finally(() => setLoading(false));
  }, [themeId]);

  return { themeInfo, loading, error, is404Error };
};
