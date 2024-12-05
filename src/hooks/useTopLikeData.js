import { useState, useEffect } from 'react';
import supabase from '../supabase/supabaseClient';

// 좋아요 상위 10개 스토어 데이터를 가져오는 훅
const useTopLikeData = () => {
  const [topStores, setTopStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTopLikedStores();
  }, []);

  const fetchTopLikedStores = async () => {
    setLoading(true);
    try {
      // 좋아요 데이터 가져오기
      const { data, error } = await supabase.from('stores').select('id, name, map_address, likes (count)'); // 상위 10개만 가져오기

      if (error) {
        throw error;
      }

      // 좋아요 수 계산 및 정리
      const formattedData = data
        .map((store) => ({
          id: store.id,
          name: store.name,
          address: store.map_address,
          totalLikes: store.likes.length // likes 배열의 길이로 계산
        }))
        .sort((a, b) => b.totalLikes - a.totalLikes)
        .slice(0, 10);

      setTopStores(formattedData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { topStores, loading, error };
};

export default useTopLikeData;
