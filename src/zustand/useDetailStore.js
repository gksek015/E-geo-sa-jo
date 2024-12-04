import { create } from 'zustand';
import supabase from '../supabase/supabaseClient';

export const useDetailStore = create((set) => ({
  storeData: null,
  isLoding: true,
  error: null,

  fetchStoreData: async (id) => {
    try {
      const { data, error } = await supabase.from('stores').select('*').eq('id', id);
      if (error) throw error;
      set({ storeData: data, isLoding: false });
    } catch (error) {
      set({ error: error.message, isLoding: false });
    }
  }
}));
