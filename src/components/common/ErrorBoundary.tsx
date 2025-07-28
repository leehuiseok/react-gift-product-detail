import React from 'react';
import styled from '@emotion/styled';

interface FallbackProps {
  error?: Error;
  resetError: () => void;
  customMessage?: string;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  text-align: center;
  background-color: #f8f9fa;
`;

const ErrorTitle = styled.h1`
  font-size: 24px;
  color: #ff6b6b;
  margin-bottom: 16px;
`;

const ErrorMessage = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const RetryButton = styled.button`
  padding: 12px 24px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #357abd;
  }
`;

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<FallbackProps>;
  customMessage?: string; // 커스텀 메시지 prop 추가
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent
            error={this.state.error}
            resetError={this.resetError}
            customMessage={this.props.customMessage}
          />
        );
      }

      return (
        <ErrorContainer>
          <ErrorTitle>오류가 발생했습니다</ErrorTitle>
          <ErrorMessage>
            {this.props.customMessage ||
              this.state.error?.message ||
              '예상치 못한 오류가 발생했습니다.'}
          </ErrorMessage>
          <RetryButton onClick={this.resetError}>다시 시도</RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}
