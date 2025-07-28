import axios from 'axios';

import { API_BASE } from '@/constant/constant';

type ProductDetail = {
  announcements: [
    {
      displayOrder: number;
      name: string;
      value: string;
    },
  ];
  description: string;
};

export async function fetchProductDetail(productId: string): Promise<ProductDetail> {
  const { data } = await axios.get(`${API_BASE}/api/products/${productId}/detail`);
  return data.data;
}
