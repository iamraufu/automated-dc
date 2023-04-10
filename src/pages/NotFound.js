import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const NotFound = () => {
    return (
        <section className='bg-brand container-fluid p-0'>
            <div className="d-flex">
                <div style={{ width: '116px' }} className="col-md-2 bg-white">
                    <Sidebar />
                </div>

                <div style={{ maxHeight: '100vh', overflow: 'auto' }} className="col-md-10 px-4 py-3 mx-auto d-block">
                    <h1 className="text-center pt-5 text-danger fw-bold">404 <br />Not Found</h1>
                    <Link to='/'><p className='text-center mt-5'>Go Home</p></Link>
                </div>
            </div>
        </section>
    );
};

export default NotFound;