import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabase/supabaseClient';
import useAuthStore from '../zustand/useAuthStore';

const useStoreData = () => {
  const { id } = useParams();
  const tsetId = '49aea70d-a279-4717-a328-529adf49d39b';

  // 주스탠트로 변환
  const [storeData, setStoreData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { fetchUser } = useAuthStore();

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const { data, error } = await supabase.from('stores').select('*').eq('id', tsetId);
        if (error) throw error;
        setStoreData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoreData();
    fetchUser();
  }, []);

  return { storeData, isLoading, error, id, tsetId };
};

export default useStoreData;
