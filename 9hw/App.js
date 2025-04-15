import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CommentsPage from './CommentsPage';
import PostsPage from './PostsPage';
import AlbumsPage from './AlbumsPage';
import TodosPage from './TodosPage';
import UsersPage from './UsersPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <div className="sidebar">
          <h2>Navigation</h2>
          <ul>
            <li><Link to="/comments">Comments</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/albums">Albums</Link></li>
            <li><Link to="/todos">Todos</Link></li>
            <li><Link to="/users">Users</Link></li>
          </ul>
        </div>

        <div className="content">
          <Routes>
            <Route path="/comments" element={<CommentsPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/albums" element={<AlbumsPage />} />
            <Route path="/todos" element={<TodosPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/" element={<CommentsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;