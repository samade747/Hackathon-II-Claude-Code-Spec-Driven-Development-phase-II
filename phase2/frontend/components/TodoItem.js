'use client';

export default function TodoItem({ task, onToggle, onEdit, onDelete }) {
  const priorityColors = {
    high: 'text-red-400',
    medium: 'text-yellow-400',
    low: 'text-green-400',
  };

  const statusColor = task.status === 'done' ? 'text-slate-500 line-through' : 'text-slate-100';

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggle(task.id)}
              className="flex-shrink-0 w-5 h-5 rounded border-2 border-slate-500 hover:border-sky-400 transition"
            >
              {task.status === 'done' && (
                <svg className="w-full h-full text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <div className="flex-1">
              <h3 className={`text-lg font-medium ${statusColor}`}>{task.title}</h3>
              {task.description && (
                <p className="text-slate-400 mt-1 text-sm">{task.description}</p>
              )}
              <div className="flex items-center gap-2 mt-2">
                {task.priority && (
                  <span className={`text-xs px-2 py-1 rounded bg-slate-700 ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                )}
                {task.tags && (
                  <span className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300">
                    {task.tags}
                  </span>
                )}
                {task.due_date && (
                  <span className="text-xs text-slate-400">
                    Due: {new Date(task.due_date).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1 text-sm bg-slate-700 hover:bg-slate-600 rounded transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-3 py-1 text-sm bg-red-900/50 hover:bg-red-900 rounded transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
