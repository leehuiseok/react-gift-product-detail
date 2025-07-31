import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // 이 줄 추가
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../../contexts/AuthContext';
import { RankingSection } from '@/components/RankingSection/RankingSection';

// Mock dependencies
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useSearchParams: () => [new URLSearchParams(), vi.fn()],
    useNavigate: () => vi.fn(),
  };
});

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: {
      email: 'test@kakao.com',
      name: '테스트 사용자',
      authToken: 'test-token',
    },
    loading: false,
    login: vi.fn(),
    logout: vi.fn(),
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock API hook
vi.mock('../../hooks/useRanking', () => ({
  useRanking: () => ({
    data: [
      {
        id: 1,
        name: '테스트 상품',
        brandInfo: { id: 1, name: '테스트 브랜드', imageURL: 'https://example.com/brand.jpg' },
        price: {
          basicPrice: 20000,
          discountRate: 25,
          sellingPrice: 15000,
        },
        imageURL: 'https://example.com/test.jpg',
        wishCount: 50,
      },
    ],
  }),
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
        <BrowserRouter>{children}</BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

describe('RankingSection 컴포넌트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('기본 렌더링이 올바르게 되어야 한다', () => {
    render(
      <TestWrapper>
        <RankingSection />
      </TestWrapper>,
    );

    // 제목 확인
    expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();

    // 탭 네비게이션 확인 (실제 탭 이름 사용)
    expect(screen.getByText('전체')).toBeInTheDocument();
    expect(screen.getByText('여성이')).toBeInTheDocument();
    expect(screen.getByText('남성이')).toBeInTheDocument();
    expect(screen.getByText('청소년이')).toBeInTheDocument();

    // 필터 버튼 확인 (실제 필터 이름 사용)
    expect(screen.getByText('받고 싶어한')).toBeInTheDocument();
    expect(screen.getByText('많이 선물한')).toBeInTheDocument();
    expect(screen.getByText('위시로 받은')).toBeInTheDocument();

    // 더보기 버튼 확인
    expect(screen.getByText('더보기')).toBeInTheDocument();
  });

  it('상품 데이터가 표시되어야 한다', () => {
    render(
      <TestWrapper>
        <RankingSection />
      </TestWrapper>,
    );

    // 상품 정보 확인
    expect(screen.getByText('테스트 상품')).toBeInTheDocument();
    expect(screen.getByText('테스트 브랜드')).toBeInTheDocument();
    expect(screen.getByText('15,000원')).toBeInTheDocument();
  });

  it('탭을 클릭할 수 있어야 한다', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <RankingSection />
      </TestWrapper>,
    );

    // 여성이 탭 클릭
    const femaleTab = screen.getByText('여성이');
    await user.click(femaleTab);

    // 탭이 클릭 가능한지 확인 (실제 동작은 mock에 따라 달라짐)
    expect(femaleTab).toBeInTheDocument();
  });

  it('필터를 클릭할 수 있어야 한다', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <RankingSection />
      </TestWrapper>,
    );

    // 많이 선물한 필터 클릭
    const manyReceiveFilter = screen.getByText('많이 선물한');
    await user.click(manyReceiveFilter);

    // 필터가 클릭 가능한지 확인
    expect(manyReceiveFilter).toBeInTheDocument();
  });

  it('더보기 버튼을 클릭할 수 있어야 한다', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <RankingSection />
      </TestWrapper>,
    );

    // 더보기 버튼 클릭
    const moreButton = screen.getByText('더보기');
    await user.click(moreButton);

    // 버튼이 클릭 가능한지 확인
    expect(moreButton).toBeInTheDocument();
  });
});
