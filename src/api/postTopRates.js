import supabase from '../supabase/supabaseClient';

export const postTopRates = async () => {
  const { data, error } = await supabase
    .from('likes')
    .select('id, name, map_address, likes(id)', { count: 'exact' })
    .order('likes_id', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Top stores 데이터 가져오기 실패:', error);
    throw error;
  }

  // 좋아요 수 계산
  return data.map((store) => ({
    id: store.id,
    name: store.name,
    address: store.map_address,
    totalLikes: store.likes.length
  }));
};
