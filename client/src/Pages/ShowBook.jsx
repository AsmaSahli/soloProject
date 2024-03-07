import React, { useState, useEffect } from 'react';
import { Card, Button, Text } from 'flowbite-react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


    const ShowBook = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [book, setBook] = useState(null);
    const [likedByUsers, setLikedByUsers] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const { bookId } = useParams();

    useEffect(() => {

        const fetchBookDetails = async () => {
        try {
            const res = await fetch(`http://localhost:8000/getOneBook/${bookId}`, {
            method: 'GET',
            credentials: 'include',
            });
            const data = await res.json();

            if (!res.ok) {
            console.error('Error fetching book details:', data.message);
            return;
            }

            setBook(data);

            setLikedByUsers(data.likes || []);
            setIsLiked(data.likes.includes(currentUser._id));
        } catch (error) {
            console.error('Something went wrong while fetching book details:', error);
        }
        };

        fetchBookDetails();
    }, []);

    const handleLikes = async () => {
        try {
            const updatedLikes = isLiked
                ? likedByUsers.filter((userId) => userId !== currentUser._id)
                : [...likedByUsers, currentUser._id];
    
            const updatedBook = {
                ...book,
                likes: updatedLikes,
                numberOfLikes: updatedLikes.length,
            };
    
            // Optimistically update the state
            setLikedByUsers(updatedLikes);
            setIsLiked(!isLiked);
            setBook(updatedBook);
    
            // Make the API request to update the likes on the server
            const res = await fetch(`http://localhost:8000/updatelikes/${book._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBook),
            });
    
            const data = await res.json();
    
            if (!res.ok) {
                console.error('Error updating book:', data.message);

                setLikedByUsers(book.likes || []);
                setIsLiked(book.likes.includes(currentUser._id));
                setBook(book);
            }
        } catch (error) {
            console.error('Something went wrong while updating book:', error);
        }
    };



    return (
        <div className='max-w-md mx-auto p-3'>
        {book && (
            <Card>
            <div className='mt-2'>
                <Button  onClick={handleLikes} gradientDuoTone={isLiked ? 'pinkToRed' : 'grayToGray'}>
                {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                </Button>
            </div>
            <div className='mt-4'>
                <h1 className='text-xl font-semibold'>{book.title}</h1>
                <h3 className='text-gray-500'>{book.content}</h3>
                <br />
                <h4 className='text-gray-500'>Added By:{book.addedBy}</h4>
                <h4 className='text-gray-500'>Created On: {new Date(book.createdAt).toLocaleString()}</h4>
                <h4 className='text-gray-500'>Last Updated: {new Date(book.updatedAt).toLocaleString()}</h4>
                <h4 className='text-gray-500'>Number of Likes: {book.numberOfLikes}</h4>
            </div>



            <div className='mt-4'>
                <h3 className='text-xl font-semibold'>Liked By:</h3>
                <ul>
                {/* {book.likes.map((user) => (
                    <li key={user}>{user}</li>
                ))} */}
                </ul>
            </div>
            </Card>
        )}
        </div>
    );
};

export default ShowBook;
