'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { Loader2, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

function SessionDebugger() {
  const [debugSession, setDebugSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkExisting() {
      const res = await authClient.getSession();
      if (res?.data) {
        console.log("Already logged in, redirecting to /todos");
        router.push('/todos');
      }
    }
    checkExisting();
  }, [router]);

  useEffect(() => {
    async function check() {
      try {
        const res = await authClient.getSession();
        setDebugSession(res);
      } catch (e) { setDebugSession({ error: e.message }); }
      finally { setLoading(false); }
    }
    check();
  }, []);

  return (
    <div>
      <div className="mb-1">Detected Session: {loading ? 'Checking...' : (debugSession?.data ? 'YES (Logged In) -> Redirecting...' : 'NO (Null)')}</div>
      <pre>{JSON.stringify(debugSession, null, 2)}</pre>
      <button onClick={() => window.location.reload()} className="mt-2 text-sky-400 underline">Refresh Page</button>
    </div>
  );
}

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await authClient.signIn.email({
        email: formData.email.trim(),
        password: formData.password.trim(),
      });

      router.push('/todos');
    } catch (err) {
      console.error('Sign in error:', err);
      // Better-auth errors can be vague, so we provide a generic fallback if needed
      setError(err?.message || 'Invalid email or password. Please try again.');
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
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>

          <div className="relative relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-2">
                Welcome Back
              </h1>
              <p className="text-slate-400">Sign in to continue to Todo App</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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
                <div className="flex justify-between items-center ml-1">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                    Password
                  </label>
                </div>
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
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-10 py-2.5 bg-slate-950/50 border border-slate-700/50 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 focus:outline-none focus:ring-2 focus:ring-sky-500/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-400 text-sm">
                Don't have an account?{' '}
                <Link href="/signup" className="text-sky-400 hover:text-sky-300 font-medium hover:underline transition-all">
                  Create one now
                </Link>
              </p>
            </div>

            {/* DEBUG SECTION - REMOVE AFTER FIXING */}
            <div className="mt-8 p-4 bg-slate-950/50 rounded-lg text-xs font-mono text-slate-400 border border-slate-800">
              <p className="mb-2 font-bold text-slate-300">Auth Debugger:</p>
              <SessionDebugger />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

