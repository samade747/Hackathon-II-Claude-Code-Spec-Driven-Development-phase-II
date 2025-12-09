'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const session = await authClient.getSession();
        setUser(session?.user || null);
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function handleSignOut() {
    try {
      await authClient.signOut();
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  }

  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-sky-400">
            Todo App
          </Link>

          <div className="flex items-center gap-4">
            {loading ? (
              <span className="text-slate-400">Loading...</span>
            ) : user ? (
              <>
                <Link
                  href="/todos"
                  className="text-slate-300 hover:text-sky-400 transition"
                >
                  My Tasks
                </Link>
                <span className="text-slate-400">{user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="px-4 py-2 text-slate-300 hover:text-sky-400 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 rounded transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
