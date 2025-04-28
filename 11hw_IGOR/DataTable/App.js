import React, { useState, useEffect, useOptimistic } from 'react';
import DataSet from './DataSet';

const API_URL = 'http://localhost:5247/api/comments';

const App = () => {
  const [data, setData] = useState([]);
  const [optimisticData, setOptimisticData] = useOptimistic(data, (state, newItem) => [...state, newItem]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAdd = async (newItem) => {
    const optimisticNewItem = { ...newItem, id: Date.now() };
    setOptimisticData(optimisticNewItem);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      if (!response.ok) throw new Error('Failed to add item');

      const result = await response.json();
      setData((prevData) => [...prevData, result]);
    } catch (err) {
      setError(err.message);
      setData((prevData) => prevData.filter((item) => item.id !== optimisticNewItem.id));
    }
  };

  const handleDelete = async (ids) => {
    const updatedData = data.filter((item) => !ids.includes(item.id));
    setData(updatedData);
    try {
      for (const id of ids) {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(`Failed to delete item with id ${id}`);
      }
    } catch (err) {
      setError(err.message);
      setData((prevData) => prevData.filter((item) => !ids.includes(item.id)));
    }
  };

  const handleEdit = async (id, updatedFields) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, ...updatedFields } : item
    );
    setData(updatedData);

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      });
      if (!response.ok) throw new Error(`Failed to update item with id ${id}`);
    } catch (err) {
      setError(err.message);
      setData((prevData) => prevData.map((item) => (item.id === id ? item : item)));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Universal Table</h1>

      <AddCommentForm onAdd={handleAdd} />

      <DataSet
        data={optimisticData}
        headers={[
          { key: 'id', label: 'ID' },
          { key: 'postId', label: 'Post ID' },
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'body', label: 'Comment' },
        ]}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

const AddCommentForm = ({ onAdd }) => {
  const [newComment, setNewComment] = useState({ postId: '', name: '', email: '', body: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.postId || !newComment.name || !newComment.email || !newComment.body) {
      alert('Please fill in all fields');
      return;
    }
    onAdd(newComment);
    setNewComment({ postId: '', name: '', email: '', body: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input
          type="number"
          name="postId"
          placeholder="Post ID"
          value={newComment.postId}
          onChange={handleChange}
          required
          style={{ flex: 1 }}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newComment.name}
          onChange={handleChange}
          required
          style={{ flex: 2 }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newComment.email}
          onChange={handleChange}
          required
          style={{ flex: 2 }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <textarea
          name="body"
          placeholder="Comment"
          value={newComment.body}
          onChange={handleChange}
          required
          style={{ width: '100%', height: '50px', padding: '8px' }}
        />
      </div>
      <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#6791c0', color: 'white', border: 'none', cursor: 'pointer' }}>
        Add Comment
      </button>
    </form>
  );
};

export default App;