import React from 'react';

const PersonComponent = ({ persons }) => {
  return (
    <div>
      <h2>Список людей</h2>
      {persons.length === 0 ? (
        <p>Нет добавленных людей</p>
      ) : (
        <ul>
          {persons.map((person, index) => (
            <li key={index}>
              <h3>{person.name}</h3>
              <p>Возраст: {person.age}</p>
              <p>Email: {person.email}</p>
              <h4>Домашние животные:</h4>
              <ul>
                {person.pet.map((pet, petIndex) => (
                  <li key={petIndex}>
                    <p>Имя: {pet.name}</p>
                    <p>Возраст: {pet.age}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PersonComponent;

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Имя обязательно'),
  age: Yup.number()
    .integer()
    .positive()
    .required('Возраст обязателен'),
  email: Yup.string()
    .email('Неверный формат email')
    .required('Email обязателен'),
  pet: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required('Имя питомца обязательно'),
        age: Yup.number()
          .integer()
          .positive()
          .required('Возраст питомца обязателен'),
      })
    )
    .min(1, 'Добавьте хотя бы одного питомца')
    .required('Питомцы обязательны'),
});

const FormComponent = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      email: '',
      pet: [{ name: '', age: '' }],
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm(); // Очищаем форму после отправки
    },
  });

  const addPetField = () => {
    formik.setFieldValue(
      'pet',
      [...formik.values.pet, { name: '', age: '' }]
    );
  };

  const removePetField = (index) => {
    const updatedPets = [...formik.values.pet];
    updatedPets.splice(index, 1);
    formik.setFieldValue('pet', updatedPets);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="name">Имя:</label>
        <input
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? (
          <div style={{ color: 'red' }}>{formik.errors.name}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="age">Возраст:</label>
        <input
          id="age"
          name="age"
          type="number"
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.age && formik.errors.age ? (
          <div style={{ color: 'red' }}>{formik.errors.age}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <div style={{ color: 'red' }}>{formik.errors.email}</div>
        ) : null}
      </div>

      <h3>Домашние животные:</h3>
      {formik.values.pet.map((pet, index) => (
        <div key={index}>
          <label htmlFor={`petName-${index}`}>Имя питомца:</label>
          <input
            id={`petName-${index}`}
            name={`pet[${index}].name`}
            value={formik.values.pet[index].name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.pet &&
          formik.touched.pet[index] &&
          formik.errors.pet &&
          formik.errors.pet[index]?.name ? (
            <div style={{ color: 'red' }}>
              {formik.errors.pet[index]?.name}
            </div>
          ) : null}

          <label htmlFor={`petAge-${index}`}>Возраст питомца:</label>
          <input
            id={`petAge-${index}`}
            name={`pet[${index}].age`}
            type="number"
            value={formik.values.pet[index].age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.pet &&
          formik.touched.pet[index] &&
          formik.errors.pet &&
          formik.errors.pet[index]?.age ? (
            <div style={{ color: 'red' }}>
              {formik.errors.pet[index]?.age}
            </div>
          ) : null}

          {formik.values.pet.length > 1 && (
            <button
              type="button"
              onClick={() => removePetField(index)}
              style={{ margin: '5px' }}
            >
              Удалить питомца
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addPetField}
        style={{ margin: '10px 0' }}
      >
        Добавить питомца
      </button>

      <button type="submit">Отправить</button>
    </form>
  );
};

export default FormComponent;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FormComponent from './FormComponent';
import PersonComponent from './PersonComponent';
import './App.css';

function App() {
  const [persons, setPersons] = useState([]);

  const handleAddPerson = (personData) => {
    console.log('Добавлен новый человек:', personData); // Отладочный вывод
    setPersons((prevPersons) => [...prevPersons, personData]);
  };

  console.log('Текущий список людей:', persons); // Отладочный вывод

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/form">Форма</Link>
            </li>
            <li>
              <Link to="/list">Список</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/form"
            element={<FormComponent onSubmit={handleAddPerson} />}
          />
          <Route
            path="/list"
            element={<PersonComponent persons={persons} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
  }
  
  nav {
    background-color: #333;
    color: white;
    padding: 10px;
  }
  
  nav ul {
    list-style-type: none;
    display: flex;
    gap: 10px;
  }
  
  nav a {
    color: white;
    text-decoration: none;
  }
  
  form {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  form div {
    margin-bottom: 15px;
  }
  
  form label {
    display: block;
    margin-bottom: 5px;
  }
  
  form input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  form button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  form button:hover {
    background-color: #0056b3;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 20px;
    padding: 10px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }