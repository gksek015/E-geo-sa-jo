import { useState, useEffect } from 'react';
import useStoreData from './useStoreData';
import { toast } from 'react-toastify';
import supabase from '../supabase/supabaseClient';
import useAuthStore from '../zustand/useAuthStore';

const useLikesData = () => {
  const { tsetId } = useStoreData();
  const { user } = useAuthStore();
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetchLikes();
  }, [tsetId, user]);

  const fetchLikes = async () => {
    if (tsetId) {
      const { data, error } = await supabase.from('likes').select('count').eq('store_id', tsetId);

      if (error) {
        console.error('Error fetching likes:', error.message);
      } else {
        const totalLikes = data.reduce((sum, item) => sum + item.count, 0);
        setLikes(totalLikes);
      }

      if (user) {
        const { data: userLike } = await supabase
          .from('likes')
          .select('*')
          .eq('store_id', tsetId)
          .eq('user_id', user.id)
          .single();

        setIsLiked(!!userLike);
      }
    }
  };

  const handleLike = async () => {
    if (!user) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    try {
      if (isLiked) {
        await supabase.from('likes').delete().eq('store_id', tsetId).eq('user_id', user.id);
        setLikes((prev) => prev - 1);
        setIsLiked(false);
        toast.success('좋아요가 취소되었습니다.');
      } else {
        await supabase.from('likes').insert([
          {
            user_id: user.id,
            store_id: tsetId,
            count: 1
          }
        ]);
        setLikes((prev) => prev + 1);
        setIsLiked(true);
        toast.success('좋아요가 추가되었습니다.');
      }
    } catch (error) {
      console.error('좋아요 처리 오류: ', error.message);
      toast.error('좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  return { likes, isLiked, handleLike };
};

export default useLikesData;
