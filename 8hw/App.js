import React, { useState, useOptimistic } from 'react';
import DataSet from './DataSet';
import {
  fetchComments,
  addComment,
  deleteComment,
  updateComment,
} from './api';

const App = () => {
  const [comments, setComments] = useState([]);
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment) => [...state, newComment]
  );
  const [newComment, setNewComment] = useState({
    postId: '',
    name: '',
    email: '',
    body: '',
  });
  const [editingComment, setEditingComment] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  React.useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await fetchComments();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    loadComments();
  }, []);

  const generateNewId = () => {
    if (comments.length === 0) return 1;
    return Math.max(...comments.map((c) => c.id)) + 1;
  };

  const handleAddComment = async (event) => {
    event.preventDefault();

    const newId = generateNewId();
    const newCommentData = {
      id: newId,
      ...newComment,
    };

    addOptimisticComment(newCommentData);

    try {
      const addedComment = await addComment(newCommentData);
      setComments((prev) => [...prev, addedComment]);
      setNewComment({ postId: '', name: '', email: '', body: '' });
    } catch (error) {
      console.error('Error adding comment:', error);
      setComments((prev) => prev.filter((c) => c.id !== newCommentData.id));
    }
  };

  const handleDeleteSelected = async () => {
    const selectedIds = selectedRows.map((index) => optimisticComments[index].id);
    setComments((prev) => prev.filter((c) => !selectedIds.includes(c.id)));

    try {
      await Promise.all(selectedIds.map((id) => deleteComment(id)));
      setSelectedRows([]);
    } catch (error) {
      console.error('Error deleting selected comments:', error);
      setComments((prev) => [
        ...prev,
        ...selectedIds.map((id) => optimisticComments.find((c) => c.id === id)),
      ]);
    }
  };

  const handleEditStart = (comment) => {
    setEditingComment(comment);
  };

  const handleEditComment = async (event) => {
    event.preventDefault();

    const originalComment = comments.find((c) => c.id === editingComment.id);

    setComments((prev) =>
      prev.map((c) => (c.id === editingComment.id ? editingComment : c))
    );

    try {
      await updateComment(editingComment.id, editingComment);
      setEditingComment(null);
    } catch (error) {
      console.error('Error updating comment:', error);
      setComments((prev) => prev.map((c) => (c.id === editingComment.id ? originalComment : c)));
    }
  };

  return (
    <div className="App">
      <h1>DataSet</h1>
      <form onSubmit={handleAddComment}>
        <input
          type="number"
          placeholder="Post ID"
          value={newComment.postId}
          onChange={(e) => setNewComment({ ...newComment, postId: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={newComment.name}
          onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newComment.email}
          onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
          required
        />
        <textarea
          placeholder="Body"
          value={newComment.body}
          onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          required
        />
        <button type="submit">Add Comment</button>
      </form>

      {editingComment && (
        <form onSubmit={handleEditComment}>
          <h3>Edit Comment</h3>
          <input
            type="text"
            value={editingComment.name}
            onChange={(e) =>
              setEditingComment({ ...editingComment, name: e.target.value })
            }
            required
          />
          <input
            type="email"
            value={editingComment.email}
            onChange={(e) =>
              setEditingComment({ ...editingComment, email: e.target.value })
            }
            required
          />
          <textarea
            value={editingComment.body}
            onChange={(e) =>
              setEditingComment({ ...editingComment, body: e.target.value })
            }
            required
          />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditingComment(null)}>
            Cancel
          </button>
        </form>
      )}

      {selectedRows.length > 0 && (
        <div>
          <button onClick={handleDeleteSelected}>Delete Selected</button>
        </div>
      )}

      <DataSet
        headers={['', 'ID', 'Post ID', 'Name', 'Email', 'Body', 'Actions']}
        data={optimisticComments.map((c, index) => ({
          temp: index,
          id: c.id,
          postId: c.postId,
          name: c.name,
          email: c.email,
          body: c.body,
          actions: (
            <>
              <button onClick={() => handleEditStart(c)}>Edit</button>
            </>
          ),
        }))}
        rowRenderer={(cell) => cell}
        headerRenderer={(header) => header}
        onEdit={handleEditStart}
        selectedRows={selectedRows}
        onRowSelect={(index, event) => {
          const isCtrlPressed = event.ctrlKey;

          if (isCtrlPressed) {
            setSelectedRows((prev) =>
              prev.includes(index)
                ? prev.filter((row) => row !== index)
                : [...prev, index]
            );
          } else {
            setSelectedRows([index]);
          }
        }}
      />
    </div>
  );
};

export default App;