import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import './AppBook.css';

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('https://fakeapi.extendsclass.com/books')
      .then((response) => response.json())
      .then((data) => {
        const fetchCovers = data.map(async (book) => {
          try {
            const googleResponse = await fetch(
              `https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}`
            );
            const googleData = await googleResponse.json();
            const coverImage =
              googleData.items?.[0]?.volumeInfo?.imageLinks?.thumbnail ||
              'https://via.placeholder.com/150';
            return { ...book, coverImage };
          } catch (error) {
            console.error('Error fetching cover:', error);
            return { ...book, coverImage: 'https://via.placeholder.com/150' };
          }
        });
        Promise.all(fetchCovers).then((booksWithCovers) => {
          setBooks(booksWithCovers);
        });
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  }, []);

  return (
    <div className="BookContainer">
      {books.map((book) => (
        <BookCard
          key={book.id}
          title={book.title}
          authors={book.authors}
          coverImage={book.coverImage}
        />
      ))}
    </div>
  );
};

export default App;
