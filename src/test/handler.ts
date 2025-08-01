import { http, HttpResponse } from 'msw';

// 타입 정의
type Product = {
  id: number;
  name: string;
  brandInfo: { id: number; name: string; imageURL: string };
  price: {
    basicPrice: number;
    discountRate: number;
    sellingPrice: number;
  };
  imageURL: string;
  wishCount?: number;
  reviewCount?: number;
};

// Mock 데이터
export const mockRankingData: Record<string, Record<string, Product[]>> = {
  ALL: {
    MANY_WISH: [
      {
        id: 1,
        name: '프리미엄 와인 세트',
        brandInfo: { id: 1, name: '와인브랜드', imageURL: 'https://example.com/brand1.jpg' },
        price: {
          basicPrice: 60000,
          discountRate: 17,
          sellingPrice: 50000,
        },
        imageURL: 'https://example.com/wine.jpg',
        wishCount: 150,
      },
      {
        id: 2,
        name: '고급 초콜릿 박스',
        brandInfo: { id: 2, name: '초콜릿브랜드', imageURL: 'https://example.com/brand2.jpg' },
        price: {
          basicPrice: 40000,
          discountRate: 25,
          sellingPrice: 30000,
        },
        imageURL: 'https://example.com/chocolate.jpg',
        wishCount: 120,
      },
      {
        id: 3,
        name: '프리미엄 화장품 세트',
        brandInfo: { id: 3, name: '뷰티브랜드', imageURL: 'https://example.com/brand3.jpg' },
        price: {
          basicPrice: 100000,
          discountRate: 20,
          sellingPrice: 80000,
        },
        imageURL: 'https://example.com/cosmetics.jpg',
        wishCount: 200,
      },
    ],
    MANY_RECEIVE: [
      {
        id: 7,
        name: '인기 향수',
        brandInfo: { id: 7, name: '향수브랜드', imageURL: 'https://example.com/brand7.jpg' },
        price: {
          basicPrice: 80000,
          discountRate: 25,
          sellingPrice: 60000,
        },
        imageURL: 'https://example.com/perfume.jpg',
        reviewCount: 85,
      },
    ],
    MANY_REVIEW: [
      {
        id: 4,
        name: '인기 향수',
        brandInfo: { id: 4, name: '향수브랜드', imageURL: 'https://example.com/brand4.jpg' },
        price: {
          basicPrice: 80000,
          discountRate: 25,
          sellingPrice: 60000,
        },
        imageURL: 'https://example.com/perfume.jpg',
        reviewCount: 85,
      },
    ],
  },
  FEMALE: {
    MANY_WISH: [
      {
        id: 5,
        name: '스킨케어 세트',
        brandInfo: { id: 5, name: '스킨케어브랜드', imageURL: 'https://example.com/brand5.jpg' },
        price: {
          basicPrice: 60000,
          discountRate: 25,
          sellingPrice: 45000,
        },
        imageURL: 'https://example.com/skincare.jpg',
        wishCount: 180,
      },
    ],
    MANY_REVIEW: [
      {
        id: 6,
        name: '인기 마스크팩',
        brandInfo: { id: 6, name: '마스크팩브랜드', imageURL: 'https://example.com/brand6.jpg' },
        price: {
          basicPrice: 20000,
          discountRate: 25,
          sellingPrice: 15000,
        },
        imageURL: 'https://example.com/mask.jpg',
        reviewCount: 200,
      },
    ],
  },
};

export const handlers = [
  // 랭킹 데이터 API - 전체 URL 패턴
  http.get('http://localhost:3000/api/products/ranking', ({ request }) => {
    const url = new URL(request.url);
    const targetType = url.searchParams.get('targetType') || 'ALL';
    const rankType = url.searchParams.get('rankType') || 'MANY_WISH';

    const tabData = mockRankingData[targetType];
    const data = tabData?.[rankType] || [];

    return HttpResponse.json({
      success: true,
      data,
    });
  }),

  // 사용자 인증 상태 확인
  http.get('/api/auth/me', () => {
    return HttpResponse.json({
      success: true,
      data: {
        id: 1,
        email: 'test@kakao.com',
        name: '테스트 사용자',
      },
    });
  }),
];
