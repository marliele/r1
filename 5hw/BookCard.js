import React from 'react';
import PropTypes from 'prop-types';
import './BookCard.css';

const BookCard = ({ title, authors, coverImage }) => {
  return (
    <div className="card">
      <img src={coverImage} alt={`${title} cover`} className="image" />
      <h2 className="title">{title}</h2>
      <p className="authors">{authors.join(', ')}</p>
    </div>
  );
};

BookCard.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  coverImage: PropTypes.string.isRequired,
};

export default BookCard;