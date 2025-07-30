import styled from '@emotion/styled';
import { useParams } from 'react-router';
import { useFetchProductSummary } from '@/hooks/useFetchProductSummary';

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 20px;
`;

const ProductName = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ProductPrice = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #ff6b6b;
  margin-bottom: 10px;
`;

const BrandInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const BrandImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const Product = () => {
  const { productId } = useParams();
  const { data: productSummary } = useFetchProductSummary(productId || '');
  return (
    <>
      <div style={{ position: 'relative' }}>
        <ProductImage src={productSummary?.imageURL} alt={productSummary?.name} />
      </div>

      <ProductInfo>
        <ProductName>{productSummary?.name}</ProductName>
        <ProductPrice>{productSummary?.price.sellingPrice.toLocaleString()}원</ProductPrice>
        <BrandInfo>
          <BrandImage
            src={productSummary?.brandInfo.imageURL}
            alt={productSummary?.brandInfo.name}
          />
          <span>{productSummary?.brandInfo.name}</span>
        </BrandInfo>
      </ProductInfo>
    </>
  );
};
