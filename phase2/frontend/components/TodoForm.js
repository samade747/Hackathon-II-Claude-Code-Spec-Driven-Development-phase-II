'use client';

import { useState } from 'react';

export default function TodoForm({ task, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || '',
    tags: task?.tags || '',
    due_date: task?.due_date ? task.due_date.split('T')[0] : '',
    is_recurring: task?.is_recurring || false,
    recurrence_rule: task?.recurrence_rule || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        due_date: formData.due_date ? new Date(formData.due_date).toISOString() : null,
      };

      if (!submitData.priority) delete submitData.priority;
      if (!submitData.tags) delete submitData.tags;
      if (!submitData.recurrence_rule) delete submitData.recurrence_rule;

      await onSubmit(submitData);
    } catch (error) {
      console.error('Form submission error:', error);
      alert(error.message || 'Failed to save task');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">{task ? 'Edit Task' : 'Create New Task'}</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength={200}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded focus:outline-none focus:border-sky-400"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={1000}
            rows={3}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded focus:outline-none focus:border-sky-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="priority" className="block text-sm font-medium mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded focus:outline-none focus:border-sky-400"
            >
              <option value="">None</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="due_date" className="block text-sm font-medium mb-1">
              Due Date
            </label>
            <input
              type="date"
              id="due_date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded focus:outline-none focus:border-sky-400"
            />
          </div>
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium mb-1">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., work, personal"
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded focus:outline-none focus:border-sky-400"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_recurring"
            name="is_recurring"
            checked={formData.is_recurring}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="is_recurring" className="text-sm font-medium">
            Recurring task
          </label>
        </div>

        {formData.is_recurring && (
          <div>
            <label htmlFor="recurrence_rule" className="block text-sm font-medium mb-1">
              Recurrence Rule
            </label>
            <input
              type="text"
              id="recurrence_rule"
              name="recurrence_rule"
              value={formData.recurrence_rule}
              onChange={handleChange}
              placeholder="e.g., daily, weekly"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded focus:outline-none focus:border-sky-400"
            />
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-600 rounded transition"
          >
            {isSubmitting ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded transition"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
