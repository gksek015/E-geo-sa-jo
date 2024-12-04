import { create } from 'zustand';

export const usePostStore = create((set) => ({
  formData: {
    name: '',
    map_address: '',
    location: null,
    category: '',
    description: '',
  },
  setFormData: (key, value) =>
    set((state) => ({
      formData: { ...state.formData, [key]: value }
    })),
  resetForm: () =>
    set({
      formData: {
        name: '',
        map_address: '',
        location: null,
        category: '',
        description: '',
      }
    })
}));
