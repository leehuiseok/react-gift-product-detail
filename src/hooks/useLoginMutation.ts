import { useMutation } from '@tanstack/react-query';
import { fetchLogin } from '@/api/fetchLogin';

export function useLoginMutation() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      fetchLogin(email, password),
  });
}
