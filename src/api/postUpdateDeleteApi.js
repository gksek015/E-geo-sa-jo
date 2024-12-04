import supabase from '../supabase/supabaseClient';

//데이터 정보 가져오기
export const fetchPost = async (storeId) => {
  const { data, error } = await supabase.from('stores').select('*').eq('id', storeId).single();

  if (error) {
    console.error('Supabase 데이터 가져오기 실패:', error);
    throw error;
  }

  return data; // 성공적으로 가져온 데이터 반환
};

export const fetchMap = async (storeId) => {
  const { data, error } = await supabase.from('stores').select('location').eq('id', storeId).single();

  if (error) {
    console.error('Supabase 데이터 가져오기 실패:', error);
    throw error;
  }

  return data; // 성공적으로 가져온 데이터 반환
};

// 데이터 삭제 함수
export const deletePost = async (storeId) => {
  const { error } = await supabase.from('stores').delete().eq('id', storeId);

  if (error) {
    console.error('Supabase 데이터 삭제 실패:', error);
    throw error;
  }
};

//데이터 수정 함수
export const updatePost = async (formData,storeId) => {
  const { data, error } = await supabase.from('stores').update(formData).eq('id', storeId).select();

  if (error) {
    console.error('Supabase 데이터 업데이트 실패:', error);
    throw error;
  }

  return data; // 성공적으로 업데이트된 데이터 반환
};
