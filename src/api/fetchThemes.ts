import { useEffect, useState } from 'react';
import type { CategoryTheme } from '@/types';
import axios from 'axios';
import { API_BASE } from '@/constant/constant';

const fetchThemes = async () => {
  const { data } = await axios(`${API_BASE}/api/themes`);
  return data.data;
};

export const useFetchThemes = () => {
  const [themes, setThemes] = useState<CategoryTheme[]>([]);
  const [themesLoading, setThemesLoading] = useState(true);
  const [themesError, setThemesError] = useState(false);

  useEffect(() => {
    setThemesLoading(true);
    setThemesError(false);
    fetchThemes()
      .then(setThemes)
      .catch(() => setThemesError(true))
      .finally(() => setThemesLoading(false));
  }, []);

  return { themes, themesLoading, themesError };
};
