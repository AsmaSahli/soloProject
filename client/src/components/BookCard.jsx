import React, { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';
import { useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
    const { title, numberOfLikes, userId ,_id } = book;
    const [addedBy, setAddedBy] = useState(null);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/user/${userId}`);
                const userData = await response.json();

                setAddedBy(`${userData.firstName} ${userData.lastName}`);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchUserDetails();
    }, [userId]);

    return (
        <Card>
            <div className="mt-4">
            {currentUser._id === userId ? (
                    <Link to={`/updateBook/${_id}`}>
                        <h2 className="text-xl font-semibold">{title}</h2>
                    </Link>
                ) : (
                    <Link to={`/showBook/${_id}`}>
                        <h2 className="text-xl font-semibold">{title}</h2>
                    </Link>
                )}
            </div>

            <div className="mt-2">
                <p className="text-gray-500">Added By: <br /> {addedBy}</p>
                <p className="text-gray-500">Likes: {numberOfLikes} </p>
            </div>
        </Card>
    );
};

export default BookCard;
