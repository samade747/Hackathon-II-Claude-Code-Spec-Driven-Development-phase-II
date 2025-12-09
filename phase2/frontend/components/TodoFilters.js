'use client';

export default function TodoFilters({ filters, onFiltersChange }) {
  function handleChange(e) {
    const { name, value } = e.target;
    onFiltersChange({ ...filters, [name]: value });
  }

  function handleClear() {
    onFiltersChange({
      status: '',
      priority: '',
      tag: '',
      q: '',
      sort_by: 'created_at',
      order: 'asc',
    });
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div>
          <label htmlFor="q" className="block text-sm font-medium mb-1">
            Search
          </label>
          <input
            type="text"
            id="q"
            name="q"
            value={filters.q || ''}
            onChange={handleChange}
            placeholder="Search tasks..."
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-sm focus:outline-none focus:border-sky-400"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={filters.status || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-sm focus:outline-none focus:border-sky-400"
          >
            <option value="">All</option>
            <option value="open">Open</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium mb-1">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={filters.priority || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-sm focus:outline-none focus:border-sky-400"
          >
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="sort_by" className="block text-sm font-medium mb-1">
            Sort By
          </label>
          <select
            id="sort_by"
            name="sort_by"
            value={filters.sort_by || 'created_at'}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-sm focus:outline-none focus:border-sky-400"
          >
            <option value="created_at">Created Date</option>
            <option value="due_date">Due Date</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>

        <div>
          <label htmlFor="order" className="block text-sm font-medium mb-1">
            Order
          </label>
          <div className="flex gap-2">
            <select
              id="order"
              name="order"
              value={filters.order || 'asc'}
              onChange={handleChange}
              className="flex-1 px-3 py-2 bg-slate-900 border border-slate-600 rounded text-sm focus:outline-none focus:border-sky-400"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            <button
              onClick={handleClear}
              className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm transition"
              title="Clear filters"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
