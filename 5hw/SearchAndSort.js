import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchAndSort = ({ books, setFilteredBooks }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSearch = (query, filterBy = 'both') => {
    setSearchQuery(query);
    const lowerCaseQuery = query.toLowerCase();
  
    const filtered = books.filter((book) => {
      if (filterBy === 'title') {
        return book.title.toLowerCase().includes(lowerCaseQuery);
      } else if (filterBy === 'author') {
        return book.authors.some((author) =>
          author.toLowerCase().includes(lowerCaseQuery)
        );
      } else {
        return (
          book.title.toLowerCase().includes(lowerCaseQuery) ||
          book.authors.some((author) =>
            author.toLowerCase().includes(lowerCaseQuery)
          )
        );
      }
    });
  
    setFilteredBooks(sortBooks(filtered));
  };

  const sortBooks = (booksToSort) => {
    return [...booksToSort].sort((a, b) => {
      const fieldA = sortField === 'title' ? a.title : a.authors.join(', ');
      const fieldB = sortField === 'title' ? b.title : b.authors.join(', ');

      if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleSortChange = (field) => {
    setSortField(field);
    setFilteredBooks(sortBooks(books));
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    setFilteredBooks(sortBooks(books));
  };

  return (
    <div className="SearchAndSort">
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchQuery}
        onChange={(element) => handleSearch(element.target.value, sortField)}
      />
      <div className="SortControls">
        <label>
          Filter by: 
          <select value={sortField} onChange={(element) => handleSortChange(element.target.value)}>
            <option value="title">Title</option>
            <option value="authors">Author</option>
          </select>
        </label>
        <button onClick={toggleSortOrder}>
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>
    </div>
  );
};

SearchAndSort.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string).isRequired,
      coverImage: PropTypes.string.isRequired,
    })
  ).isRequired,
  setFilteredBooks: PropTypes.func.isRequired,
};

export default SearchAndSort;