'use client';
import { authClient } from '@/lib/auth-client';
import { useState, useEffect } from 'react';

export default function DebugPage() {
    const [session, setSession] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSession() {
            try {
                const res = await authClient.getSession();
                setSession(res);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        fetchSession();
    }, []);

    return (
        <div className="p-8 bg-slate-900 text-white min-h-screen font-mono">
            <h1 className="text-2xl mb-4 font-bold text-sky-400">Auth Debugger</h1>

            <div className="mb-6 space-y-2">
                <p><strong>URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'SSR'}</p>
                <p><strong>Config Base URL:</strong> {process.env.NEXT_PUBLIC_APP_URL || 'Not Set'}</p>
            </div>

            <div className="p-4 bg-slate-800 rounded border border-slate-700">
                <h2 className="text-xl mb-2 text-yellow-500">Session State</h2>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-400">Error: {error}</p>}
                {!loading && !error && (
                    <pre className="whitespace-pre-wrap text-sm text-green-300">
                        {JSON.stringify(session, null, 2)}
                    </pre>
                )}
                {!loading && !session?.data && <p className="text-red-400 mt-2">No active session found.</p>}
            </div>

            <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
            >
                Refresh
            </button>
        </div>
    );
}
