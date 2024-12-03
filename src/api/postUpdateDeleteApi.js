import supabase from '../supabase/supabaseClient';

const storeId = '49aea70d-a279-4717-a328-529adf49d39b';

//데이터 정보 가져오기
export const fetchPost = async () => {
  const { data, error } = await supabase.from('stores').select('*').eq('id', storeId).single();

  if (error) {
    console.error('Supabase 데이터 가져오기 실패:', error);
    throw error;
  }

  return data; // 성공적으로 가져온 데이터 반환
};

export const fetchMap = async () => {
  const { data, error } = await supabase.from('stores').select('location').eq('id', storeId).single();

  if (error) {
    console.error('Supabase 데이터 가져오기 실패:', error);
    throw error;
  }

  return data; // 성공적으로 가져온 데이터 반환
};

// 데이터 삭제 함수
export const deletePost = async () => {
  const { error } = await supabase.from('stores').delete().eq('id', storeId);

  if (error) {
    console.error('Supabase 데이터 삭제 실패:', error);
    throw error;
  }
};

//데이터 수정 함수
export const updatePost = async (formData) => {
  const { data, error } = await supabase.from('stores').update(formData).eq('id', storeId).select();

  if (error) {
    console.error('Supabase 데이터 업데이트 실패:', error);
    throw error;
  }

  return data; // 성공적으로 업데이트된 데이터 반환
};
