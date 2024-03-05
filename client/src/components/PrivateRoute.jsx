import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
     // Access the Redux store and get the currentUser
    const { currentUser } = useSelector((state) => state.user);
    
    // Check if there is a currentUser
    // If authenticated, render the nested components
    // If not authenticated, navigate to the "/signin" route
    return currentUser ? <Outlet /> : <Navigate to='/signin' />;
}

export default PrivateRoute