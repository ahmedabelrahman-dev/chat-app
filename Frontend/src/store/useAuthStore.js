import { create } from 'zustand';
import instance from '../lib/axios.js';
import toast from 'react-hot-toast';

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
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await instance.post('/auth/signup', data);
      set({ authUser: res.data });
      toast.success('Signup successful!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
      console.error('Error during signup:', error);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await instance.post('/auth/login', data);
      set({ authUser: res.data });
      toast.success('Login successful!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      console.error('Error during login:', error);
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
