import supabase from '../supabase/supabaseClient';

// 데이터 추가 함수
export const addPost = async (formData) => {
  const { data, error } = await supabase.from('stores').insert([formData]);

  if (error) {
    console.error('Supabase 데이터 추가 실패:', error);
    throw error;
  }

  return data; // 성공적으로 추가된 데이터 반환
};
