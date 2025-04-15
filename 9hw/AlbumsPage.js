import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchAlbums, addAlbum, deleteAlbum, updateAlbum } from './api';
import DataSet from './DataSet';

const AlbumsPage = () => {
  const [albums, setAlbums] = useState([]);
  const [editingAlbum, setEditingAlbum] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const data = await fetchAlbums();
        setAlbums(data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };
    loadAlbums();
  }, []);

  const formik = useFormik({
    initialValues: { title: '', userId: '' },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      userId: Yup.number().required('User ID is required').positive(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const newAlbum = await addAlbum(values);
        setAlbums((prev) => [...prev, newAlbum]);
        resetForm();
      } catch (error) {
        console.error('Error adding album:', error);
      }
    },
  });

  const handleDeleteSelected = async () => {
    const selectedIds = selectedRows.map((index) => albums[index].id);

    try {
      await Promise.all(selectedIds.map((id) => deleteAlbum(id)));
      setAlbums((prev) => prev.filter((album) => !selectedIds.includes(album.id)));
      setSelectedRows([]);
    } catch (error) {
      console.error('Error deleting selected albums:', error);
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
      await updateAlbum(id, updatedData);
      setAlbums((prev) =>
        prev.map((album) => (album.id === id ? { ...album, ...updatedData } : album))
      );
      setEditingAlbum(null);
    } catch (error) {
      console.error('Error updating album:', error);
    }
  };

  return (
    <div>
      <h1>Albums</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          {...formik.getFieldProps('title')}
        />
        {formik.touched.title && formik.errors.title ? (
          <div>{formik.errors.title}</div>
        ) : null}

        <input
          type="number"
          placeholder="User ID"
          {...formik.getFieldProps('userId')}
        />
        {formik.touched.userId && formik.errors.userId ? (
          <div>{formik.errors.userId}</div>
        ) : null}

        <button type="submit">Add Album</button>
      </form>

      {selectedRows.length > 0 && (
        <div>
          <button onClick={handleDeleteSelected}>Delete Selected</button>
        </div>
      )}

      <DataSet
        headers={['ID', 'Title', 'User ID', 'Actions']}
        data={albums.map((album, index) => ({
          id: album.id,
          title: album.title,
          userId: album.userId,
          actions: (
            <>
              <button onClick={() => setEditingAlbum(album)}>Edit</button>
            </>
          ),
        }))}
        rowRenderer={(cell) => cell}
        headerRenderer={(header) => header}
        selectedRows={selectedRows}
        onRowSelect={handleRowSelect}
      />

      {editingAlbum && (
        <div>
          <h3>Edit Album</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit(editingAlbum.id, editingAlbum);
            }}
          >
            <input
              type="text"
              value={editingAlbum.title}
              onChange={(e) =>
                setEditingAlbum({ ...editingAlbum, title: e.target.value })
              }
            />
            <input
              type="number"
              value={editingAlbum.userId}
              onChange={(e) =>
                setEditingAlbum({ ...editingAlbum, userId: e.target.value })
              }
            />
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setEditingAlbum(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AlbumsPage;