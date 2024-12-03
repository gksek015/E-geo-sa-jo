import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { postTopRates } from '../../api/postTopRates';

const TopStoresList = () => {
  const {
    data: stores,
    isLoading,
    error
  } = useQuery({
    queryKey: ['topStores'],
    queryFn: postTopRates
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  return (
    <div>
      <h1>붕빵집 Top 10</h1>
      <ul>
        {stores.map((store, index) => (
          <li key={store.id}>
            <div>{index + 1}위</div>
            <div>
              <div className="store-name">{store.name}</div>
              <div className="store-address">주소: {store.address}</div>
            </div>
            <div>❤️ {store.totalLikes}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopStoresList;
