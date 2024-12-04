import supabase from '../supabase/supabaseClient';

// 로그인
export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

// 회원가입 로직
export const signup = async (email, password, nickname) => {
   try {
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { nick_name: nickname },
    },
  });
  if (signupError) {
    throw new Error("회원가입에 실패했습니다.")
}

if (!signupData.user) {
    throw new Error("사용자 정보를 가져오는 데 실패했습니다.")
}

  const {error: insertError} = await supabase.from("users").insert({
    id: signupData.user.id,
    email: signupData.user.email,
    nick_name: nickname,
  })
  
  if (insertError) {
    throw new Error("사용자 정보를 저장하는 데 실패했습니다.")
  }

  return signupData;
   } catch (error) {
    throw new Error(error.message || "알 수 없는 오류가 발생했습니다.")
   } 
};

// 로그아웃 로직
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

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
    toast.error('현재 비밀번호와 다른 비밀번호를 입력해주세요.');
    return false;
  }

  return true;
};

// 계정 삭제
export const deleteUser = async () => {
  const user_id = await getId();
  await supabase.auth.signOut();
  const { error } = await supabase.rpc('delete_user', { user_id });
  if (error) {
    toast.error('에러가 발생했습니다!');
    return false;
  }
   return true;
};