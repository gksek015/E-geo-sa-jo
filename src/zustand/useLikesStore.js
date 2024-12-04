import { create } from 'zustand';
import { toast } from 'react-toastify';
import supabase from '../supabase/supabaseClient';
import useAuthStore from '../zustand/useAuthStore';

const useLikesStore = create((set, get) => ({
  likes: 0,
  isLiked: false,

  fetchLikes: async (testId = '49aea70d-a279-4717-a328-529adf49d39b') => {
    const { user } = useAuthStore.getState();
    console.log(user);

    if (testId) {
      const { data, error } = await supabase.from('likes').select('count').eq('store_id', testId);

      if (error) {
        console.error('Error fetching likes:', error.message);
      } else {
        const totalLikes = data.reduce((sum, item) => sum + item.count, 0);
        set({ likes: totalLikes });
      }

      if (user) {
        const { data: userLike } = await supabase
          .from('likes')
          .select('*')
          .eq('store_id', testId)
          .eq('user_id', user.id)
          .single();

        set({ isLiked: !!userLike });
      }
    }
  },

  handleLikes: async (testId = '49aea70d-a279-4717-a328-529adf49d39b') => {
    const { user } = useAuthStore();
    const { isLiked } = get();

    if (!user) {
      console.log(user);
      toast.error('로그인이 필요합니다.');
      return;
    }

    try {
      if (isLiked) {
        await supabase.from('likes').delete().eq('store_id', testId).eq('user_id', user.id);
        set((state) => ({ likes: state.likes - 1, isLiked: false }));
        toast.success('좋아요가 취소되었습니다.');
      } else {
        await supabase.from('likes').insert([
          {
            user_id: user.id,
            store_id: testId,
            count: 1
          }
        ]);
        set((state) => ({ likes: state.likes + 1, isLiked: true }));
        toast.success('좋아요가 추가되었습니다.');
      }
    } catch (error) {
      console.error('좋아요 처리 오류: ', error.message);
      toast.error('좋아요 처리 중 오류가 발생했습니다.');
    }
  }
}));

export default useLikesStore;
