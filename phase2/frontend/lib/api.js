import { getToken, getUserId } from './auth-client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function fetchWithAuth(url, options = {}) {
  const token = await getToken();

  if (!token) {
    throw new Error('Not authenticated');
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return null;
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(error.detail || 'Request failed');
  }

  return response.json();
}

export async function getTasks(filters = {}) {
  const userId = await getUserId();
  if (!userId) throw new Error('Not authenticated');

  const params = new URLSearchParams();
  if (filters.status) params.append('status', filters.status);
  if (filters.priority) params.append('priority', filters.priority);
  if (filters.tag) params.append('tag', filters.tag);
  if (filters.q) params.append('q', filters.q);
  if (filters.sort_by) params.append('sort_by', filters.sort_by);
  if (filters.order) params.append('order', filters.order);

  const queryString = params.toString();
  const url = `/api/${userId}/tasks${queryString ? `?${queryString}` : ''}`;

  return fetchWithAuth(url);
}

export async function createTask(taskData) {
  const userId = await getUserId();
  if (!userId) throw new Error('Not authenticated');

  return fetchWithAuth(`/api/${userId}/tasks`, {
    method: 'POST',
    body: JSON.stringify(taskData),
  });
}

export async function getTask(taskId) {
  const userId = await getUserId();
  if (!userId) throw new Error('Not authenticated');

  return fetchWithAuth(`/api/${userId}/tasks/${taskId}`);
}

export async function updateTask(taskId, taskData) {
  const userId = await getUserId();
  if (!userId) throw new Error('Not authenticated');

  return fetchWithAuth(`/api/${userId}/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(taskData),
  });
}

export async function deleteTask(taskId) {
  const userId = await getUserId();
  if (!userId) throw new Error('Not authenticated');

  return fetchWithAuth(`/api/${userId}/tasks/${taskId}`, {
    method: 'DELETE',
  });
}

export async function toggleTaskComplete(taskId) {
  const userId = await getUserId();
  if (!userId) throw new Error('Not authenticated');

  return fetchWithAuth(`/api/${userId}/tasks/${taskId}/complete`, {
    method: 'PATCH',
  });
}
