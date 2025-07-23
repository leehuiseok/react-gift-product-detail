import axios from 'axios';
import { API_BASE } from '@/constant/constant';
import type { Product } from '@/types';

import { useInfiniteQuery } from '@tanstack/react-query';

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

export const useFetchThemeProduct = (themeId: string) => {
  return useInfiniteQuery({
    queryKey: ['themeProduct', themeId],
    queryFn: ({ pageParam = 0 }) => fetchThemeProduct(themeId, pageParam, 10),
    getNextPageParam: (lastPage) => (lastPage.hasMoreList ? lastPage.cursor : undefined),
    initialPageParam: 0,
  });
};

//   const [themeProduct, setThemeProduct] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [cursor, setCursor] = useState<number | null>(null);
//   const [hasMoreList, setHasMoreList] = useState(true);

//   const fetchProducts = useCallback(
//     async (currentCursor?: number) => {
//       try {
//         setLoading(true);
//         setError(null);

//         const response = await fetchThemeProduct(themeId, currentCursor);
//         const data: ThemeProductResponse = response;

//         if (currentCursor) {
//           // 추가 로딩
//           setThemeProduct((prev) => [...prev, ...data.list]);
//         } else {
//           // 초기 로딩
//           setThemeProduct(data.list);
//         }

//         setCursor(data.cursor);
//         setHasMoreList(data.hasMoreList);
//       } catch (err) {
//         if (axios.isAxiosError(err)) {
//           setError(err.response?.data.message);
//         } else {
//           setError('알 수 없는 오류가 발생했습니다.');
//         }
//       } finally {
//         setLoading(false);
//       }
//     },
//     [themeId],
//   );

//   const loadMore = useCallback(() => {
//     if (!loading && hasMoreList && cursor !== null) {
//       fetchProducts(cursor);
//     }
//   }, [fetchProducts, hasMoreList, loading, cursor]);

//   useEffect(() => {
//     if (themeId) {
//       fetchProducts();
//     }
//   }, [fetchProducts, themeId]);

//   return {
//     themeProduct,
//     loading,
//     error,
//     hasMoreList,
//     loadMore,
//   };
// };
