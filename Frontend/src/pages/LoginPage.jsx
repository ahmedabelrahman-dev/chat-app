import { useAuthStore } from '../store/useAuthStore.js';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageSquare, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import AuthImagePattern from '../components/AuthImagePattern.jsx';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login, isLoggingIn } = useAuthStore();
  const validateForm = () => {
    const { email, password } = formData;

    if (!email.trim()) {
      toast.error('Email is required');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    if (!password.trim()) {
      toast.error('Password is required');
      return false;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) login(formData);
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Login</h1>
              <p className="text-base-content/60">
                login into you exesting acount
              </p>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-base-content/40 size-5" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  placeholder="john.doe@example.com"
                  className="input input-bordered w-full pl-10"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-base-content/40 size-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  placeholder="********"
                  className="input input-bordered w-full pl-10 pr-10"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="text-base-content/40 size-5" />
                  ) : (
                    <Eye className="text-base-content/40 size-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  LoggingIn Up...
                </>
              ) : (
                'Log in'
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/50">
              you don't have an account?{' '}
              <Link to="/signup" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Right Side - Image */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends and the world around you."
      />
    </div>
  );
};

export default LoginPage;
