import styled from 'styled-components';
import useStoreData from '../../hooks/useStoreData';
import StoreDetail from './StoreDetail';
import { useDetailStore } from '../../zustand/useDetailStore';
import { useEffect } from 'react';

function StoreInfo() {
  // 커스텀훅
  // const { storeData, isLoading, error, id, testId } = useStoreData();

  // 주스탠드
  const { fetchStoreData, storeData, isLoading, error, id, testId } = useDetailStore();
  console.log(storeData);

  const testStoreId = '49aea70d-a279-4717-a328-529adf49d39b';
  useEffect(() => {
    fetchStoreData(testStoreId);
  }, []);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <>
      <StoreInfoContainer key={testId}>
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
