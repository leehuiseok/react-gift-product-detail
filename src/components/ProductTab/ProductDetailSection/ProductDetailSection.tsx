import { useProductDetail } from '@/hooks/useProductDetail';
import { useParams } from 'react-router';
import styled from '@emotion/styled';

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

export const ProductDetailSection = () => {
  const { productId } = useParams();

  const { data: productDetail } = useProductDetail(productId || '');

  return (
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
  );
};
