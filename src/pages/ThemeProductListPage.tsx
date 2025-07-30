import { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { colors, spacing } from '@/styles/tokens';
import { Header } from '@/components/Header/Header';
import { useParams, useNavigate } from 'react-router';
import { useFetchThemeInfo } from '@/hooks/useFetchThemeInfo';
import { typography } from '@/styles/tokens';
import { Loading } from '@/components/common/Loading';
import { useFetchThemeProduct } from '@/hooks/useFetchThemeProduct';
import { ProductCard } from '@/components/common/ProductCard';

const AppContainer = styled.div`
  max-width: 720px;
  margin: 0 auto;
  background-color: ${colors.gray50};
  min-height: 100vh;
`;

const ThemeInfoContainer = styled.div<{ backgroundColor: string }>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  padding: ${spacing.lg};
  background-color: ${({ backgroundColor }) => backgroundColor};
  height: 120px;
`;
const ThemeInfoName = styled.div`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.white};
`;

const ThemeInfoTitle = styled.div`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.white};
`;

const ThemeInfoDescription = styled.div`
  font-size: ${typography.fontSize.md};
  font-weight: ${typography.fontWeight.regular};
  color: ${colors.white};
`;

const ProductListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacing.lg};
  padding: ${spacing.lg};
`;

const LoadMoreTrigger = styled.div`
  height: 20px;
  width: 100%;
  grid-column: 1 / -1;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${spacing.xl};
  color: ${colors.gray600};
  text-align: center;
  grid-column: 1 / -1;
`;

export const ThemeProductListPage = () => {
  const { themeId } = useParams();
  const navigate = useNavigate();
  // React Query 기반 훅 사용
  const { data: themeInfo, error: themeInfoError } = useFetchThemeInfo(themeId || '');
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useFetchThemeProduct(
    themeId || '',
  );

  // 무한 스크롤 IntersectionObserver
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNextPage) return;
    const element = loadMoreRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (themeInfoError) {
      navigate('/');
    }
  }, [themeInfoError, navigate]);

  const products = data?.pages.flatMap((page) => page.list) ?? [];

  return (
    <AppContainer>
      <Header title="선물하기" />
      {themeInfo && (
        <ThemeInfoContainer backgroundColor={themeInfo.backgroundColor || ''}>
          <ThemeInfoName>{themeInfo.name}</ThemeInfoName>
          <ThemeInfoTitle>{themeInfo.title}</ThemeInfoTitle>
          <ThemeInfoDescription>{themeInfo.description}</ThemeInfoDescription>
        </ThemeInfoContainer>
      )}
      <ProductListContainer>
        {products.length === 0 ? (
          <EmptyState>
            <div>상품이 없습니다</div>
          </EmptyState>
        ) : (
          <>
            {products.map((product) => (
              <ProductCard
                onClick={() => navigate(`/product/${product.id}`)}
                key={product.id}
                product={product}
              />
            ))}
            <LoadMoreTrigger ref={loadMoreRef}>
              {isFetchingNextPage && hasNextPage && <Loading />}
            </LoadMoreTrigger>
          </>
        )}
      </ProductListContainer>
    </AppContainer>
  );
};
