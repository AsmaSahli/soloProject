import React, { useState ,useEffect } from 'react'
import { Alert, Button, Textarea,TextInput } from 'flowbite-react';
import { useSelector} from 'react-redux';
import BookCard from '../components/BookCard';


const Bookes = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [publishError, setPublishError] = useState(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [books, setBooks] = useState([]);


  
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
      const res = await fetch('http://localhost:8000/getAllBooks', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      setBooks(data); 
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/addBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content,
          title: title,
          userId: currentUser._id,
          addedBy:currentUser.firstName + ' ' + currentUser.lastName
        }),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
  
      await fetchBooks();
  
      if (res.ok) {
        setPublishError(null);
        setTitle('')
        setContent('')

      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
    <h1 className='my-7 font-semibold text-3xl font-mono'>WELCOME,{currentUser?.firstName?.toUpperCase() || ''} </h1>
    <h1 className='text-center text-3xl my-7 font-semibold font-mono'>Add a Book</h1>
    <form className='flex flex-col gap-4'onSubmit={handleSubmit}>
    
    <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            value={title}
            className='flex-1'
            onChange={(e) => setTitle(e.target.value)}
    />
    <Textarea id="comment" placeholder="Write something..." required rows={4} value={content} onChange={(e) => setContent(e.target.value)} />
    <Button type='submit' gradientDuoTone='pinkToOrange'>
          Publish
    </Button>
    {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
    )}

    </form>
    <h2 className="text-3xl font-semibold mt-8 mb-4">All Books</h2>
      <BooksList books={books} />
    </div>
  )
}

export default Bookes