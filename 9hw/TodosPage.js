import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchTodos, addTodo, deleteTodo, updateTodo } from './api';
import DataSet from './DataSet';

const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    loadTodos();
  }, []);

  const formik = useFormik({
    initialValues: { title: '', completed: false, userId: '' },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      completed: Yup.boolean(),
      userId: Yup.number().required('User ID is required').positive(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const newTodo = await addTodo(values);
        setTodos((prev) => [...prev, newTodo]);
        resetForm();
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    },
  });

  const handleDeleteSelected = async () => {
    const selectedIds = selectedRows.map((index) => todos[index].id);

    try {
      await Promise.all(selectedIds.map((id) => deleteTodo(id)));
      setTodos((prev) => prev.filter((todo) => !selectedIds.includes(todo.id)));
      setSelectedRows([]);
    } catch (error) {
      console.error('Error deleting selected todos:', error);
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
      await updateTodo(id, updatedData);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, ...updatedData } : todo))
      );
      setEditingTodo(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div>
      <h1>Todos</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          {...formik.getFieldProps('title')}
        />
        {formik.touched.title && formik.errors.title ? (
          <div>{formik.errors.title}</div>
        ) : null}

        <label>
          <input
            type="checkbox"
            checked={formik.values.completed}
            onChange={formik.handleChange}
            name="completed"
          />
          Completed
        </label>

        <input
          type="number"
          placeholder="User ID"
          {...formik.getFieldProps('userId')}
        />
        {formik.touched.userId && formik.errors.userId ? (
          <div>{formik.errors.userId}</div>
        ) : null}

        <button type="submit">Add Todo</button>
      </form>
      {selectedRows.length > 0 && (
        <div>
          <button onClick={handleDeleteSelected}>Delete Selected</button>
        </div>
      )}

      <DataSet
        headers={['ID', 'Title', 'Completed', 'User ID', 'Actions']}
        data={todos.map((todo, index) => ({
          id: todo.id,
          title: todo.title,
          completed: todo.completed ? 'Yes' : 'No',
          userId: todo.userId,
          actions: (
            <>
              <button onClick={() => setEditingTodo(todo)}>Edit</button>
            </>
          ),
        }))}
        rowRenderer={(cell) => cell}
        headerRenderer={(header) => header}
        selectedRows={selectedRows}
        onRowSelect={handleRowSelect}
      />

      {editingTodo && (
        <div>
          <h3>Edit Todo</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit(editingTodo.id, editingTodo);
            }}
          >
            <input
              type="text"
              value={editingTodo.title}
              onChange={(e) =>
                setEditingTodo({ ...editingTodo, title: e.target.value })
              }
            />
            <label>
              <input
                type="checkbox"
                checked={editingTodo.completed}
                onChange={(e) =>
                  setEditingTodo({ ...editingTodo, completed: e.target.checked })
                }
              />
              Completed
            </label>
            <input
              type="number"
              value={editingTodo.userId}
              onChange={(e) =>
                setEditingTodo({ ...editingTodo, userId: e.target.value })
              }
            />
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setEditingTodo(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TodosPage;