import { useState } from 'react';
import styled from '@emotion/styled';
import { colors, spacing } from '@/styles/tokens';
import { FilterButtons } from '@/components/RankingSection/FilterButtons';
import { ProductGrid } from '@/components/RankingSection/ProductGrid';
import { TabNavigation } from '@/components/RankingSection/TabNavigation';
import { Button } from '@/components/common/Button';
import { tabs, filters } from '@/mock/mockData';
import type { TabId, FilterId } from '@/types';
import { useSearchParams } from 'react-router';
import { ROUTE_PATH } from '@/shared/RoutePath';
import { useNavigate } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';
import { useRanking } from '@/hooks/useRanking';

const RankingHeader = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.gray900};
  padding: ${spacing.xl} ${spacing.lg} ${spacing.md};
  margin: 0;
`;

const ButtonContainer = styled.div`
  padding: ${spacing.xl} ${spacing.lg};
`;

// 유효한 값인지 검증하는 헬퍼 함수들
const isValidTabId = (tabId: string | null): tabId is TabId => {
  return tabs.some((tab) => tab.id === tabId);
};

const isValidFilterId = (filterId: string | null): filterId is FilterId => {
  return filters.some((filter) => filter.id === filterId);
};

export const RankingSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  // URL 파라미터에서 값을 가져오고 유효성 검증
  const tabParam = searchParams.get('tab');
  const filterParam = searchParams.get('filter');

  const [activeTab, setActiveTab] = useState<TabId>(isValidTabId(tabParam) ? tabParam : 'ALL');
  const [activeFilter, setActiveFilter] = useState<FilterId>(
    isValidFilterId(filterParam) ? filterParam : 'MANY_WISH',
  );
  const { data: ranking } = useRanking(activeTab, activeFilter);
  const [isExpanded, setIsExpanded] = useState(false);
  const itemsPerPage = 6;

  const handleToggleView = () => {
    setIsExpanded(!isExpanded);
  };

  const handleTabChange = (newTab: string) => {
    if (isValidTabId(newTab)) {
      setActiveTab(newTab);
      searchParams.set('tab', newTab);
      setSearchParams(searchParams);
    }
  };

  const handleFilterChange = (newFilter: string) => {
    if (isValidFilterId(newFilter)) {
      setActiveFilter(newFilter);
      searchParams.set('filter', newFilter);
      setSearchParams(searchParams);
    }
  };

  const handleProductClick = (productId: string) => {
    if (user) {
      navigate(`/product/${productId}`);
    } else {
      navigate(ROUTE_PATH.LOGIN);
    }
  };
  const displayedProducts = isExpanded ? (ranking ?? []) : (ranking ?? []).slice(0, itemsPerPage);
  const buttonText = isExpanded ? '접기' : '더보기';

  return (
    <>
      <RankingHeader>실시간 급상승 선물랭킹</RankingHeader>
      <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      <FilterButtons
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      {displayedProducts.length === 0 ? (
        <div>상품 목록이 없습니다.</div>
      ) : (
        <ProductGrid
          products={displayedProducts}
          onProductClick={(product) => handleProductClick(product.id.toString())}
        />
      )}
      <ButtonContainer>
        <Button onClick={handleToggleView}>{buttonText}</Button>
      </ButtonContainer>
    </>
  );
};
