import { create } from "zustand";

// 사용자 정보 전역관리

// set: 상태 관리 함수
const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
