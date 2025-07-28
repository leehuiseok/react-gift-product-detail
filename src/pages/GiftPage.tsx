import styled from '@emotion/styled';
import { colors } from '@/styles/tokens';
import { Header } from '@/components/Header/Header';
import { CategoryGrid } from '@/components/CategoryGrid/CategoryGrid';
import { Banner } from '@/components/Banner/Banner';
import { FriendSelector } from '@/components/FriendSelector/FriendSelector';
import { RankingSection } from '@/components/RankingSection/RankingSection';
import { useFetchThemes } from '@/hooks/useFetchThemes';
import { useNavigate } from 'react-router';
import { Suspense } from 'react';
import { Loading } from '@/components/common/Loading';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

const AppContainer = styled.div`
  max-width: 720px;
  margin: 0 auto;
  background-color: ${colors.gray50};
  min-height: 100vh;
`;

export const GiftPage = () => {
  const { data: themes } = useFetchThemes();
  const navigate = useNavigate();

  return (
    <AppContainer>
      <Header title="선물하기" />
      <FriendSelector onClick={() => console.log('선물할 친구 선택')} />
      <ErrorBoundary customMessage="테마를 불러오는 중 오류가 발생했습니다.">
        <Suspense fallback={<Loading />}>
          {themes && (
            <CategoryGrid
              categories={themes}
              onCategoryClick={(category) => navigate(`/theme/${category.themeId}`)}
            />
          )}
        </Suspense>
      </ErrorBoundary>
      <Banner
        text="카카오테크 캠퍼스 3기 여러분 프로트엔드 2단계 과제 화이팅! 🎉"
        onClick={() => console.log('Banner 클릭')}
      />
      <ErrorBoundary customMessage="랭킹을 불러오는 중 오류가 발생했습니다.">
        <Suspense fallback={<Loading />}>
          <RankingSection />
        </Suspense>
      </ErrorBoundary>
    </AppContainer>
  );
};
