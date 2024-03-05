import { Button, Navbar,Dropdown,Avatar} from 'flowbite-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaMoon, FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { toggleTheme } from '../redux/theme/themeSlice';
import { FaSun } from "react-icons/fa6";

    const Header = () => {

    const path = useLocation().pathname;
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.theme);
    
    const handleSignout = async () => {
        try {
        const res = await fetch('http://localhost:8000/signout', {
            method: 'POST',
        });
        const data = await res.json();
        if (!res.ok) {
            console.log(data.message);
        } else {
            dispatch(signoutSuccess());
        }
        } catch (error) {
        console.log(error.message);
        }
    };

    return (
        <Navbar className='border-b-2'>
        <Link to={"/about"} className='self-center whitespace-nowrap text-sm sm:text-2xl font-bold dark:text-white'>
            <span className='px-1 py-1 bg-gradient-to-r from-amber-500 to-pink-500 rounded-lg text-white font-mono'>BookSphere</span>
            <span className='font-mono'>Club</span>
        </Link>
        <div className='flex gap-2 md:order-2'>
        <Button
            className='w-12 h-10 hidden sm:inline'
            color='gray'
            pill
            onClick={() => dispatch(toggleTheme())}
            >
            {theme === 'light' ? <FaSun />: <FaMoon />}
            </Button>

            {currentUser ? (
            <Dropdown
                arrowIcon={false}
                inline
                label={
                <Avatar alt='user' img={currentUser.profilePicture} rounded />
                }
            >
                <Dropdown.Header>
                <span className='block text-sm'>@{currentUser.username}</span>
                <span className='block text-sm font-medium truncate'>
                    {currentUser.email}
                </span>
                </Dropdown.Header>
                <Link to={'/dashboard?tab=profile'}>
                <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
            </Dropdown>
            )

            :(
            <Link to='/signin'>
            <Button gradientDuoTone='pinkToOrange' outline>
                <FaSignInAlt /> SignIn
            </Button>
            </Link>)}
            <Navbar.Toggle />
            
        </div>

        {currentUser ? (
                <Navbar.Collapse>
                    <Navbar.Link active={path === '/bookes'} as={'div'} className={`active-link ${path === '/bookes' ? 'bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent' : ''}`}>
                        <Link to='/bookes'>Bookes</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === '/favouriteBookes'} as={'div'} className={`active-link ${path === '/favouriteBookes' ? 'bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent' : ''}`}>
                        <Link to='/favouriteBookes'>Favourite Bookes</Link>
                    </Navbar.Link>
                </Navbar.Collapse>
            ) : 
                null}
        </Navbar>
    );
};

export default Header;
