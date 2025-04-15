const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchComments = async () => {
  const response = await fetch(`${BASE_URL}/comments`);
  if (!response.ok) throw new Error('Failed to fetch comments');
  return response.json();
};

export const addComment = async (comment) => {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to add comment');
  return response.json();
};

export const deleteComment = async (id) => {
  const response = await fetch(`${BASE_URL}/comments/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete comment');
};

export const updateComment = async (id, updatedData) => {
  const response = await fetch(`${BASE_URL}/comments/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updatedData),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to update comment');
  return response.json();
};

export const fetchPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
};

export const addPost = async (post) => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify(post),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to add post');
  return response.json();
};

export const deletePost = async (id) => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete post');
};

export const updatePost = async (id, updatedData) => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updatedData),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to update post');
  return response.json();
};

export const fetchAlbums = async () => {
  const response = await fetch(`${BASE_URL}/albums`);
  if (!response.ok) throw new Error('Failed to fetch albums');
  return response.json();
};

export const addAlbum = async (album) => {
  const response = await fetch(`${BASE_URL}/albums`, {
    method: 'POST',
    body: JSON.stringify(album),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to add album');
  return response.json();
};

export const deleteAlbum = async (id) => {
  const response = await fetch(`${BASE_URL}/albums/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete album');
};

export const updateAlbum = async (id, updatedData) => {
  const response = await fetch(`${BASE_URL}/albums/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updatedData),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to update album');
  return response.json();
};

export const fetchTodos = async () => {
  const response = await fetch(`${BASE_URL}/todos`);
  if (!response.ok) throw new Error('Failed to fetch todos');
  return response.json();
};

export const addTodo = async (todo) => {
  const response = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to add todo');
  return response.json();
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${BASE_URL}/todos/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete todo');
};

export const updateTodo = async (id, updatedData) => {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updatedData),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to update todo');
  return response.json();
};

export const fetchUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

export const addUser = async (user) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to add user');
  return response.json();
};

export const deleteUser = async (id) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete user');
};

export const updateUser = async (id, updatedData) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updatedData),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to update user');
  return response.json();
};