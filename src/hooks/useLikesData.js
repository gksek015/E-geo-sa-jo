import { useState } from 'react';
import { toast } from 'react-toastify';
import supabase from '../supabase/supabaseClient';
import useAuthStore from '../zustand/useAuthStore';

const useLikesData = (storeId) => {
  const { user } = useAuthStore();
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const fetchLikes = async () => {
    if (storeId) {
      const { data, error } = await supabase.from('likes').select('count').eq('store_id', storeId);

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
          .eq('store_id', storeId)
          .eq('user_id', user.id);
        setIsLiked(!!userLike.length);
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
        await supabase.from('likes').delete().eq('store_id', storeId).eq('user_id', user.id);
        setLikes((prev) => prev - 1);
        setIsLiked(false);
        toast.success('좋아요가 취소되었습니다.');
      } else {
        await supabase.from('likes').insert([
          {
            user_id: user.id,
            store_id: storeId,
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

  return { likes, isLiked, handleLike, fetchLikes };
};

export default useLikesData;
