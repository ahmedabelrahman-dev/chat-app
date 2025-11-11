import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage.jsx';
import Navbar from './components/Navbar.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import { Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import { useThemeStore } from './store/useThemeStore';
import { useAuthStore } from './store/useAuthStore.js';

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log('Auth User:', { authUser });

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <LoginPage />} />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <HomePage />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <HomePage />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <LoginPage />}
        />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
