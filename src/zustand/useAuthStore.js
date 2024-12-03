import { create } from 'zustand';
import supabase from '../supabase/supabaseClient';

// 사용자 정보 전역관리

// set: 상태 관리 함수
const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    try {
      const {
        data: { user },
        error
      } = await supabase.auth.getUser();
      if (error) throw error;
      console.log(user);
      if (user) {
        const { data, error: profileError } = await supabase
          .from('users')
          .select('id, nick_name')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        set({ user: data });
      }
    } catch (error) {
      console.error('사용자 정보를 가져오는 데 실패했습니다:', error.message);
      set({ user: null });
    }
  },
  clearUser: () => set({ user: null })
}));

export default useAuthStore;

// import { create } from "zustand";

// const useAuthStore = create((set) => ({
//   token: null, // 초기 토큰 값

//   setToken: (newToken) => {
//     console.log("setToken called with:", newToken); // 토큰 설정 확인
//     set({ token: newToken });
//   },

//   clearToken: () => {
//     console.log("clearToken called"); // 토큰 초기화 확인
//     set({ token: null });
//   },
// }));

// export default useAuthStore;
