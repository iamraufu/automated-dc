import React from 'react';
import Sidebar from '../components/Sidebar';

const Picker = () => {
    return (
        <section className='bg-brand container-fluid p-0'>
            <div className="d-flex">
                <div style={{ width: '116px' }} className="col-md-2 bg-white">
                    <Sidebar />
                </div>

                <div className="col-md-10 px-4 py-3 mx-auto d-block">
                    <h2 className='text-center fs-5 font-ibm'>Picker is not Designed yet</h2>
                </div>
            </div>
        </section>
    );
};

export default Picker;