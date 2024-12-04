import supabase from '../supabase/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { getId } from './auth';

// 유저 정보 불러오기
export const fetchUserProfile = async () => {
  const userId = await getId();
  const { data, error } = await supabase.from('users').select('profile_image, nick_name').eq('id', userId).single();

  if (error) {
    toast.error('유저 정보를 불러오지 못했습니다!');
    return;
  }
  return data;
};

// 새로운 닉네임으로 변경
export const updateNickname = async (newNickname) => {
  const userId = await getId();
  const { error } = await supabase.from('users').update({ nick_name: newNickname }).eq('id', userId);

  if (error) {
    toast.warning('이미 사용 중인 닉네임입니다.');
    return false;
  }
  return true;
};

// 프로필 이미지 업로드 및 URL 가져오기
export const updateProfileImage = async (file) => {
  const userId = await getId();
  const { data: imageData, error: uploadError } = await supabase.storage
    .from('profile_image')
    .upload(`${uuidv4()}.png`, file);

  if (uploadError) {
    console.error('uploadError', uploadError);
    return;
  }

  const { data: publicUrlData } = supabase.storage.from('profile_image').getPublicUrl(imageData.path);
  const imageUrl = publicUrlData.publicUrl;

  // auth users에 프로필 이미지 업데이트
  const { error: authError } = await supabase.auth.updateUser({
    data: { profileImg: imageUrl }
  });

  if (authError) {
    console.error('authError', authError);
  }

  // public users에 프로필 이미지 업데이트
  const { error: updateError } = await supabase.from('users').update({ profile_image: imageUrl }).eq('id', userId);

  if (updateError) {
    console.error('updateError', updateError);
    toast.error('프로필 사진 변경에 실패했습니다.');
  }

  return imageUrl;
};

// storage public 에서 default image 불러오기
export const fetchDefaultImage = () => {
  const { data } = supabase.storage.from('profile_image').getPublicUrl('default.png');
  const defaultImageUrl = data.publicUrl;
  return defaultImageUrl;
};
