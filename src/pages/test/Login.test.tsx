import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../../contexts/AuthContext';
import { Login } from '../Login';
import { toast } from 'react-toastify';
// Mock dependencies
vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

//Mock react-router
const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      state: { from: { pathname: '/home' } },
    }),
  };
});
//Mock useLoginMutation
const mockMutate = vi.fn();

vi.mock('../../hooks/useLoginMutation', () => ({
  useLoginMutation: () => ({
    mutate: mockMutate,
  }),
}));

// Mock AuthContext
const mockLogin = vi.fn();
const mockLogout = vi.fn();
const mockUser = null;
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
    logout: mockLogout,
    user: mockUser,
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

  describe('로그인 성공 시나리오', () => {
    it('올바른 정보로 로그인 시 성공해야 한다', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Login />
        </TestWrapper>,
      );

      // 1. 로그인 정보 입력
      const emailInput = screen.getByPlaceholderText('이메일');
      const passwordInput = screen.getByPlaceholderText('비밀번호');
      const loginButton = screen.getByRole('button', { name: '로그인' });

      await user.type(emailInput, 'test@kakao.com');
      await user.type(passwordInput, 'password123');

      // 2. 폼 제출
      await user.click(loginButton);

      // 3. mutate 함수가 올바른 인자로 호출되었는지 확인
      expect(mockMutate).toHaveBeenCalledWith(
        { email: 'test@kakao.com', password: 'password123' },
        expect.objectContaining({
          onSuccess: expect.any(Function),
          onError: expect.any(Function),
        }),
      );

      // 4. 성공 콜백이 호출되었을 때의 동작 시뮬레이션
      const mutateCall = mockMutate.mock.calls[0];
      const onSuccess = mutateCall[1].onSuccess;

      // 성공 응답 데이터
      const successResponse = {
        email: 'test@kakao.com',
        name: '테스트 사용자',
        authToken: 'mock-auth-token',
      };

      // onSuccess 콜백 실행
      onSuccess(successResponse);

      // 5. AuthContext의 login 함수가 올바른 인자로 호출되었는지 확인
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@kakao.com',
        name: '테스트 사용자',
        authToken: 'mock-auth-token',
      });

      // 6. 네비게이션이 올바른 경로로 호출되었는지 확인
      expect(mockNavigate).toHaveBeenCalledWith('/home', { replace: true });
    });

    it('로그인 성공 후 사용자 정보가 올바르게 저장되어야 한다', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Login />
        </TestWrapper>,
      );

      const emailInput = screen.getByPlaceholderText('이메일');
      const passwordInput = screen.getByPlaceholderText('비밀번호');
      const loginButton = screen.getByRole('button', { name: '로그인' });

      await user.type(emailInput, 'test@kakao.com');
      await user.type(passwordInput, 'password123');
      await user.click(loginButton);

      const mutateCall = mockMutate.mock.calls[0];
      const onSuccess = mutateCall[1].onSuccess;

      const successResponse = {
        email: 'test@kakao.com',
        name: '테스트 사용자',
        authToken: 'mock-auth-token',
      };

      onSuccess(successResponse);

      // login 함수가 호출되었는지 확인
      expect(mockLogin).toHaveBeenCalledTimes(1);
      expect(mockLogin).toHaveBeenCalledWith(successResponse);
    });
  });

  describe('로그인 실패 시나리오', () => {
    it('잘못된 이메일 형식으로 제출 시 에러가 표시되어야 한다', async () => {
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
      expect(toast.error).toHaveBeenCalledWith('카카오 이메일(@kakao.com)만 사용 가능합니다.');

      // mutate 함수가 호출되지 않았는지 확인
      expect(mockMutate).not.toHaveBeenCalled();
    });

    it('서버 에러 발생 시 에러 메시지가 표시되어야 한다', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Login />
        </TestWrapper>,
      );

      const emailInput = screen.getByPlaceholderText('이메일');
      const passwordInput = screen.getByPlaceholderText('비밀번호');
      const loginButton = screen.getByRole('button', { name: '로그인' });

      await user.type(emailInput, 'test@kakao.com');
      await user.type(passwordInput, 'password123');
      await user.click(loginButton);

      // mutate 함수가 호출되었는지 확인
      expect(mockMutate).toHaveBeenCalled();

      const mutateCall = mockMutate.mock.calls[0];
      const onError = mutateCall[1].onError;

      // 서버 에러 시뮬레이션
      const mockError = {
        response: {
          data: {
            message: '이메일 또는 비밀번호가 올바르지 않습니다.',
          },
        },
      };

      // onError 콜백 실행
      onError(mockError);

      // 에러 메시지가 표시되었는지 확인
      expect(toast.error).toHaveBeenCalledWith('이메일 또는 비밀번호가 올바르지 않습니다.');
    });

    it('네트워크 에러 발생 시 기본 에러 메시지가 표시되어야 한다', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Login />
        </TestWrapper>,
      );

      const emailInput = screen.getByPlaceholderText('이메일');
      const passwordInput = screen.getByPlaceholderText('비밀번호');
      const loginButton = screen.getByRole('button', { name: '로그인' });

      await user.type(emailInput, 'test@kakao.com');
      await user.type(passwordInput, 'password123');
      await user.click(loginButton);

      const mutateCall = mockMutate.mock.calls[0];
      const onError = mutateCall[1].onError;

      // 네트워크 에러 시뮬레이션 (response가 없는 경우)
      const networkError = {};

      onError(networkError);

      // 기본 에러 메시지가 표시되었는지 확인
      expect(toast.error).toHaveBeenCalledWith('로그인에 실패했습니다.');
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

      // 5. 폼 제출
      await user.click(loginButton);

      // 6. 로그인 API 호출 확인
      expect(mockMutate).toHaveBeenCalledWith(
        { email: 'test@kakao.com', password: 'password123' },
        expect.objectContaining({
          onSuccess: expect.any(Function),
          onError: expect.any(Function),
        }),
      );
    });
  });
});
