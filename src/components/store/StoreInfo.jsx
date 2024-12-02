import styled from 'styled-components';
import useStoreData from '../../hooks/useStoreData';
import StoreDetail from './StoreDetail';

function StoreInfo() {
  const { storeData, isLoading, error, id } = useStoreData();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <>
      <StoreInfoContainer key={id}>
        {storeData.map((store) => (
          <StoreDetail store={store} />
        ))}
      </StoreInfoContainer>
    </>
  );
}

const StoreInfoContainer = styled.div`
  width: 600px;
  height: 350px;
`;

export default StoreInfo;
