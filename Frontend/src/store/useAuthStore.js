import { create } from 'zustand';
import instance from '../lib/axios.js';

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await instance.get('/auth/check');
      set({ authUser: res.data });
    } catch (error) {
      console.error('Error checking auth status:', error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
