// UpdateBook.js
import React, { useState, useEffect } from 'react';
import { Alert, Button, Textarea, TextInput } from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBook = () => {

    const [updateError, setUpdateError] = useState(null);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const navigate = useNavigate();
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
            setUpdateError(data.message);
            return;
            }

            setTitle(data.title);
            setContent(data.content);
        } catch (error) {
            setUpdateError('Something went wrong');
        }
        };

        fetchBookDetails();
    }, [bookId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
        const res = await fetch(`http://localhost:8000/updateBook/${bookId}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            content: content,
            title: title,
            }),
            credentials: 'include',
        });
        const data = await res.json();

        if (!res.ok) {
            setUpdateError(data.message);
            return;
        }

        setUpdateError(null);
        navigate('/books');
        } catch (error) {
        setUpdateError('Something went wrong');
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(`http://localhost:8000/deleteBook/${bookId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!res.ok) {
                const data = await res.json();
                setUpdateError(data.message);
                return;
            }

            setUpdateError(null);
            navigate('/books');
        } catch (error) {
            setUpdateError('Something went wrong');
        }
    };

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 font-semibold text-3xl font-mono'>Update This Book</h1>
        <form className='flex flex-col gap-4' onSubmit={handleUpdate}>
            <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            value={title}
            className='flex-1'
            onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
            id='comment'
            placeholder='Write something...'
            required
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            />
            <Button type='submit' gradientDuoTone='pinkToOrange'>
            Update
            </Button>
            <Button type='button' gradientMonochrome="failure" onClick={handleDelete}>
                    Delete
            </Button>
            {updateError && (
            <Alert className='mt-5' color='failure'>
                {updateError}
            </Alert>
            )}
        </form>
        </div>
    );
};

export default UpdateBook;
