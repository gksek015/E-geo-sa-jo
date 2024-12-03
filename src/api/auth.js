import supabase from '../supabase/supabaseClient';
import { toast } from 'react-toastify';

// user Id 가져오기
export const getId = async () => {
  const {
    data: {
      session: {
        user: { id }
      }
    },
    error
  } = await supabase.auth.getSession();
  if (error || !id) {
    return alert('로그인 상태가 아닙니다.');
  }
  return id;
};

// 비밀번호 변경
export const updatePassword = async (newPassword) => {
  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    toast.error('비밀번호 변경에 실패했습니다.');
  }
};

// 계정 삭제
export const deleteUser = async () => {
  const user_id = await getId();
  await supabase.auth.signOut();
  const { error } = await supabase.rpc('delete_user', { user_id });
  if (error) {
    toast.error('에러가 발생했습니다!');
  }
};
