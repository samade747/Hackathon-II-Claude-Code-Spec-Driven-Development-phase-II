import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold mb-6 text-sky-400">
          Todo App - Phase II
        </h1>
        <p className="text-xl text-slate-300 mb-8">
          Evolution of Todo: Full-Stack Web Application
        </p>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <ul className="text-left space-y-2 text-slate-300">
            <li className="flex items-center gap-2">
              <span className="text-sky-400">✓</span> Multi-user authentication with Better Auth
            </li>
            <li className="flex items-center gap-2">
              <span className="text-sky-400">✓</span> Create, read, update, and delete tasks
            </li>
            <li className="flex items-center gap-2">
              <span className="text-sky-400">✓</span> Filter by status, priority, and tags
            </li>
            <li className="flex items-center gap-2">
              <span className="text-sky-400">✓</span> Search tasks by title or description
            </li>
            <li className="flex items-center gap-2">
              <span className="text-sky-400">✓</span> Sort tasks by different criteria
            </li>
            <li className="flex items-center gap-2">
              <span className="text-sky-400">✓</span> Persistent storage with PostgreSQL/SQLite
            </li>
          </ul>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
          <div className="grid grid-cols-2 gap-4 text-slate-300">
            <div>
              <h3 className="font-semibold text-sky-400 mb-2">Frontend</h3>
              <ul className="text-sm space-y-1">
                <li>Next.js 14 (App Router)</li>
                <li>React 18</li>
                <li>Tailwind CSS</li>
                <li>Better Auth</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sky-400 mb-2">Backend</h3>
              <ul className="text-sm space-y-1">
                <li>FastAPI</li>
                <li>SQLModel</li>
                <li>PostgreSQL / SQLite</li>
                <li>JWT Authentication</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/todos"
            className="px-8 py-3 bg-sky-600 hover:bg-sky-500 rounded-lg text-lg font-semibold transition"
          >
            Go to Tasks
          </Link>
          <Link
            href="/signup"
            className="px-8 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-lg font-semibold transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
