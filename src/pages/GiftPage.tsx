import styled from '@emotion/styled';
import { colors } from '@/styles/tokens';
import { Header } from '@/components/Header/Header';
import { CategoryGrid } from '@/components/CategoryGrid/CategoryGrid';
import { Banner } from '@/components/Banner/Banner';
import { FriendSelector } from '@/components/FriendSelector/FriendSelector';
import { RankingSection } from '@/components/RankingSection/RankingSection';
import { useFetchThemes } from '@/api/fetchThemes';
import { useNavigate } from 'react-router';

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
      {themes && (
        <CategoryGrid
          categories={themes}
          onCategoryClick={(category) => navigate(`/theme/${category.themeId}`)}
        />
      )}
      <Banner
        text="카카오테크 캠퍼스 3기 여러분 프로트엔드 2단계 과제 화이팅! 🎉"
        onClick={() => console.log('Banner 클릭')}
      />
      <RankingSection />
    </AppContainer>
  );
};
