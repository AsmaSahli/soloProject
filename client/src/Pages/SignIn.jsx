import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import reading from '../assets/reading.png'
import {
    signInStart,
    signInSuccess,
    signInFailure,
    } from '../redux/user/userSlice';


    const SignIn = () => {
    const [formData, setFormData] = useState({});
    const { loading, error: errorMessage } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
        return dispatch(signInFailure('Please fill all the fields'));
        }
        try {
        dispatch(signInStart());
        const res = await fetch('http://localhost:8000/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
            credentials: 'include',
        });
        const data = await res.json();
        if (data.success === false) {
            dispatch(signInFailure(data.message));
        }

        if (res.ok) {
            dispatch(signInSuccess(data));
            navigate('/bookes');
        }
        } catch (error) {
        dispatch(signInFailure(error.message));
        }
    };


    return (
        <div className='min-h-screen mt-20'>
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
            {/* left */}
            <div className='flex-1'>
            <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-1 py-1 bg-gradient-to-r from-amber-500 to-pink-500 rounded-lg text-white font-mono'>BookSphere</span>
            <span className='font-mono'>Club</span>
            </Link>
            <img src={reading} alt="" />
            <p className='text-sm mt-5 '>
            Welcome to <span className='bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent' >BookSphere Club</span> Join us on this literary journey,  Discover, connect, and let the pages of your favorite books open doors to endless possibilities
            </p>

            </div>
            {/* right */}

            <div className='flex-1'>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

                <div>
                <Label value='Your email' />
                <TextInput
                    type='email'
                    placeholder='name@company.com'
                    id='email'
                    onChange={handleChange}
                />
                </div>
                <div>
                <Label value='Your password' />
                <TextInput
                    type='password'
                    placeholder='*********'
                    id='password'
                    onChange={handleChange}
                />
                </div>
                <Button
                gradientDuoTone='pinkToOrange'
                type='submit'
                disabled={loading}
                >
                {loading ? (
                    <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading...</span>
                    </>
                ) : (
                    'Sign In'
                )}
                </Button>
            </form>
            <div className='flex gap-2 text-sm mt-5'>
            <span>Dont Have an account?</span>
                <Link to='/signup' className='text-blue-500'>
                Sign Up
                </Link>
            </div>
            {errorMessage && (
                <Alert className='mt-5' color='failure'>
                {errorMessage}
                </Alert>
            )}
            </div>
        </div>

        </div>
    );
    }

export default SignIn