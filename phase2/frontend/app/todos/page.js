'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TodoList from '@/components/TodoList';
import TodoForm from '@/components/TodoForm';
import TodoFilters from '@/components/TodoFilters';
import { authClient } from '@/lib/auth-client';
import { getTasks, createTask, updateTask, deleteTask, toggleTaskComplete } from '@/lib/api';

export default function TodosPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    tag: '',
    q: '',
    sort_by: 'created_at',
    order: 'asc',
  });

  useEffect(() => {
    async function checkAuth() {
      try {
        const session = await authClient.getSession();
        if (!session?.user) {
          router.push('/signin');
          return;
        }
        setUser(session.user);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/signin');
      }
    }

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user, filters]);

  async function loadTasks() {
    try {
      setLoading(true);
      const data = await getTasks(filters);
      setTasks(data);
    } catch (error) {
      console.error('Failed to load tasks:', error);
      alert('Failed to load tasks: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateTask(taskData) {
    try {
      await createTask(taskData);
      setShowForm(false);
      loadTasks();
    } catch (error) {
      throw error;
    }
  }

  async function handleUpdateTask(taskData) {
    try {
      await updateTask(editingTask.id, taskData);
      setEditingTask(null);
      loadTasks();
    } catch (error) {
      throw error;
    }
  }

  async function handleToggleTask(taskId) {
    try {
      await toggleTaskComplete(taskId);
      loadTasks();
    } catch (error) {
      console.error('Failed to toggle task:', error);
      alert('Failed to toggle task: ' + error.message);
    }
  }

  async function handleDeleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await deleteTask(taskId);
      loadTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
      alert('Failed to delete task: ' + error.message);
    }
  }

  function handleEditTask(task) {
    setEditingTask(task);
    setShowForm(false);
  }

  function handleCancelForm() {
    setShowForm(false);
    setEditingTask(null);
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="text-center py-12">
          <p className="text-slate-400">Loading Session...</p>
          <p className="text-xs text-slate-600 mt-2 font-mono">If this persists, check console or /signin debug box.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-sky-400">My Tasks</h1>
        <p className="text-slate-400">Welcome back, {user.email}!</p>
      </div>

      <div className="mb-6">
        <TodoFilters filters={filters} onFiltersChange={setFilters} />
      </div>

      {(showForm || editingTask) && (
        <div className="mb-6">
          <TodoForm
            task={editingTask}
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            onCancel={handleCancelForm}
          />
        </div>
      )}

      {!showForm && !editingTask && (
        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="w-full px-4 py-3 bg-sky-600 hover:bg-sky-500 rounded-lg font-semibold transition"
          >
            + Add New Task
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-slate-400">Loading tasks...</p>
        </div>
      ) : (
        <TodoList
          tasks={tasks}
          onToggle={handleToggleTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}
