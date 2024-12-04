import { useEffect, useState } from 'react';
import supabase from '../supabase/supabaseClient';
import useStoreData from './useStoreData';
import { toast } from 'react-toastify';
import useAuthStore from '../zustand/useAuthStore';

const useCommentsData = () => {
  const { storeData, tsetId } = useStoreData();
  const { user } = useAuthStore();
  const [commentsData, setCommentsData] = useState([]); // 주스탠드로
  const [commentContent, setCommentContent] = useState('');

  useEffect(() => {
    fetchCommentsData();
  }, [storeData]);

  const fetchCommentsData = async () => {
    if (storeData && storeData[0] && storeData[0].id) {
      const { data, error } = await supabase.from('comments').select('*').eq('store_id', storeData[0].id);

      if (error) {
        console.error('Error fetching comments:', error);
      } else {
        setCommentsData(data);
      }
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!commentContent.trim()) return;

    try {
      const { data, error } = await supabase
        .from('comments') // Make sure this is the correct table name
        .insert([
          {
            user_id: user.id,
            store_id: tsetId,
            content: commentContent
          }
        ])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        setCommentsData([...data, ...commentsData]);
        setCommentContent('');
        console.log('Comment added successfully:', data);
      }
      toast.success('댓글이 추가되었습니다.');
    } catch (error) {
      console.error('댓글 작성 오류: ', error.message);
    }
  };

  const deleteComment = async (commentId) => {
    const { error } = await supabase.from('comments').delete().eq('id', commentId);

    if (error) {
      console.error('Error deleting comment:', error);
    } else {
      fetchCommentsData();
    }
  };

  const updateComment = async (commentId, newContent) => {
    const { error } = await supabase.from('comments').update({ content: newContent }).eq('id', commentId);

    if (error) {
      console.error('Error updating comment:', error);
    } else {
      fetchCommentsData();
    }
  };

  return { commentsData, handleAddComment, deleteComment, updateComment, commentContent, setCommentContent };
};

export default useCommentsData;
