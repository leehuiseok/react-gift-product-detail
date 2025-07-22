import { useRef, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { colors, spacing } from '@/styles/tokens';
import { Header } from '@/components/Header/Header';
import { useParams, useNavigate } from 'react-router';
import { useFetchThemeInfo } from '@/api/fetchThemeInfo';
import { typography } from '@/styles/tokens';
import { Loading } from '@/components/common/Loading';
import { useFetchThemeProduct } from '@/api/fetchThemeProduct';
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
  const { themeInfo, loading, error, is404Error } = useFetchThemeInfo(themeId || '');
  const {
    themeProduct,
    loading: themeProductLoading,
    error: themeProductError,
    hasMoreList,
    loadMore,
  } = useFetchThemeProduct(themeId || '');

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasMoreList && !themeProductLoading) {
        loadMore();
      }
    },
    [hasMoreList, themeProductLoading, loadMore],
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  // 404 에러 처리
  useEffect(() => {
    if (is404Error) {
      navigate('/');
    }
  }, [is404Error, navigate]);

  return (
    <AppContainer>
      <Header title="선물하기" />
      {loading ? (
        <Loading />
      ) : error ? (
        <div>테마 정보 불러오기 실패</div>
      ) : (
        <ThemeInfoContainer backgroundColor={themeInfo?.backgroundColor || ''}>
          <ThemeInfoName>{themeInfo?.name}</ThemeInfoName>
          <ThemeInfoTitle>{themeInfo?.title}</ThemeInfoTitle>
          <ThemeInfoDescription>{themeInfo?.description}</ThemeInfoDescription>
        </ThemeInfoContainer>
      )}
      <ProductListContainer>
        {themeProductLoading && themeProduct.length === 0 ? (
          <Loading />
        ) : themeProductError ? (
          <div>테마 제품 불러오기 실패</div>
        ) : themeProduct.length === 0 ? (
          <EmptyState>
            <div>상품이 없습니다</div>
          </EmptyState>
        ) : (
          <>
            {themeProduct.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            <LoadMoreTrigger ref={loadMoreRef}>
              {themeProductLoading && hasMoreList && <Loading />}
            </LoadMoreTrigger>
          </>
        )}
      </ProductListContainer>
    </AppContainer>
  );
};
