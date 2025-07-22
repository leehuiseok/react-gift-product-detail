import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { colors } from '@/styles/tokens';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 12px;
`;

const Spinner = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid ${colors.gray200};
  border-top: 2px solid ${colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.div`
  color: ${colors.gray600};
  font-size: 14px;
`;

export const Loading = () => {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>로딩 중...</LoadingText>
    </LoadingContainer>
  );
};
