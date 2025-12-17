'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { Loader2, Mail, Lock, UserPlus, CheckCircle2, XCircle, Eye, EyeOff } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  }

  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
  const passwordLengthValid = formData.password.length >= 8;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsSubmitting(true);

    try {
      await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
      });

      router.push('/todos');
    } catch (err) {
      console.error('Sign up error:', err);
      setError(err?.message || 'Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Glassmorphism Card */}
        <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-700/50 rounded-2xl p-8 shadow-2xl relative overflow-hidden">

          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-40 h-40 bg-sky-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500 mb-2">
                Create Account
              </h1>
              <p className="text-slate-400">Join Todo App today</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-sky-400 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-950/50 border border-slate-700/50 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-sky-400 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    placeholder="At least 8 characters"
                    className="block w-full pl-10 pr-10 py-2.5 bg-slate-950/50 border border-slate-700/50 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-10 pr-2 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 ml-1">
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-sky-400 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Repeat password"
                    className={`block w-full pl-10 pr-10 py-2.5 bg-slate-950/50 border rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 transition-all duration-200 ${formData.confirmPassword && !passwordsMatch
                        ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                        : 'border-slate-700/50 focus:border-sky-500/50 focus:ring-sky-500/20'
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-10 pr-2 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 focus:outline-none focus:ring-2 focus:ring-sky-500/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Sign Up
                    <UserPlus size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-400 text-sm">
                Already have an account?{' '}
                <Link href="/signin" className="text-sky-400 hover:text-sky-300 font-medium hover:underline transition-all">
                  Sign in instead
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
