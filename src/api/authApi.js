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
