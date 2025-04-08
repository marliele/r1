const BASE_URL = 'https://jsonplaceholder.typicode.com/comments';

export const fetchComments = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error('Failed to fetch comments');
  return response.json();
};

export const addComment = async (comment) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to add comment');
  return response.json();
};

export const deleteComment = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete comment');
};

export const updateComment = async (id, updatedData) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updatedData),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to update comment');
  return response.json();
};