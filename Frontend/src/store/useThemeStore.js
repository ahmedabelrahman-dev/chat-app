import { create } from 'zustand';

export const useThemeStore = create((set) => {
  // Load from localStorage or default to 'coffee'
  const savedTheme = localStorage.getItem('chat-theme') || 'coffee';

  // Apply it immediately when store initializes
  document.documentElement.setAttribute('data-theme', savedTheme);

  return {
    theme: savedTheme,
    setTheme: (theme) => {
      localStorage.setItem('chat-theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
      set({ theme });
    },
  };
});
