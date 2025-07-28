import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProductWish } from '@/api/fetchProductWish';
import { fetchToggleProductWish } from '@/api/fetchToggleProductWish';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';

type ProductWish = {
  isWished: boolean;
  wishCount: number;
};

export function useProductWish(productId: string) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: wishData, isLoading } = useQuery<ProductWish>({
    queryKey: ['productWish', productId],
    queryFn: () => fetchProductWish(productId),
    enabled: !!productId,
  });

  const toggleWishMutation = useMutation({
    mutationFn: () => fetchToggleProductWish(productId, user?.authToken || ''),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['productWish', productId] });

      queryClient.setQueryData(['productWish', productId], (old: ProductWish | undefined) => {
        if (!old) return old;

        const newIsWished = !old.isWished;
        const newWishCount = newIsWished ? old.wishCount + 1 : old.wishCount - 1;

        return {
          ...old,
          isWished: newIsWished,
          wishCount: newWishCount,
        };
      });
    },
    onSuccess: () => {
      const currentData = queryClient.getQueryData(['productWish', productId]) as ProductWish;
      if (currentData?.isWished) {
        toast.success('찜 목록에 추가되었습니다!');
      } else {
        toast.success('찜 목록에서 제거되었습니다.');
      }
    },
    onError: () => {},
  });

  const handleToggleWish = () => {
    if (!user) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    if (isLoading) {
      return;
    }

    toggleWishMutation.mutate();
  };

  return {
    wishData,
    handleToggleWish,
    isToggling: toggleWishMutation.isPending,
    isLoading,
  };
}
