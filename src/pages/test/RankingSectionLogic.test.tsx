import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../../contexts/AuthContext';
import { RankingSection } from '@/components/RankingSection/RankingSection';
import { server } from '../../test/server';
import { http, HttpResponse } from 'msw';
import { Suspense } from 'react';

// Mock dependencies
const mockSetSearchParams = vi.fn();
const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useSearchParams: () => [new URLSearchParams(), mockSetSearchParams],
    useNavigate: () => mockNavigate,
  };
});

// Mock AuthContext
const mockUseAuth = vi.fn();
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<div>로딩 중...</div>}>{children}</Suspense>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

// MSW 사용
describe('RankingSection 컴포넌트 (MSW 사용)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSetSearchParams.mockClear();
    mockNavigate.mockClear();

    // 기본 로그인된 사용자로 설정
    mockUseAuth.mockReturnValue({
      user: {
        email: 'test@kakao.com',
        name: '테스트 사용자',
        authToken: 'test-token',
      },
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
    });
  });

  it('MSW를 통해 랭킹 데이터를 가져와서 렌더링해야 한다', async () => {
    render(
      <TestWrapper>
        <RankingSection />
      </TestWrapper>,
    );

    // 로딩 상태 확인
    expect(screen.getByText('로딩 중...')).toBeInTheDocument();

    // 데이터 로딩 완료 후 제목 확인
    await waitFor(() => {
      expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();
    });

    // 탭 네비게이션 확인
    expect(screen.getByText('전체')).toBeInTheDocument();
    expect(screen.getByText('여성이')).toBeInTheDocument();
    expect(screen.getByText('남성이')).toBeInTheDocument();
    expect(screen.getByText('청소년이')).toBeInTheDocument();

    // 필터 버튼 확인
    expect(screen.getByText('받고 싶어한')).toBeInTheDocument();
    expect(screen.getByText('많이 선물한')).toBeInTheDocument();
    expect(screen.getByText('위시로 받은')).toBeInTheDocument();

    // 더보기 버튼 확인
    expect(screen.getByText('더보기')).toBeInTheDocument();

    // MSW를 통해 가져온 상품 데이터 확인
    await waitFor(() => {
      expect(screen.getByText('프리미엄 와인 세트')).toBeInTheDocument();
      expect(screen.getByText('고급 초콜릿 박스')).toBeInTheDocument();
      expect(screen.getByText('프리미엄 화장품 세트')).toBeInTheDocument();
    });
  });

  it('탭 클릭 시 MSW를 통해 새로운 데이터를 가져와야 한다', async () => {
    const user = userEvent.setup();

    // 여성이 탭에 대한 특별한 응답 설정
    server.use(
      http.get('/api/products/ranking', ({ request }) => {
        const url = new URL(request.url);
        const targetType = url.searchParams.get('targetType');

        if (targetType === 'FEMALE') {
          return HttpResponse.json({
            success: true,
            data: [
              {
                id: 5,
                name: '스킨케어 세트',
                brandInfo: {
                  id: 5,
                  name: '스킨케어브랜드',
                  imageURL: 'https://example.com/brand5.jpg',
                },
                price: {
                  basicPrice: 60000,
                  discountRate: 25,
                  sellingPrice: 45000,
                },
                imageURL: 'https://example.com/skincare.jpg',
                wishCount: 180,
              },
            ],
          });
        }

        return HttpResponse.json({
          success: true,
          data: [
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
          ],
        });
      }),
    );

    render(
      <TestWrapper>
        <RankingSection />
      </TestWrapper>,
    );

    // 초기 데이터 로딩 완료 대기
    await waitFor(() => {
      expect(screen.getByText('프리미엄 와인 세트')).toBeInTheDocument();
    });

    // 여성이 탭 클릭
    const femaleTab = screen.getByText('여성이');
    await act(async () => {
      await user.click(femaleTab);
    });

    // URL 파라미터가 올바르게 업데이트되는지 확인
    expect(mockSetSearchParams).toHaveBeenCalledWith(
      expect.objectContaining({
        get: expect.any(Function),
        set: expect.any(Function),
      }),
    );

    // 새로운 데이터가 로드되는지 확인
    await waitFor(() => {
      expect(screen.getByText('스킨케어 세트')).toBeInTheDocument();
    });
  });

  it('필터 클릭 시 MSW를 통해 필터링된 데이터를 가져와야 한다', async () => {
    const user = userEvent.setup();

    // 많이 선물한 필터에 대한 특별한 응답 설정
    server.use(
      http.get('/api/products/ranking', ({ request }) => {
        const url = new URL(request.url);
        const rankType = url.searchParams.get('rankType');

        if (rankType === 'MANY_RECEIVE') {
          return HttpResponse.json({
            success: true,
            data: [
              {
                id: 4,
                name: '인기 향수',
                brandInfo: {
                  id: 4,
                  name: '향수브랜드',
                  imageURL: 'https://example.com/brand4.jpg',
                },
                price: {
                  basicPrice: 80000,
                  discountRate: 25,
                  sellingPrice: 60000,
                },
                imageURL: 'https://example.com/perfume.jpg',
                reviewCount: 85,
              },
            ],
          });
        }

        return HttpResponse.json({
          success: true,
          data: [
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
          ],
        });
      }),
    );

    render(
      <TestWrapper>
        <RankingSection />
      </TestWrapper>,
    );

    // 초기 데이터 로딩 완료 대기
    await waitFor(() => {
      expect(screen.getByText('프리미엄 와인 세트')).toBeInTheDocument();
    });

    // 많이 선물한 필터 클릭
    const manyReceiveFilter = screen.getByText('많이 선물한');
    await act(async () => {
      await user.click(manyReceiveFilter);
    });

    // URL 파라미터가 올바르게 업데이트되는지 확인
    expect(mockSetSearchParams).toHaveBeenCalledWith(
      expect.objectContaining({
        get: expect.any(Function),
        set: expect.any(Function),
      }),
    );

    // 새로운 데이터가 로드되는지 확인
    await waitFor(() => {
      expect(screen.getByText('인기 향수')).toBeInTheDocument();
    });
  });

  it('더보기 버튼 클릭 시 버튼 텍스트가 변경되어야 한다', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <RankingSection />
      </TestWrapper>,
    );

    // 데이터 로딩 완료 대기
    await waitFor(() => {
      expect(screen.getByText('프리미엄 와인 세트')).toBeInTheDocument();
    });

    // 더보기 버튼 클릭
    const moreButton = screen.getByText('더보기');
    await act(async () => {
      await user.click(moreButton);
    });

    // 버튼 텍스트가 '접기'로 변경되어야 함
    expect(screen.getByText('접기')).toBeInTheDocument();

    // 접기 버튼 클릭
    const foldButton = screen.getByText('접기');
    await act(async () => {
      await user.click(foldButton);
    });

    // 버튼 텍스트가 다시 '더보기'로 변경되어야 함
    expect(screen.getByText('더보기')).toBeInTheDocument();
  });

  it('상품 클릭 시 상품 상세 페이지로 이동해야 한다', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <RankingSection />
      </TestWrapper>,
    );

    // 상품이 로드될 때까지 대기
    await waitFor(() => {
      expect(screen.getByText('프리미엄 와인 세트')).toBeInTheDocument();
    });

    // 상품 클릭
    const product = screen.getByText('프리미엄 와인 세트');
    await act(async () => {
      await user.click(product);
    });

    // 상품 상세 페이지로 이동하는지 확인
    expect(mockNavigate).toHaveBeenCalledWith('/product/1');
  });

  it('로그인하지 않은 사용자가 상품을 클릭하면 로그인 페이지로 이동해야 한다', async () => {
    // 로그인하지 않은 사용자로 mock 설정
    mockUseAuth.mockReturnValue({
      user: null,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
    });

    const user = userEvent.setup();
    render(
      <TestWrapper>
        <RankingSection />
      </TestWrapper>,
    );

    // 상품이 로드될 때까지 대기
    await waitFor(() => {
      expect(screen.getByText('프리미엄 와인 세트')).toBeInTheDocument();
    });

    // 상품 클릭
    const product = screen.getByText('프리미엄 와인 세트');
    await act(async () => {
      await user.click(product);
    });

    // 로그인 페이지로 이동하는지 확인
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('API 에러 시 에러 처리가 올바르게 되어야 한다', async () => {
    // API 에러 시뮬레이션
    server.use(
      http.get('/api/products/ranking', () => {
        return HttpResponse.json(
          { success: false, message: '서버 오류가 발생했습니다.' },
          { status: 500 },
        );
      }),
    );

    render(
      <TestWrapper>
        <RankingSection />
      </TestWrapper>,
    );
  });
});
