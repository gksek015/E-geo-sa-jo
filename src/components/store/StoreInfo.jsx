import styled from 'styled-components';
import StoreDetail from './StoreDetail';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDetailStore } from '../../zustand/useDetailStore';

function StoreInfo() {
  // 주스탠드
  const { fetchStoreData, storeData, isLoading, error } = useDetailStore();
  const { id } = useParams();

  useEffect(() => {
    fetchStoreData(id);
  }, []);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <>
      <StoreInfoContainer>
        {storeData?.map((store) => (
          <StoreDetail key={store.id} store={store} />
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
