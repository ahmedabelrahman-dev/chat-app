import { create } from 'zustand';
import instance from '../lib/axios.js';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const BASE_URL =
  import.meta.env.MODE === 'development' ? 'http://localhost:5001' : '/';
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await instance.get('/auth/check');
      set({ authUser: res.data });
      get().connectSocket();
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
      get().connectSocket();
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
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      console.error('Error during login:', error);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await instance.post('/auth/logout');
      set({ authUser: null });
      toast.success('logged out succesfullly');
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await instance.put('/auth/updateProfile', data);
      set({ authUser: res.data });
      toast.success('profile updated successfully');
    } catch (error) {
      console.log('error in updating profile', error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on('getOnlineUsers', (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
