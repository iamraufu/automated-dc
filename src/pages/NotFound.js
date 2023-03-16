import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='bg-brand'>
            <h1 className="text-center pt-5 text-danger fw-bold">404 <br />Not Found</h1>
            <Link to='/'><p className='text-center mt-5'>Go Home</p></Link>
        </div>
    );
};

export default NotFound;