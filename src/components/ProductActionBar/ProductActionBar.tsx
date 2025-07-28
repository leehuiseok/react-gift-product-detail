// src/components/ProductActionBar/ProductActionBar.tsx
import React from 'react';
import styled from '@emotion/styled';
import { useProductWish } from '@/hooks/useProductWish';

const ActionBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 720px;
  height: 60px;
  background-color: white;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  z-index: 1000;
`;

const WishSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: white;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;

const WishIcon = styled.div<{ isWished: boolean; isToggling: boolean }>`
  font-size: 20px;
  margin-bottom: 2px;
  transition: all 0.2s ease;
  opacity: ${(props) => (props.isToggling ? 0.8 : 1)};
  transform: ${(props) => (props.isToggling ? 'scale(0.9)' : 'scale(1)')};

  ${(props) =>
    props.isWished &&
    `
    animation: heartBeat 0.3s ease-in-out;
  `}

  @keyframes heartBeat {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const WishCount = styled.div`
  font-size: 12px;
  color: #333;
`;

const OrderButton = styled.button`
  flex: 3;
  height: 100%;
  background-color: #ffeb00;
  border: none;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #ffe600;
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }
`;

interface ProductActionBarProps {
  productId: string;
  onOrderClick: () => void;
  disabled?: boolean;
}

export const ProductActionBar: React.FC<ProductActionBarProps> = ({
  productId,
  onOrderClick,
  disabled = false,
}) => {
  const { wishData, handleToggleWish, isToggling, isLoading } = useProductWish(productId);

  return (
    <ActionBarContainer>
      <WishSection
        onClick={handleToggleWish}
        style={{
          opacity: isLoading ? 0.5 : 1,
          pointerEvents: isLoading ? 'none' : 'auto',
        }}
      >
        <WishIcon isWished={wishData?.isWished || false} isToggling={isToggling}>
          {wishData?.isWished ? '❤️' : '🤍'}
        </WishIcon>
        <WishCount>{(wishData?.wishCount || 0).toLocaleString()}</WishCount>
      </WishSection>
      <OrderButton onClick={onOrderClick} disabled={disabled}>
        주문하기
      </OrderButton>
    </ActionBarContainer>
  );
};
