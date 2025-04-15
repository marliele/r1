import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchPosts, addPost, deletePost, updatePost } from './api';
import DataSet from './DataSet';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    loadPosts();
  }, []);

  const formik = useFormik({
    initialValues: { title: '', body: '', userId: '' },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      body: Yup.string().required('Body is required'),
      userId: Yup.number().required('User ID is required').positive(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const newPost = await addPost(values);
        setPosts((prev) => [...prev, newPost]);
        resetForm();
      } catch (error) {
        console.error('Error adding post:', error);
      }
    },
  });

  const handleDeleteSelected = async () => {
    const selectedIds = selectedRows.map((index) => posts[index].id);

    try {
      await Promise.all(selectedIds.map((id) => deletePost(id)));
      setPosts((prev) => prev.filter((post) => !selectedIds.includes(post.id)));
      setSelectedRows([]);
    } catch (error) {
      console.error('Error deleting selected posts:', error);
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
      await updatePost(id, updatedData);
      setPosts((prev) =>
        prev.map((post) => (post.id === id ? { ...post, ...updatedData } : post))
      );
      setEditingPost(null);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div>
      <h1>Posts</h1>

      {/* Add Post Form */}
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          {...formik.getFieldProps('title')}
        />
        {formik.touched.title && formik.errors.title ? (
          <div>{formik.errors.title}</div>
        ) : null}

        <textarea
          placeholder="Body"
          {...formik.getFieldProps('body')}
        />
        {formik.touched.body && formik.errors.body ? (
          <div>{formik.errors.body}</div>
        ) : null}

        <input
          type="number"
          placeholder="User ID"
          {...formik.getFieldProps('userId')}
        />
        {formik.touched.userId && formik.errors.userId ? (
          <div>{formik.errors.userId}</div>
        ) : null}

        <button type="submit">Add Post</button>
      </form>

      {selectedRows.length > 0 && (
        <div>
          <button onClick={handleDeleteSelected}>Delete Selected</button>
        </div>
      )}

      <DataSet
        headers={['ID', 'Title', 'Body', 'User ID', 'Actions']}
        data={posts.map((post, index) => ({
          id: post.id,
          title: post.title,
          body: post.body,
          userId: post.userId,
          actions: (
            <>
              <button onClick={() => setEditingPost(post)}>Edit</button>
            </>
          ),
        }))}
        rowRenderer={(cell) => cell}
        headerRenderer={(header) => header}
        selectedRows={selectedRows}
        onRowSelect={handleRowSelect}
      />

      {editingPost && (
        <div>
          <h3>Edit Post</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit(editingPost.id, editingPost);
            }}
          >
            <input
              type="text"
              value={editingPost.title}
              onChange={(e) =>
                setEditingPost({ ...editingPost, title: e.target.value })
              }
            />
            <textarea
              value={editingPost.body}
              onChange={(e) =>
                setEditingPost({ ...editingPost, body: e.target.value })
              }
            />
            <input
              type="number"
              value={editingPost.userId}
              onChange={(e) =>
                setEditingPost({ ...editingPost, userId: e.target.value })
              }
            />
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setEditingPost(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostsPage;