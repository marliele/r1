import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchComments, addComment, deleteComment, updateComment } from './api';
import DataSet from './DataSet';

const CommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
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

  const formik = useFormik({
    initialValues: { postId: '', name: '', email: '', body: '' },
    validationSchema: Yup.object({
      postId: Yup.number().required('Post ID is required').positive(),
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      body: Yup.string().required('Body is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const newComment = await addComment(values);
        setComments((prev) => [...prev, newComment]);
        resetForm();
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    },
  });

  const handleDeleteSelected = async () => {
    const selectedIds = selectedRows.map((index) => comments[index].id);

    try {
      await Promise.all(selectedIds.map((id) => deleteComment(id)));
      setComments((prev) => prev.filter((comment) => !selectedIds.includes(comment.id)));
      setSelectedRows([]);
    } catch (error) {
      console.error('Error deleting selected comments:', error);
    }
  };

  const handleRowSelect = (index, event) => {
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
  };

  const handleEdit = async (id, updatedData) => {
    try {
      await updateComment(id, updatedData);
      setComments((prev) =>
        prev.map((comment) => (comment.id === id ? { ...comment, ...updatedData } : comment))
      );
      setEditingComment(null);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  return (
    <div>
      <h1>Comments</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="number"
          placeholder="Post ID"
          {...formik.getFieldProps('postId')}
        />
        {formik.touched.postId && formik.errors.postId ? (
          <div>{formik.errors.postId}</div>
        ) : null}

        <input
          type="text"
          placeholder="Name"
          {...formik.getFieldProps('name')}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}

        <input
          type="email"
          placeholder="Email"
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}

        <textarea
          placeholder="Body"
          {...formik.getFieldProps('body')}
        />
        {formik.touched.body && formik.errors.body ? (
          <div>{formik.errors.body}</div>
        ) : null}

        <button type="submit">Add Comment</button>
      </form>

      {selectedRows.length > 0 && (
        <div>
          <button onClick={handleDeleteSelected}>Delete Selected</button>
        </div>
      )}

      <DataSet
        headers={['ID', 'Post ID', 'Name', 'Email', 'Body', 'Actions']}
        data={comments.map((comment, index) => ({
          id: comment.id,
          postId: comment.postId,
          name: comment.name,
          email: comment.email,
          body: comment.body,
          actions: (
            <>
              <button onClick={() => setEditingComment(comment)}>Edit</button>
            </>
          ),
        }))}
        rowRenderer={(cell) => cell}
        headerRenderer={(header) => header}
        selectedRows={selectedRows}
        onRowSelect={handleRowSelect}
      />

      {editingComment && (
        <div>
          <h3>Edit Comment</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit(editingComment.id, editingComment);
            }}
          >
            <input
              type="text"
              value={editingComment.name}
              onChange={(e) =>
                setEditingComment({ ...editingComment, name: e.target.value })
              }
            />
            <input
              type="email"
              value={editingComment.email}
              onChange={(e) =>
                setEditingComment({ ...editingComment, email: e.target.value })
              }
            />
            <textarea
              value={editingComment.body}
              onChange={(e) =>
                setEditingComment({ ...editingComment, body: e.target.value })
              }
            />
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setEditingComment(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CommentsPage;