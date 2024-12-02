import { create } from 'zustand';

export const useCommentStore = create((set) => ({
  commentData: {
    conent: ''
  },
  setCommentData: (key, value) =>
    set((prve) => ({
      commentData: { ...prve.commentData, [key]: value }
    }))
}));

const postDetailData = async () => {
  const { data, error } = await supabase.from('stores').select('id', 'description', 'user_id');

  if (error) {
    console.error(error);
  } else {
    // setData(data);
    // set 어쩌 구
  }
};
