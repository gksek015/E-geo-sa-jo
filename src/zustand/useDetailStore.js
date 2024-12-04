import { create } from 'zustand';
import supabase from '../supabase/supabaseClient';

export const useDetailStore = create((set) => ({
  storeData: null,
  isLoding: true,
  error: null,

  fetchStoreData: async (testStoreId) => {
    try {
      const { data, error } = await supabase.from('stores').select('*').eq('id', testStoreId);
      if (error) throw error;
      set({ storeData: data, isLoding: false });
      console.log('useDetailStore', data);
    } catch (error) {
      set({ error: error.message, isLoding: false });
    }
  }
}));
