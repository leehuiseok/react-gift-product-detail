// src/pages/ProductDetail.tsx
import { useState } from 'react';
import styled from '@emotion/styled';
import { useParams, useNavigate } from 'react-router';
import { Header } from '@/components/Header/Header';
import { ProductActionBar } from '@/components/ProductActionBar/ProductActionBar';
import { Product } from '@/components/common/Product';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ProductReview } from '@/components/ProductTab/ProductReview/ProductReview';
import { Suspense } from 'react';
import { ProductDetailSection } from '@/components/ProductTab/ProductDetailSection/ProductDetailSection';
import { Description } from '@/components/DescriptionContainer/DescriptionContainer';

const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  background-color: white;
  min-height: 100vh;
  padding-bottom: 60px; /* 액션 바 높이만큼 패딩 추가 */
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 15px;
  border: none;
  background: none;
  cursor: pointer;
  border-bottom: 2px solid ${(props) => (props.active ? '#ff6b6b' : 'transparent')};
  color: ${(props) => (props.active ? '#ff6b6b' : '#666')};
`;

const TabContent = styled.div`
  padding: 20px;
`;

export const ProductDetail = () => {
  const { productId } = useParams();
  const [activeTab, setActiveTab] = useState<'description' | 'review' | 'detail'>('description');
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate(`/order?productId=${productId}`);
  };

  return (
    <Container>
      <Header title="선물하기" />

      <ErrorBoundary customMessage="상품 정보를 불러오는 중 오류가 발생했습니다.">
        <Suspense fallback={<div>Loading...</div>}>
          <Product />
        </Suspense>
      </ErrorBoundary>
      <TabContainer>
        <Tab active={activeTab === 'description'} onClick={() => setActiveTab('description')}>
          상품설명
        </Tab>

        <Tab active={activeTab === 'review'} onClick={() => setActiveTab('review')}>
          선물후기
        </Tab>

        <Tab active={activeTab === 'detail'} onClick={() => setActiveTab('detail')}>
          상세정보
        </Tab>
      </TabContainer>

      <TabContent>
        <ErrorBoundary customMessage="상품 설명을 불러오는 중 오류가 발생했습니다.">
          {activeTab === 'description' && (
            <Suspense fallback={<div>Loading...</div>}>
              <div>
                <Description />
              </div>
            </Suspense>
          )}
        </ErrorBoundary>
        <ErrorBoundary customMessage="선물후기를 불러오는 중 오류가 발생했습니다.">
          {activeTab === 'review' && (
            <Suspense fallback={<div>Loading...</div>}>
              <ProductReview />
            </Suspense>
          )}
        </ErrorBoundary>
        <ErrorBoundary customMessage="상세정보를 불러오는 중 오류가 발생했습니다.">
          {activeTab === 'detail' && (
            <Suspense fallback={<div>Loading...</div>}>
              <ProductDetailSection />
            </Suspense>
          )}
        </ErrorBoundary>
      </TabContent>

      {/* 고정된 액션 바 */}
      <ProductActionBar productId={productId || ''} onOrderClick={handleOrderClick} />
    </Container>
  );
};
