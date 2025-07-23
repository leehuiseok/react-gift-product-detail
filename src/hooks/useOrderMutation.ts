import { useMutation } from '@tanstack/react-query';
import { fetchOrder, type OrderRequest } from '@/api/fetchOrder';

export function useOrderMutation() {
  return useMutation({
    mutationFn: ({ orderData, authToken }: { orderData: OrderRequest; authToken: string }) =>
      fetchOrder(orderData, authToken),
  });
}
