// src/pages/ProductDetail.tsx
import { useState } from 'react';
import styled from '@emotion/styled';
import { useParams, useNavigate } from 'react-router';
import { Header } from '@/components/Header/Header';
import { ProductActionBar } from '@/components/ProductActionBar/ProductActionBar';
import { useProductDetail } from '@/hooks/useProductDetail';
import { useProductHighlightReview } from '@/hooks/useProductHighlightReview';
import { Product } from '@/components/common/Product';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
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

const DetailSection = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border-bottom: 1px solid #eee;
`;

const DetailTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
  color: #333;
`;

const DetailContent = styled.div`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`;

const DescriptionContainer = styled.div`
  line-height: 1.6;

  p {
    margin-bottom: 15px;
    font-size: 14px;
    color: #333;
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 10px 0;
  }

  p[style*='text-align: center'] {
    text-align: center;
  }

  p[style*='text-align: center'] img {
    display: inline-block;
    margin: 5px;
    max-width: 100%;
  }
`;

export const ProductDetail = () => {
  const { productId } = useParams();
  const [activeTab, setActiveTab] = useState<'description' | 'review' | 'detail'>('description');
  const navigate = useNavigate();

  const { data: productDetail } = useProductDetail(productId || '');
  const { data: productReview } = useProductHighlightReview(productId || '');

  const handleOrderClick = () => {
    navigate(`/order?productId=${productId}`);
  };

  return (
    <Container>
      <Header title="선물하기" />

      <ErrorBoundary customMessage="상품 정보를 불러오는 중 오류가 발생했습니다.">
        <Product />
      </ErrorBoundary>
      <TabContainer>
        <ErrorBoundary customMessage="상품 설명을 불러오는 중 오류가 발생했습니다.">
          <Tab active={activeTab === 'description'} onClick={() => setActiveTab('description')}>
            상품설명
          </Tab>
        </ErrorBoundary>
        <ErrorBoundary customMessage="선물후기를 불러오는 중 오류가 발생했습니다.">
          <Tab active={activeTab === 'review'} onClick={() => setActiveTab('review')}>
            선물후기
          </Tab>
        </ErrorBoundary>
        <ErrorBoundary customMessage="상세정보를 불러오는 중 오류가 발생했습니다.">
          <Tab active={activeTab === 'detail'} onClick={() => setActiveTab('detail')}>
            상세정보
          </Tab>
        </ErrorBoundary>
      </TabContainer>

      <TabContent>
        {activeTab === 'description' && (
          <div>
            <DescriptionContainer
              dangerouslySetInnerHTML={{ __html: productDetail?.description || '' }}
            />
          </div>
        )}

        {activeTab === 'review' && (
          <div>
            {productReview?.reviews.map((review) => (
              <div
                key={review.id}
                style={{ marginBottom: '15px', padding: '10px', border: '1px solid #eee' }}
              >
                <div style={{ fontWeight: 'bold' }}>{review.authorName}</div>
                <div>{review.content}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'detail' && (
          <div>
            <div>
              {(productDetail?.announcements ?? []).map((item) => (
                <DetailSection key={item.displayOrder}>
                  <DetailTitle>{item.name}</DetailTitle>
                  <DetailContent>{item.value}</DetailContent>
                </DetailSection>
              ))}
            </div>
          </div>
        )}
      </TabContent>

      {/* 고정된 액션 바 */}
      <ProductActionBar productId={productId || ''} onOrderClick={handleOrderClick} />
    </Container>
  );
};
