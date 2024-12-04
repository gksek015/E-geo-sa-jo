import supabase from '../supabase/supabaseClient';

// Default 이미지 URL 가져오기
export const fetchDefaultImageUrl = () => {
  const { data } = supabase.storage.from('post_image').getPublicUrl('default.png');
  return data?.publicUrl || null;
};

// 사용자 데이터 가져오기
export const fetchMyData = async (userId) => {
  const { data, error } = await supabase
    .from('stores')
    .select('id, name, map_address, category')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user data:', error);
    return [];
  }
  return data;
};

// 게시글 삭제
export const deletePost = async (postId) => {
  const { error } = await supabase
    .from('stores')
    .delete()
    .eq('id', postId); 

  if (error) {
    console.error('Error deleting post:', error);
    return false;
  }
  return true;
};

// 사용자 정보 가져오기
export const fetchUserData = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }
  return data?.user; 
};
