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

      const previousWish = queryClient.setQueryData(
        ['productWish', productId],
        (old: ProductWish | undefined) => {
          if (!old) return old;

          const newIsWished = !old.isWished;
          const newWishCount = newIsWished ? old.wishCount + 1 : old.wishCount - 1;

          return {
            ...old,
            isWished: newIsWished,
            wishCount: newWishCount,
          };
        },
      );
      return { previousWish };
    },
    onSuccess: () => {
      const currentData = queryClient.getQueryData(['productWish', productId]) as ProductWish;
      if (currentData?.isWished) {
        toast.success('찜 목록에 추가되었습니다!');
      } else {
        toast.success('찜 목록에서 제거되었습니다.');
      }
    },
    onError: (context: { previousWish: ProductWish } | undefined) => {
      if (context?.previousWish) {
        queryClient.setQueryData(['productWish', productId], context.previousWish);
      }
      toast.error('찜 상태 변경에 실패했습니다. 다시 시도해 주세요.');
    },
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
