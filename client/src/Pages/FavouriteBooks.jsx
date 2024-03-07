import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import BookCard from '../components/BookCard';
import axios from 'axios';

const FavouriteBooks = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [books, setBooks] = useState([]);
    const [Error, setError] = useState(null);

    const BooksList = ({ books }) => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {books.map((book) => (
                    <BookCard key={book._id} book={book} />
                ))}
            </div>
        );
    };

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8000/getAllBooks', {
                withCredentials: true,
            });

            const { data } = response;

            const likedBooks = data.filter((book) =>
                book.likes.includes(currentUser._id)
            );

            setBooks(likedBooks);
        } catch (error) {
            setError('Something went wrong');
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [currentUser]);

    return (
        <div>
            <h1 className="text-3xl font-semibold mt-8 mb-4">Favourite Books</h1>

            <BooksList books={books} />
        </div>
    );
};

export default FavouriteBooks;
