import styled from 'styled-components';
import StoreDetail from './StoreDetail';
import { useDetailStore } from '../../zustand/useDetailStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function StoreInfo() {
  // 주스탠드
  const { fetchStoreData, storeData, isLoading, error } = useDetailStore();
  // const testStoreId = '49aea70d-a279-4717-a328-529adf49d39b';
  const { id } = useParams();

  useEffect(() => {
    fetchStoreData(id);
  }, []);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <>
      <StoreInfoContainer key={id}>
        {storeData?.map((store) => (
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
