import { create } from 'zustand';
import supabase from '../supabase/supabaseClient';
import { toast } from 'react-toastify';
// import useAuthStore from '../../zustand/useAuthStore';

export const useCommentStore = create((set, get) => ({
  // const { user } = useAuthStore();
  commentData: [],
  commentContent: '',
  // commentCounter: 0,

  setCommentContent: (content) => set({ commentContent: content }),
  setCommentData: (commentData) => set({ commentData }),

  fetchCommentsData: async (storeId) => {
    const { data, error } = await supabase
      .from('comments')
      .select('*, users!comments_user_id_fkey(nick_name, profile_image)')
      .eq('store_id', storeId);
    console.log(data);
    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      set({ commentData: data });
      // const totalComments = data.length;
      // set({ commentCounter: totalComments });
    }
  },

  addComment: async (userId, storeId) => {
    const { commentData, commentContent, setCommentData, setCommentContent } = get(); // 주스탠드에서 사용하는 state 를 불러 오려면 get을 사용해야된다!

    if (!commentContent.trim()) return;

    try {
      const { data, error } = await supabase
        .from('comments') // Make sure this is the correct table name
        .insert([
          {
            user_id: userId,
            store_id: storeId,
            content: commentContent
          }
        ])
        .select('*, users!comments_user_id_fkey(nick_name, profile_image)');

      if (error) throw error;

      if (data && data.length > 0) {
        setCommentData([...commentData, ...data]);
        setCommentContent('');
        console.log('Comment added successfully:', data);
      }
      toast.success('댓글이 추가되었습니다.');
    } catch (error) {
      console.error('댓글 작성 오류: ', error.message);
    }
  },

  deleteComment: async (commentId, id) => {
    const { fetchCommentsData } = get(); //
    const { error } = await supabase.from('comments').delete().eq('id', commentId);

    if (error) {
      console.error('Error deleting comment:', error);
    } else {
      // setCommentData([...commentData, ...data]);
      fetchCommentsData(id);
    }
  }
}));
