import { create } from 'zustand';
import supabase from '../supabase/supabaseClient';

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
