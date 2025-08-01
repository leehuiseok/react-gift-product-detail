import { useProductDetail } from '@/hooks/useProductDetail';
import { useParams } from 'react-router';
import styled from '@emotion/styled';

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
export const Description = () => {
  const { productId } = useParams();
  const { data: productDetail } = useProductDetail(productId || '');
  return (
    <DescriptionContainer dangerouslySetInnerHTML={{ __html: productDetail?.description || '' }} />
  );
};
