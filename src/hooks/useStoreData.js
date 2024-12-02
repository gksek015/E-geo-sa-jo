import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabase/supabaseClient';

const useStoreData = () => {
  const { id } = useParams();
  const tsetId = '49aea70d-a279-4717-a328-529adf49d39b';

  const [user, setUser] = useState({});
  const [storeData, setStoreData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, []);

  useEffect(() => {
    const getUser = async () => {
      // const {
      //   data: { user },
      //   error
      // } = await supabase.auth.getUser();
      // if (error) {
      //   console.error('사용자 정보를 가져오는 데 실패했습니다:', error.message);
      // }
      // console.log('user', user);
      // if (user) {
      const { data, error } = await supabase.from('users').select('id, nick_name');
      if (error) {
        console.error('프로필 정보를 가져오는 데 실패했습니다:', error.message);
      }
      setUser(data);
      // }
    };
    getUser();
  }, []);

  return { storeData, isLoading, error, id, tsetId, user };
};

export default useStoreData;
