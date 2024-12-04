import { useNavigate } from 'react-router-dom';
import useTopLikeData from '../hooks/useTopLikeData';
import styled from 'styled-components';

const ListPage = () => {
  const { topStores } = useTopLikeData();
  const navigate = useNavigate();

  return (
    <Container>
      <Title>붕빵집 Top 10</Title>
      <List>
        {topStores.map((store, index) => (
          <Card key={store.id} onClick={() => navigate(`/list/${store.id}`)}>
            <Rank>{index + 1}위</Rank>
            <Info>
              <CardTitle>{store.name}</CardTitle>
              <CardAddress>{store.address}</CardAddress>
            </Info>
            <LikesCount>❤️ {store.totalLikes}</LikesCount>
          </Card>
        ))}
      </List>
    </Container>
  );
};

export default ListPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 1280px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-family: 'Jalnan 2';
  font-weight: 400;
  font-size: 36px;
  margin-bottom: 20px;
  color: #b47b46;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #b47b46;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const Rank = styled.div`
  font-family: 'Jalnan 2';
  font-size: 36px;
  font-weight: 400;
  color: #b47b46;
  margin-right: 30px;
`;

const CardTitle = styled.h2`
  font-family: 'Jalnan 2';
  font-size: 24px;
  font-weight: 400;
  color: #b47b46;
  margin-bottom: 8px;
`;

const CardAddress = styled.p`
  font-family: 'Jalnan 2';
  font-size: 18px;
  font-weight: 400;
  color: #666666;
`;

const LikesCount = styled.span`
  font-size: 22px;
  color: #f45;
`;
