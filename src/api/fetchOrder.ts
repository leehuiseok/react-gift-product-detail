import axios from 'axios';
import { API_BASE } from '@/constant/constant';

export interface Receiver {
  name: string;
  phoneNumber: string;
  quantity: number;
}

export interface OrderRequest {
  productId: number;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: Receiver[];
}

export async function fetchOrder(orderData: OrderRequest, authToken: string) {
  const { data } = await axios.post(`${API_BASE}/api/order`, orderData, {
    headers: {
      Authorization: authToken,
      'Content-Type': 'application/json',
    },
  });
  return data;
}
