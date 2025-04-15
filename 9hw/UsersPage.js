import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchUsers, addUser, deleteUser, updateUser } from './api';
import DataSet from './DataSet';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    loadUsers();
  }, []);

  const formik = useFormik({
    initialValues: { name: '', username: '', email: '', phone: '', website: '', address: {city: ''}, company: {name: ''}},
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      phone: Yup.string().required('Phone is required'),
      website: Yup.string().required('Website is required'),
      address: Yup.object({
        city: Yup.string().required('City is required'),
      }),
      company: Yup.object({
        name: Yup.string().required('Company name is required'),
      }),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const newUser = await addUser(values);
        setUsers((prev) => [...prev, newUser]);
        resetForm();
      } catch (error) {
        console.error('Error adding user:', error);
      }
    },
  });

  const handleDeleteSelected = async () => {
    const selectedIds = selectedRows.map((index) => users[index].id);

    try {
      await Promise.all(selectedIds.map((id) => deleteUser(id)));
      setUsers((prev) => prev.filter((user) => !selectedIds.includes(user.id)));
      setSelectedRows([]);
    } catch (error) {
      console.error('Error deleting selected users:', error);
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
      await updateUser(id, updatedData);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, ...updatedData } : user))
      );
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          {...formik.getFieldProps('name')}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}

        <input
          type="text"
          placeholder="Username"
          {...formik.getFieldProps('username')}
        />
        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}

        <input
          type="email"
          placeholder="Email"
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}

        <input
          type="text"
          placeholder="Phone"
          {...formik.getFieldProps('phone')}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div>{formik.errors.phone}</div>
        ) : null}

        <input
          type="text"
          placeholder="Website"
          {...formik.getFieldProps('website')}
        />
        {formik.touched.website && formik.errors.website ? (
          <div>{formik.errors.website}</div>
        ) : null}

        <input
          type="text"
          placeholder="City"
          value={formik.values.address.city}
          onChange={(e) =>
            formik.setFieldValue('address.city', e.target.value)
          }
        />
        {formik.touched.address?.city && formik.errors.address?.city ? (
          <div>{formik.errors.address.city}</div>
        ) : null}

        <input
          type="text"
          placeholder="Company Name"
          value={formik.values.company.name}
          onChange={(e) =>
            formik.setFieldValue('company.name', e.target.value)
          }
        />
        {formik.touched.company?.name && formik.errors.company?.name ? (
          <div>{formik.errors.company.name}</div>
        ) : null}

        <button type="submit">Add User</button>
      </form>

      {selectedRows.length > 0 && (
        <div>
          <button onClick={handleDeleteSelected}>Delete Selected</button>
        </div>
      )}

      <DataSet
        headers={['ID', 'Name', 'Username', 'Email', 'Phone', 'Website', 'Address', 'Company', 'Actions']}
        data={users.map((user, index) => ({
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone,
          website: user.website,
          address: user.address.city,
          company: user.company.name,
          actions: (
            <>
              <button onClick={() => setEditingUser(user)}>Edit</button>
            </>
          ),
        }))}
        rowRenderer={(cell) => cell}
        headerRenderer={(header) => header}
        selectedRows={selectedRows}
        onRowSelect={handleRowSelect}
      />

      {editingUser && (
        <div>
          <h3>Edit User</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit(editingUser.id, editingUser);
            }}
          >
            <input
              type="text"
              value={editingUser.name}
              onChange={(e) =>
                setEditingUser({ ...editingUser, name: e.target.value })
              }
            />
            <input
              type="text"
              value={editingUser.username}
              onChange={(e) =>
                setEditingUser({ ...editingUser, username: e.target.value })
              }
            />
            <input
              type="email"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
            />
            <input
              type="text"
              value={editingUser.phone}
              onChange={(e) =>
                setEditingUser({ ...editingUser, phone: e.target.value })
              }
            />
            <input
              type="text"
              value={editingUser.website}
              onChange={(e) =>
                setEditingUser({ ...editingUser, website: e.target.value })
              }
            />
            <input
              type="text"
              value={editingUser.address.city}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  address: { ...editingUser.address, city: e.target.value },
                })
              }
            />
            <input
              type="text"
              value={editingUser.company.name}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  company: { ...editingUser.company, name: e.target.value },
                })
              }
            />
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setEditingUser(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UsersPage;