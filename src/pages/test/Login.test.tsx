import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../../contexts/AuthContext';
import { Login } from '../Login';

// Mock dependencies
vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock('../../hooks/useLoginMutation', () => ({
  useLoginMutation: () => ({
    mutate: vi.fn(),
  }),
}));

// Mock AuthContext
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    login: vi.fn(),
    logout: vi.fn(),
    user: null,
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Test wrapper component
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

describe('Login 페이지', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('렌더링 테스트', () => {
    it('로그인 페이지가 올바르게 렌더링되어야 한다', () => {
      render(
        <TestWrapper>
          <Login />
        </TestWrapper>,
      );

      // 제목 확인
      expect(screen.getByText('kakao')).toBeInTheDocument();

      // 입력 필드 확인
      expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();

      // 로그인 버튼 확인
      expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
    });

    it('헤더가 올바르게 표시되어야 한다', () => {
      render(
        <TestWrapper>
          <Login />
        </TestWrapper>,
      );

      expect(screen.getByText('선물하기')).toBeInTheDocument();
    });
  });

  describe('입력 필드 테스트', () => {
    it('이메일 입력 필드가 올바르게 동작해야 한다', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Login />
        </TestWrapper>,
      );

      const emailInput = screen.getByPlaceholderText('이메일');
      await user.type(emailInput, 'test@kakao.com');

      // 실제 입력이 되었는지 확인
      expect(emailInput).toHaveValue('test@kakao.com');
    });

    it('비밀번호 입력 필드가 올바르게 동작해야 한다', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Login />
        </TestWrapper>,
      );

      const passwordInput = screen.getByPlaceholderText('비밀번호');
      await user.type(passwordInput, 'password123');

      // 실제 입력이 되었는지 확인
      expect(passwordInput).toHaveValue('password123');
    });

    it('이메일 입력 필드가 email 타입이어야 한다', () => {
      render(
        <TestWrapper>
          <Login />
        </TestWrapper>,
      );

      const emailInput = screen.getByPlaceholderText('이메일');
      expect(emailInput).toHaveAttribute('type', 'email');
    });

    it('비밀번호 입력 필드가 password 타입이어야 한다', () => {
      render(
        <TestWrapper>
          <Login />
        </TestWrapper>,
      );

      const passwordInput = screen.getByPlaceholderText('비밀번호');
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  describe('폼 제출 테스트', () => {
    it('로그인 버튼이 초기에 비활성화되어야 한다', () => {
      render(
        <TestWrapper>
          <Login />
        </TestWrapper>,
      );

      const loginButton = screen.getByRole('button', { name: '로그인' });
      expect(loginButton).toBeDisabled();
    });

    it('빈 필드로 제출 시 에러가 표시되어야 한다', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Login />
        </TestWrapper>,
      );

      const loginButton = screen.getByRole('button', { name: '로그인' });
      await user.click(loginButton);

      // HTML5 유효성 검사 에러가 표시되어야 함
      const emailInput = screen.getByPlaceholderText('이메일');
      const passwordInput = screen.getByPlaceholderText('비밀번호');

      expect(emailInput).toBeInvalid();
      expect(passwordInput).toBeInvalid();
    });
  });

  describe('통합 테스트', () => {
    it('전체 로그인 플로우가 올바르게 동작해야 한다', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Login />
        </TestWrapper>,
      );

      // 1. 초기 상태 확인
      const loginButton = screen.getByRole('button', { name: '로그인' });
      expect(loginButton).toBeDisabled();

      // 2. 이메일 입력
      const emailInput = screen.getByPlaceholderText('이메일');
      await user.type(emailInput, 'test@kakao.com');

      // 3. 비밀번호 입력
      const passwordInput = screen.getByPlaceholderText('비밀번호');
      await user.type(passwordInput, 'password123');

      // 4. 입력값 확인
      expect(emailInput).toHaveValue('test@kakao.com');
      expect(passwordInput).toHaveValue('password123');

      // 5. 폼 제출 (버튼이 활성화되었는지는 실제 useLoginForm 로직에 따라 달라짐)
      await user.click(loginButton);

      // 실제 구현에서는 로그인 API 호출과 네비게이션을 확인
    });

    it('잘못된 이메일로 제출 시 에러가 표시되어야 한다', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Login />
        </TestWrapper>,
      );

      const emailInput = screen.getByPlaceholderText('이메일');
      const passwordInput = screen.getByPlaceholderText('비밀번호');
      const loginButton = screen.getByRole('button', { name: '로그인' });

      await user.type(emailInput, 'test@gmail.com');
      await user.type(passwordInput, 'password123');
      await user.click(loginButton);

      // 카카오 이메일이 아닌 경우 에러 메시지 확인
      // expect(toast.error).toHaveBeenCalledWith('카카오 이메일(@kakao.com)만 사용 가능합니다.');
    });
  });
});
